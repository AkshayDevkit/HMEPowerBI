import * as yup from 'yup';
import { AnySchema, Asserts, TypeOf } from 'yup';
import Lazy from 'yup/lib/Lazy';
import { AnyObject, Maybe, Optionals } from 'yup/lib/types';

const hasPercentageWeightage = (inventorys: any[], weightageFieldName: string) => {
    let isMatch = false;
    inventorys = inventorys || [];
    if (!inventorys.length) return true;
    const sum = inventorys.map((x) => x[weightageFieldName] || 0).reduce((a, b) => a + b, 0);
    if (sum === 100) {
        isMatch = true;
    }
    if (!isMatch) {
        return isMatch;
    }
    inventorys.every((inventory) => {
        isMatch = hasPercentageWeightage(inventory.promotions, weightageFieldName);
        if (!isMatch) {
            return false;
        }
        return true;
    });
    return isMatch;
};

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsUndefined', function () {
    return this.transform((value) => (value ? value : undefined));
});

yup.addMethod<yup.NumberSchema>(yup.number, 'emptyAsUndefined', function () {
    return this.transform((value, originalValue) =>
        String(originalValue)?.trim() ? value : undefined,
    );
});

yup.addMethod<yup.AnySchema>(
    yup.array,
    'hasPercentageWeightage',
    function (fieldName: string, weightageFieldName: string) {
        return this.test({
            name: 'name',
            message: `${fieldName} total weightage should be 100`,
            test: (value: any[]) => {
                return hasPercentageWeightage(value, weightageFieldName);
            },
        });
    },
);

yup.addMethod<yup.AnySchema>(yup.number, 'customValidation', function (message: string) {
    return this.test({
        name: 'custom',
        message: message,
        test: (value: any) => {
            console.log('running customValidation with value ' + value);
            return value >= 10 ? true : false;
        },
    });
});

declare module 'yup' {
    export interface StringSchema<
        TType extends Maybe<string> = string | undefined,
        TContext extends AnyObject = AnyObject,
        TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
        // custom methods
        emptyAsUndefined(): StringSchema<TType, TContext>;
    }

    export interface NumberSchema<
        TType extends Maybe<number> = number | undefined,
        TContext extends AnyObject = AnyObject,
        TOut extends TType = TType
    > extends yup.BaseSchema<TType, TContext, TOut> {
        // custom methods
        emptyAsUndefined(): NumberSchema<TType, TContext>;
    }

    export class ArraySchema<
        T extends AnySchema | Lazy<any, any>,
        C extends AnyObject = AnyObject,
        TIn extends Maybe<TypeOf<T>[]> = TypeOf<T>[] | undefined,
        TOut extends Maybe<Asserts<T>[]> = Asserts<T>[] | Optionals<TIn>
    > extends yup.BaseSchema<TIn, C, TOut> {
        // custom methods
        emptyAsUndefined(): ArraySchema<T, C>;
        hasPercentageWeightage(fieldName: string, weightageFieldName: string): ArraySchema<T, C>;
    }
}

export { yup as Yup };
