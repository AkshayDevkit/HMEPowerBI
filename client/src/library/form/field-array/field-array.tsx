import { IFormFieldProps, FormField } from '../field';

export const FormFieldArray = (props: IFormFieldProps) => {
    return <FormField {...props} isFieldArray={true} />;
};
