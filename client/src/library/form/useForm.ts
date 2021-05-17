import { useForm as useReactHookForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    ArrayField,
    FieldValues,
    Mode,
    UseFieldArrayMethods,
    UseFormMethods,
} from 'react-hook-form/dist/types';
import { byString } from '@util/js-helper';
import { useFieldArray } from './use-field-array/useFieldArray';
import { IFormHandler, FormHandler } from './form.handler';

const getFormValidationResolver = (resolver: FormValidationResolver) => {
    switch (resolver) {
        case FormValidationResolver.yup:
            return yupResolver as any;
        case FormValidationResolver.vest:
        // return vestResolver as any;
        case FormValidationResolver.zod:
        // return zodResolver as any;
        case FormValidationResolver.joi:
        // return joiResolver as any;
    }
};
export interface IFormUseFieldArrayMethods
    extends Omit<UseFieldArrayMethods, 'fields'> {
    values: Partial<ArrayField<FieldValues, string>>[];
    setValues: (fields: Partial<ArrayField<FieldValues, string>>[]) => void;
}

export enum FormValidationResolver {
    yup = 'yup',
    vest = 'vest',
    zod = 'zod',
    joi = 'joi',
}

export interface IFormConfiguration {
    defaultValues: any;
    validationSchema: any;
    queryParams?: any;
    cacheRequest?: any;
    onSubmit: (values: any, form: IForm) => void;
    onReset: (values: any, form: IForm) => void;
    mode?: Mode;
    reValidateMode?: Exclude<Mode, 'onTouched' | 'all'>;
    handlers?: IFormHandler[];
    ValidationResolver?: FormValidationResolver;
}

export interface IForm extends UseFormMethods {
    defaultValues: any;
    validationSchema: any;
    formHandler: IFormHandler;
    submitForm: () => void;
    resetForm: () => void;
    handlers?: IFormHandler[];
    setValues: (values: any, options?: any) => void;
    useFieldArray: (
        name: string,
        keyName?: string,
    ) => IFormUseFieldArrayMethods;
}

export const useForm = (formConfiguration: IFormConfiguration): IForm => {
    formConfiguration.ValidationResolver =
        formConfiguration.ValidationResolver || FormValidationResolver.yup;
    const formHandler = new FormHandler(
        Array.isArray(formConfiguration.handlers)
            ? formConfiguration.handlers
            : [],
    ) as IFormHandler;
    formConfiguration.defaultValues = formHandler.onInitializing(
        formConfiguration.defaultValues || {},
    );

    const validationResolver = getFormValidationResolver(
        formConfiguration.ValidationResolver,
    );

    const reactHookForm = useReactHookForm({
        defaultValues: formConfiguration.defaultValues,
        resolver: formConfiguration.validationSchema
            ? validationResolver(formConfiguration.validationSchema)
            : undefined,
        mode: formConfiguration.mode,
        reValidateMode: formConfiguration.reValidateMode,
    });

    // need to define as get Values does not work in case of
    // some object like mobx
    const getValues = (name?: string | undefined): any | FieldValues[] => {
        const values = reactHookForm.getValues();
        return name ? byString(values, name) : values;
    };

    const form = {
        ...reactHookForm,
        getValues: getValues,
        defaultValues: formConfiguration.defaultValues,
        validationSchema: formConfiguration.validationSchema,
        handlers: formConfiguration.handlers,
        formHandler: formHandler,
    } as IForm;

    form.submitForm = () => {
        form.handleSubmit(
            (values: any, e: any) => {
                values = formHandler.onSubmitting(values, form);
                if (formConfiguration.onSubmit) {
                    formConfiguration.onSubmit(values, form);
                }
            },
            (errors: any, e: any) => console.error(errors, e),
        )();
    };

    const reset = (values: any) => {
        reactHookForm.reset(values);
        values = formHandler.onResetting(values, form);
        if (formConfiguration.onReset) {
            formConfiguration.onReset(values, form);
        }
    };

    form.resetForm = () => {
        reset(formConfiguration.defaultValues);
    };

    form.setValues = (values: any, config: any) => {
        for (const key in values) {
            form.setValue(key, values[key], config);
        }
    };

    form.useFieldArray = (
        name: string,
        keyName?: string,
    ): IFormUseFieldArrayMethods => {
        const defaultValues = form.defaultValues
            ? byString(form.defaultValues, name)
            : undefined;
        return useFieldArray(form, name, keyName, defaultValues);
    };

    return form;
};
