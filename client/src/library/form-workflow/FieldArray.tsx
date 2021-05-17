import { createContext } from 'react';
import { FieldArrayInstance, FieldName, FieldValues } from './types';
import { Field, FieldProps } from './Field';
import { useFormContext } from './useFormContext';
import { FieldArrayProvider } from './FieldArrayProvider';

export const FieldArrayContext = createContext<FieldArrayInstance<FieldValues>>(
    null as any,
);

interface FieldArrayProps<TFieldValues extends FieldValues>
    extends Partial<FieldProps> {
    name?: FieldName;
    fieldArray?: FieldArrayInstance<TFieldValues>;
}

export const FieldArray = (props: FieldArrayProps<FieldValues>) => {
    const form = useFormContext();

    const fieldArray =
        props.fieldArray || form.fieldArrays.find((x) => x.name === props.name);

    if (!fieldArray) {
        throw new Error('kindly pass either Field Array instance or name');
    }

    return (
        <FieldArrayProvider value={fieldArray}>
            <Field {...props} name={fieldArray.name} />
        </FieldArrayProvider>
    );
};
