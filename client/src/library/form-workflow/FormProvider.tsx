import { ReactNode } from 'react';
import { FormContext } from './Form';
import { FieldValues, FormInstance } from './types';

export const FormProvider = ({
    value,
    children,
}: {
    value: FormInstance<FieldValues>;
    children?: ReactNode;
}) => {
    return (
        <FormContext.Provider value={value}>{children}</FormContext.Provider>
    );
};
