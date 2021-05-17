import { defaultFormOptions, FormStore } from './store';
import { FieldValues, FormInstance, FormOptions } from './types';

export const useForm = <TFieldValues extends FieldValues>(
    formOptions?: FormOptions<TFieldValues>,
): FormInstance<TFieldValues> => {
    const formInstance = new FormStore(
        formOptions || defaultFormOptions,
    ) as FormInstance<TFieldValues>;

    return formInstance;
};
