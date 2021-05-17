import { errorMessages, SchemaConfig } from './types';
import { Yup } from '@library/yup';
import { toWord } from '@library/util/text-helper';

export const buildYupSchema = (schemaConfig: SchemaConfig) => {
    const schema = {};
    for (const property in schemaConfig.properties) {
        const value = schemaConfig.properties[property];
        if (!value || !value.validationType) {
            continue;
        }
        let validator = (Yup as any)[value.validationType]();
        schemaConfig.properties[property].validations?.forEach((validation) => {
            const { type, params } = validation;
            if (!validator[type] || !value.validationType) {
                return;
            }
            const parameters = params || [];
            validation.errorMessage =
                validation.errorMessage ||
                errorMessages[type](toWord(property), value.validationType, parameters);
            parameters.push(validation.errorMessage);
            validator = validator[type](...(parameters || []));
            (schema as any)[property] = validator;
        });
    }
    return schema;
};
