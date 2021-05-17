import { addKeys } from '@library/util/js-helper';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form/dist/types';
import { IForm, IFormUseFieldArrayMethods } from '../useForm';

export const useFieldArray = (
    form: IForm,
    name: string,
    keyName?: string,
    defaultValues?: FieldValues,
): IFormUseFieldArrayMethods => {
    const [values, setValues] = useState<FieldValues[]>([]);

    const getRootName = () => {
        const matchingFieldRefs = Object.keys(form.control.fieldsRef.current)
            .sort(function (a, b) {
                // sort high to low string length
                return b.length - a.length;
            })
            .filter((x) => new RegExp('.' + name + '$').test(x))
            .map((x) => x.split(new RegExp('.' + name + '$')));
        if (matchingFieldRefs.length > 0) {
            matchingFieldRefs[0][0];
        }
        return name;
    };

    const getFieldRefs = (index?: number) => {
        if (index === undefined) {
            return Object.keys(form.control.fieldsRef.current).filter((x) =>
                new RegExp(`^${getRootName()}\\[`).test(x),
            );
        }
        return Object.keys(form.control.fieldsRef.current).filter((x) =>
            new RegExp(`^${getRootName()}\\[${index}\\]`).test(x),
        );
    };

    const unregisterFieldRefs = (index?: number) => {
        const fieldRefs = getFieldRefs(index);
        fieldRefs.forEach((name) => {
            form.unregister(name);
        });
        form.unregister(getRootName());
    };

    const registerFieldRefs = (values: any[]) => {
        form.register(getRootName());
        values.forEach((value, index: number) => {
            for (const key in value) {
                const fieldName = toArrayPropertyString(
                    getRootName(),
                    index,
                    key,
                );
                form.setValue(fieldName, value[key], {
                    shouldValidate: true,
                });
            }
        });
    };

    const swapArray = (arr: any[], indexA: number, indexB: number) => {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
        return arr;
    };

    const moveArray = (arr: any[], indexA: number, indexB: number) => {
        if (indexB >= arr.length) {
            var k = indexB - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(indexB, 0, arr.splice(indexA, 1)[0]);
        return arr;
    };

    const setValuesInternal = (values: any[]) => {
        form.setValue(getRootName(), values);
        setValues(addKeys(values));
        registerFieldRefs(values);
    };

    useEffect(() => {
        form.setValue(getRootName(), values);
    }, [values]);

    useEffect(() => {
        var formValues = form.getValues(name);
        if (Array.isArray(formValues)) {
            setValuesInternal(formValues);
        }
    }, [form.getValues(name)]);

    useEffect(() => {
        if (Array.isArray(defaultValues)) {
            setValuesInternal(defaultValues);
        }
    }, []);

    return {
        values: values,
        setValues: setValues,
        prepend: (
            value: Partial<FieldValues> | Partial<FieldValues>[],
            shouldFocus?: boolean,
        ) => {
            const newValues = Array.isArray(value) ? value : [value];
            setValuesInternal([...newValues, ...values]);
        },
        append: (
            value: Partial<FieldValues> | Partial<FieldValues>[],
            shouldFocus?: boolean,
        ) => {
            const newValues = Array.isArray(value) ? value : [value];
            setValuesInternal([...values, ...newValues]);
        },
        insert: (
            index: number,
            value: Partial<FieldValues> | Partial<FieldValues>[],
            shouldFocus?: boolean,
        ) => {
            const newValues = Array.isArray(value) ? value : [value];
            const insertedNewValues = [...values];
            insertedNewValues.splice(index, 0, newValues);
            setValuesInternal(insertedNewValues);
        },
        remove: (index?: number | number[]) => {
            const indexes = Array.isArray(index) ? index : [index];
            // TODO: Not sure why this 'values' in not working in remove method only, could be due to antd delete from column
            const _svalues = form.getValues(getRootName()) as [];
            const model = values;
            const newValues = model.filter(
                (x, i) => indexes.find((_x, _i) => _x === i) === undefined,
            );
            indexes.forEach((x) => {
                unregisterFieldRefs(x);
            });
            setValuesInternal([...newValues]);
        },
        move: (indexA: number, indexB: number) => {
            const newValues = moveArray([...values], indexA, indexB);
            setValuesInternal([...newValues]);
        },
        swap: (indexA: number, indexB: number) => {
            const newValues = swapArray([...values], indexA, indexB);
            setValuesInternal([...newValues]);
        },
    };
};

export const toArrayPropertyString = (
    arrayName: string,
    index: number,
    propertyName: string,
) => {
    return `${arrayName}[${index}].${propertyName}`;
};
