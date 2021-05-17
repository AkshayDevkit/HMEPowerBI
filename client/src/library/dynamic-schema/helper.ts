import { PropertySchema, PropertyView, Setting, ValidationType } from './types';
import _cloneDeep from 'lodash/cloneDeep';

export const toArray = <T>(properties: { [key: string]: T }): T[] => {
    const values = [];
    for (const property in properties) {
        const value = (properties as any)[property];
        values.push({
            name: property,
            ...value,
        });
    }
    return values;
};

export const toPropertySchemaArray = (properties: {
    [key: string]: PropertySchema;
}): PropertySchema[] => {
    return toArray(properties);
};

export const toPropertyViewArray = (properties: {
    [key: string]: PropertyView;
}): PropertyView[] => {
    return toArray(properties);
};

export const buildSettingNames = <T extends Setting>(setting: T): T => {
    const newSetting = { ..._cloneDeep(setting) };
    for (const property in newSetting.schema.properties) {
        const fieldSchema = newSetting.schema.properties[property];
        fieldSchema.name = fieldSchema.name || property;
        if ((fieldSchema as any).required) {
            (fieldSchema.validations || []).push({ type: ValidationType.Required });
        }
    }
    for (const view in newSetting.views) {
        for (const property in newSetting.views[view].properties) {
            const fieldView = newSetting.views[view].properties[property];
            fieldView.name = property;
        }
    }
    return newSetting;
};

export const buildAppSetting = <T extends Setting>(appSettings: {
    [key: string]: T;
}): { [key: string]: T } => {
    const newSetting = { ..._cloneDeep(appSettings) };

    for (const key in newSetting) {
        newSetting[key] = buildSetting(newSetting[key]);
    }

    return newSetting;
};

const buildSetting = <T extends Setting>(setting: T): T => {
    const newSetting = { ...setting };
    for (const property in newSetting.schema.properties) {
        const fieldSchema = newSetting.schema.properties[property];
        fieldSchema.name = fieldSchema.name || property;
        if ((fieldSchema as any).required) {
            (fieldSchema.validations || []).push({ type: ValidationType.Required });
        } else {
        }
    }
    for (const view in newSetting.views) {
        for (const property in newSetting.views[view].properties) {
            let fieldView = newSetting.views[view].properties[property];
            fieldView.name = property;

            const schemaField = newSetting.schema.properties[fieldView.name];
            if (schemaField) {
                for (const schemaProperty in schemaField) {
                    (fieldView as any)[schemaProperty] =
                        (fieldView as any)[schemaProperty] || (schemaField as any)[schemaProperty];
                }
            }
        }
    }
    return newSetting;
};
