import * as yup from 'yup';
import _set from 'lodash/set';
import _unset from 'lodash/unset';
import { action, computed, isObservable, makeObservable, observable, reaction, toJS } from 'mobx';
import { FieldArrayStore } from './field-array.store';
import { isPath, toPath } from './util';
import {
    FormInstance,
    FieldValues,
    SetValueConfig,
    FieldValue,
    FormErrors,
    ErrorOption,
    FieldName,
    FormOptions,
    FieldError,
    FieldArrayOptions,
    FieldArrayInstance,
} from './types';

export const defaultConfig: SetValueConfig = {
    shouldValidate: true,
    shouldDirty: true,
};

export const defaultFormOptions: FormOptions<FieldValues> = {
    defaultValues: {},
    handlers: [],
    validationSchema: yup.object(),
    onSubmit: (values) => {},
    onSubmitError: (values) => {},
    onReset: () => {},
};

export class FormStore<TFieldValues extends FieldValues> implements FormInstance<TFieldValues> {
    defaultValues: TFieldValues = {} as TFieldValues;
    dirtyFields: TFieldValues = {} as TFieldValues;
    errors: FormErrors = {} as TFieldValues;
    fieldArrays: FieldArrayInstance<TFieldValues>[] = [];
    values: TFieldValues = {} as TFieldValues;

    constructor(public formOptions: FormOptions<TFieldValues>) {
        makeObservable(this, {
            dirtyFields: observable,
            errors: observable,
            values: observable,
            reset: action,
            submit: action,
            handleSubmit: action,
            setError: action,
            clearErrors: action,
            validate: action,
            setValue: action,
            setValues: action,
            removeValue: action,
            onSetFieldArrayValue: action,
            onRemoveFieldArrayValues: action,
        });
        this.defaultValues = toJS(this.formOptions.defaultValues) || {};

        this.internalReset();
    }

    reset = (values?: TFieldValues): void => {
        this.internalReset(values, true);
    };

    submit = async (): Promise<void> => {
        const onSubmit = (values: TFieldValues) => {};
        return this.handleSubmit(
            this.formOptions.onSubmit || onSubmit,
            this.formOptions.onSubmitError,
        );
    };

    handleSubmit = async (
        onValid: (values: TFieldValues) => void,
        onInvalid?: (errors: FormErrors) => void,
    ): Promise<void> => {
        const isValid = this.validate();
        if (isValid) {
            onValid(toJS(this.values) as TFieldValues);
        } else if (onInvalid) {
            onInvalid(this.errors);
        }
    };

    setError = (name: string, errorOption: ErrorOption): void => {
        this.errors[name] = <FieldError>{
            message: errorOption.message,
        };
        // TODO:
        if (errorOption.shouldFocus) {
        }
    };

    clearErrors = (name?: FieldName | FieldName[]): void => {
        const names = name ? (Array.isArray(name) ? name : [name]) : [];
        if (names.length) {
            names.forEach((x) => {
                if (this.errors[x]) {
                    delete this.errors[x];
                }
            });
        } else {
            this.errors = {};
        }
    };

    setValue = (name: FieldName, value: FieldValue, config?: SetValueConfig): void => {
        if (!name) {
            return;
        }
        _set(this.values as FieldValues, name, value);
        // (this.values as FieldValues)[name] = value;

        config = config || defaultConfig;
        (this.dirtyFields as FieldValues)[name] = config.shouldDirty;
        if (config.shouldValidate) {
            // TODO: performance hit
            // this.validateAsync(name);
        }
    };

    setValues = (values: TFieldValues, config?: SetValueConfig): void => {
        const setValues = isObservable(values) ? toJS(values) : values || {};
        for (const key in setValues) {
            this.setValue(key, values[key], {
                ...(config || defaultConfig),
                shouldValidate: false,
            });
        }

        config = config || defaultConfig;
        if (config.shouldValidate) {
            this.validateAsync();
        }
    };

