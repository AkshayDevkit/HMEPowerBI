import { useEffect, CSSProperties } from 'react';
import { FormProvider } from 'react-hook-form';
import { IForm } from './useForm';

export interface IFormProps {
    form: IForm;
    style?: CSSProperties;
    className?: string;
    children?: any;
}

export const Form = ({ form, style, className, children }: IFormProps) => {
    if (form === null) {
        throw new Error('Please provide form');
    }

    const setValue = form.setValue;
    form.setValue = (name: string, value: any, options?: any) => {
        /** register field if it's not already present */
        const fields = form.control.fieldsRef.current;
        if (!fields[name]) {
            form.register(name);
        }
        /** end */

        options = options || {};
        setValue(name, value, {
            shouldValidate: options.shouldValidate || true,
        });
    };

    useEffect(() => {
        const onReady = async () => {
            await form.formHandler.onReady(form.defaultValues, form);
        };
        onReady();

        // form.resetForm();
    }, []);

    form.formState.dirtyFields

    return (
        <div className={`form ${className}`} style={style}>
            <FormProvider {...form}>
                <form autoComplete="nope" onSubmit={form.submitForm}>
                    {children}
                </form>
            </FormProvider>
        </div>
    );
};
