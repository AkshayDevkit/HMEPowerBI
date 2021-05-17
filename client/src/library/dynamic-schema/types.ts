import { BaseModel } from '@components/base/models';

export enum PropertyType {
    Text = 'text',
    Number = 'number',
    Boolean = 'boolean',
    Object = 'object',
    Array = 'array',
}

export enum PropertyValidationType {
    String = 'string',
    Number = 'number',
    Boolean = 'boolean',
    Object = 'object',
    Array = 'array',
}

export enum ValidationType {
    Min = 'min',
    Max = 'max',
    Required = 'required',
    Email = 'email',
}

const getKeyByPropertyValidationType = (type: PropertyValidationType): string => {
    switch (type) {
        case PropertyValidationType.Number:
            return 'value';
        case PropertyValidationType.String:
            return 'characters';
        case PropertyValidationType.Array:
            return 'items';
        default:
            return 'value';
    }
};

export const errorMessages = {
    required: (property: string, type: PropertyValidationType) => {
        return `Kindly specify ${property}`;
    },
    email: (property: string, type: PropertyValidationType) => {
        return `Kindly specify valid Email`;
    },
    min: (property: string, type: PropertyValidationType, params?: any[]) => {
        const value = params && params.length ? params[0] : '';
        const key = getKeyByPropertyValidationType(type);
        return `Kindly specify minimum ${value} ${key}`;
    },
    max: (property: string, type: PropertyValidationType, params?: any[]) => {
        const value = params && params.length ? params[0] : '';
        const key = getKeyByPropertyValidationType(type);
        return `Kindly specify maximum ${value} ${key}`;
    },
};

export interface PropertyValidation {
    type: Partial<ValidationType>;
    errorMessage?: string;
    params?: any[];
}

export interface PropertySchema {
    name?: string;
    label?: string;
    type?: PropertyType;
    validationType?: PropertyValidationType;
    defaultValue?: any;
    validations?: PropertyValidation[];
}

export interface SchemaConfig {
    properties: { [key: string]: PropertySchema };
}

export interface PropertyView extends PropertySchema {
    name: string;
    label: string; // default it will be from PropertySchema.label
    enable: boolean;
}

export interface View {
    properties: { [key: string]: PropertyView };
}

export interface Setting extends BaseModel {
    schema: SchemaConfig;
    views: { [key: string]: View };
}
