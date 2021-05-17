import { ObjectSchema } from 'yup';

export type FieldName = string;

export type FieldValue = {};

export type FieldValues = { [key: string]: FieldValue };

export declare type ErrorMessage = string;

export declare type FieldError = {
    type: string;
    message?: ErrorMessage;
};

export declare type ErrorOption = {
    message?: ErrorMessage;
    shouldFocus?: boolean;
};

export type FormErrors = { [key: string]: FieldValue };

export interface SetValueConfig {
    shouldValidate: boolean;
    shouldDirty: boolean;
}

export interface FormInstance<TFieldValues extends FieldValues> {
    // criteriaMode: 'firstError' | 'all';
    defaultValues?: TFieldValues;
    dirtyFields: TFieldValues;
    errors: FormErrors;
    values: TFieldValues;
    fieldArrays: FieldArrayInstance<TFieldValues>[];
    formOptions: FormOptions<TFieldValues>;
    submit: () => Promise<void>;
    reset: (values?: TFieldValues) => void;
    // handleSubmit: (
    //     onValid: (values: TFieldValues) => void,
    //     onInvalid?: (errors: FormErrors) => void,
    // ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    handleSubmit: (
        onValid: (values: TFieldValues) => void,
        onInvalid?: (errors: FormErrors) => void,
    ) => Promise<void>;
    setError(name: string, errorOption: ErrorOption): void;
    clearErrors(name?: FieldName | FieldName[]): void;
    setValue(name: FieldName, value: FieldValue, config?: SetValueConfig): void;
    setValues(values: TFieldValues, config?: SetValueConfig): void;
    validateAsync(name?: FieldName): void;
    validate(name?: FieldName): boolean;
    removeValue(name?: FieldName | FieldName[], config?: SetValueConfig): void;
    createFieldArrayInstance(
        fieldArrayOptions: FieldArrayOptions<TFieldValues>,
    ): FieldArrayInstance<TFieldValues>;
    onSetFieldArrayValue(fieldArray: FieldArrayInstance<TFieldValues>): void;
    onRemoveFieldArrayValues(indexes: number[], fieldArray: FieldArrayInstance<TFieldValues>): void;
}

export interface FieldArrayInstance<TFieldValues extends FieldValues> {
    name: string;
    defaultValues: TFieldValues[];
    dirtyFields: TFieldValues[];
    errors: FormErrors[];
    model: TFieldValues;
    values: TFieldValues[];
    reset: (values?: TFieldValues[]) => void;
    prepend: (
        value: Partial<TFieldValues> | Partial<TFieldValues>[],
        shouldFocus?: boolean,
    ) => void;
    append: (value: Partial<TFieldValues> | Partial<TFieldValues>[], shouldFocus?: boolean) => void;
    insert: (
        index: number,
        value: Partial<TFieldValues> | Partial<TFieldValues>[],
        shouldFocus?: boolean,
    ) => void;
    remove: (index?: number | number[]) => void;
    move: (indexA: number, indexB: number) => void;
    swap: (indexA: number, indexB: number) => void;
    getName(index: number, name: FieldName): FieldName;
    getValue(index: number, name: FieldName): FieldValue;
    setValue(index: number, name: FieldName, value: FieldValue): void;
    setPathValue(name: FieldName, value: FieldValue): void;
}

export interface FieldArrayOptions<TFieldValues extends FieldValues> {
    name: string;
    formInstance?: FormInstance<TFieldValues>;
}

export interface FormOptions<TFieldValues extends FieldValues> {
    defaultValues?: any;
    handlers?: FormHandler[];
    validationSchema?: ObjectSchema<any>;
    onSubmit?: (values: TFieldValues) => void;
    onSubmitError?: (errors: FormErrors) => void;
    onReset?: () => void;
    // ValidationResolver?: FormValidationResolver;
    debug?: boolean;
}

export interface FormHandler {
    onInitializing: (initialValues: FieldValues) => FieldValues;
    onReady: (initialValues: FieldValues, form: FormInstance<FieldValues>) => void;
    onSubmitting: (values: FieldValues, form: FormInstance<FieldValues>) => FieldValues;
    onResetting: (values: FieldValues, form: FormInstance<FieldValues>) => FieldValues;
}
