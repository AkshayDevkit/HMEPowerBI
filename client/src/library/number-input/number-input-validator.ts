export enum NumberFormatType {
    Number = 'number',
    Decimal = 'decimal',
    Percentage = 'percentage',
}

export interface INumberValidator {
    regex: RegExp;
    placeholder: string;
    options: any;
    parseNumber: (value: any) => any;
    transform: (value: any) => any;
    formatNumber: (value: any, formatter: any) => any;
}

class NumberValidator implements INumberValidator {
    regex = /[^0-9]/g;
    placeholder = 'Enter number';
    options = {
        style: 'integer',
    };
    parseNumber = (value: any) => {
        value = value.toString();
        value = value.replace(this.regex, '');
        return value ? parseFloat(value) : '';
    };
    transform = (value: any) => {
        return this.parseNumber(value);
    };
    formatNumber = (value: any, formatter: any) => {
        return formatter(value);
    };
}

class DecimalValidator implements INumberValidator {
    regex = /[^0-9.]/g;
    placeholder = '0.00';
    options = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    parseNumber = (value: any) => {
        value = value.toString();
        value = value.replace(this.regex, '');
        return value && value.indexOf('.') === -1 ? parseFloat(value) : value;
    };
    transform = (value: any) => {
        return this.parseNumber(value);
    };
    formatNumber = (value: any, formatter: any) => {
        return formatter(value, this.options);
    };
}

class PercentageValidator implements INumberValidator {
    regex = /[^0-9]/g;
    placeholder = 'Enter number';
    options = {
        style: 'integer',
    };
    parseNumber = (value: any) => {
        const validator = new DecimalValidator();
        return validator.parseNumber(value);
    };
    transform = (value: any) => {
        const validator = new DecimalValidator();
        return validator.parseNumber(value);
    };

    formatNumber = (value: any, formatter: any) => {
        const validator = new DecimalValidator();
        return validator.parseNumber(value);
        // return value ? `${parseFloat(value)}` : 0; // %
    };
}

export class NumberInputValidator {
    validator: INumberValidator;
    constructor(formatType: NumberFormatType) {
        switch (formatType) {
            case NumberFormatType.Number:
                this.validator = new NumberValidator();
                break;
            case NumberFormatType.Decimal:
                this.validator = new DecimalValidator();
                break;
            case NumberFormatType.Percentage:
                this.validator = new PercentageValidator();
                break;
            default:
                this.validator = new NumberValidator();
        }
    }

    get placeholder() {
        return this.validator.placeholder;
    }

    parseNumber = (value: any) => {
        return this.validator.parseNumber(value);
    };

    transform = (value: any) => {
        return this.validator.transform(value);
    };

    formatNumber = (value: any, formatter: any) => {
        return this.validator.formatNumber(value, formatter);
    };
}
