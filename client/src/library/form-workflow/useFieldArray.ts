import { FieldValues } from 'react-hook-form';
import { FieldArrayInstance, FieldArrayOptions } from './types';
import { useFormContext } from './useFormContext';

export const useFieldArray = <TFieldValues extends FieldValues>(
    fieldArrayOptions: FieldArrayOptions<TFieldValues>,
): FieldArrayInstance<TFieldValues> => {
    const form = fieldArrayOptions.formInstance || useFormContext();

    if (!form) {
        throw new Error(
            'kindly pass either Form instance or use inside Form component',
        );
    }

    return form.createFieldArrayInstance(fieldArrayOptions);
};