    validateAsync = (name?: FieldName): void => {
        if (!this.formOptions?.validationSchema) {
            return;
        }
        const values = this.output(this.values);
        // try - catch for yup error -> The schema does not contain the path
        try {
            const validate = name
                ? this.formOptions.validationSchema.validateAt(name, values)
                : this.formOptions.validationSchema.validate(values, {
                      abortEarly: false,
                  });
            validate
                .then((x) => {
                    if (x) {
                        if (name) {
                            delete this.errors[name];
                        } else {
                            this.errors = {};
                        }
                    }
                })
                .catch((error) => {
                    this.handleError(error);
                });
        } catch (error) {}
    };

    validate = (name?: FieldName): boolean => {
        if (!this.formOptions?.validationSchema) {
            return true;
        }
        const values = this.values;
        try {
            const isValid = name
                ? this.formOptions.validationSchema.validateSyncAt(name, values)
                : this.formOptions.validationSchema.validateSync(values, {
                      abortEarly: false,
                  });
            if (isValid) {
                if (name) {
                    delete this.errors[name];
                } else {
                    this.errors = {};
                }
                return true;
            }
        } catch (error) {
            this.handleError(error);
        }
        return false;
    };

    removeValue = (name?: FieldName | FieldName[], config?: SetValueConfig): void => {
        const names = name ? (Array.isArray(name) ? name : [name]) : [];

        if (names.length) {
            names.forEach((name) => {
                if ((this.values as FieldValues)[name]) {
                    delete (this.values as FieldValues)[name];
                    this.clearErrors(name);
                }
            });
        } else {
            this.values = {} as TFieldValues;
        }

        config = config || defaultConfig;

        if (config.shouldValidate) {
            this.validate();
        }
    };

    createFieldArrayInstance = (
        fieldArrayOptions: FieldArrayOptions<TFieldValues>,
    ): FieldArrayInstance<TFieldValues> => {
        const fieldArray = new FieldArrayStore<TFieldValues>(this, fieldArrayOptions);

        const existingIndex = this.fieldArrays.findIndex((x) => x.name === fieldArray.name);
        if (existingIndex > -1) {
            this.fieldArrays.splice(existingIndex, 1);
        }
        this.fieldArrays.push(fieldArray);

        return fieldArray;
    };

    output = (values: TFieldValues, name?: FieldName | FieldName[]): TFieldValues => {
        let selectedValues: FieldValues = {};
        const names = name ? (Array.isArray(name) ? name : [name]) : [];
        if (names.length) {
            names.forEach((name) => {
                if (!isPath(name)) {
                    selectedValues[name] = values[name];
                } else {
                    _set(selectedValues, name, values[name]);
                }
            });
        } else {
            selectedValues = values;
        }

        let output = {
            ...selectedValues,
        };
        this.fieldArrays.forEach((x) => {
            (output as any)[x.name] = toJS(x.values);
        });
        return output as TFieldValues;
    };

    onSetFieldArrayValue = (fieldArray: FieldArrayInstance<TFieldValues>): void => {
        _set(this.values, fieldArray.name, fieldArray.values);
    };

    onRemoveFieldArrayValues = (
        indexes: number[],
        fieldArray: FieldArrayInstance<TFieldValues>,
    ): void => {};

    private internalReset = (values?: TFieldValues, callOnReset?: boolean): void => {
        const resetValues = values || this.defaultValues;
        this.values = resetValues;

        this.clearErrors();

        this.fieldArrays.forEach((x) => {
            x.reset();
        });

        if (callOnReset && this.formOptions.onReset) {
            this.formOptions.onReset();
        }
    };

    private handleError = (error: any) => {
        if (this.formOptions.debug) {
            console.log(error.inner);
        }
        const fieldErrors: any = {};
        if (Array.isArray(error.inner) && error.inner.length) {
            error.inner.forEach((x: any) => {
                fieldErrors[x.path] = {
                    type: x.type,
                    message: x.message,
                } as FieldError;
            });
        } else if (error.path && error.message) {
            fieldErrors[error.path] = {
                type: error.type,
                message: error.message,
            } as FieldError;
        }
        this.errors = {
            ...this.errors,
            ...fieldErrors,
        };
    };
}
