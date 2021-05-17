import { useContext } from 'react';
import { FieldArrayContext } from './FieldArray';
import { FieldValues, FieldArrayInstance } from './types';

export const useFieldArrayContext = <
    TFieldValues extends FieldValues
>(): FieldArrayInstance<TFieldValues> => {
    const context = useContext<FieldArrayInstance<TFieldValues>>(
        FieldArrayContext as any,
    );
    if (context === undefined) {
        throw new Error(
            'useFieldArrayContext must be used within a FieldArray component',
        );
    }
    return context;
};
