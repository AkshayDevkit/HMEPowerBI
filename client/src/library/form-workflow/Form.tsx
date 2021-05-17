import classNames from 'classnames';
import { createContext, ReactNode } from 'react';
import { Observer } from 'mobx-react-lite';
import { FieldValues, FormInstance } from './types';
import { FormProvider } from './FormProvider';

export const FormContext = createContext<FormInstance<FieldValues>>(null as any);

interface FormProps<TFieldValues extends FieldValues> {
    instance: FormInstance<TFieldValues>;
    className?: string;
    children?: ReactNode;
}

export const Form = <TFieldValues extends FieldValues>({
    instance,
    className,
    children,
    ...props
}: FormProps<TFieldValues>) => {
    return (
        <Observer>
            {() => (
                <FormProvider value={instance as any}>
                    <form
                        name={'form-' + Date.now()}
                        className={classNames('form', className)}
                        onSubmit={(event) => {
                            instance.submit();
                            event.preventDefault();
                        }}
                        onReset={(event) => {
                            instance.reset();
                            event.preventDefault();
                        }}
                        {...props}
                    >
                        {children}
                    </form>
                </FormProvider>
            )}
        </Observer>
    );
};
