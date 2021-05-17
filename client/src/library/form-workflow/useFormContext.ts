import { useContext } from 'react';
import { FormContext } from './Form';
import { FieldValues, FormInstance } from './types';

export const useFormContext = <
    TFieldValues extends FieldValues
>(): FormInstance<TFieldValues> => {
    const context = useContext<FormInstance<TFieldValues>>(FormContext as any);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a Form component');
    }
    return context;
};
