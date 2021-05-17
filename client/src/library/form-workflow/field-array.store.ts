import { action, makeObservable, observable, toJS } from 'mobx';
import _get from 'lodash/get';
import _set from 'lodash/set';
import {
    FieldValues,
    FieldArrayInstance,
    FormErrors,
    FormInstance,
    FieldArrayOptions,
    FieldName,
    FieldValue,
} from './types';
import {
    addKeys,
    getIndexFromArrayPath,
    getNameFromArrayPath,
    moveArray,
    swapArray,
    toPath,
} from './util';

export class FieldArrayStore<TFieldValues extends FieldValues>
    implements FieldArrayInstance<TFieldValues> {
    name: string;
    defaultValues: TFieldValues[] = [];
    dirtyFields: TFieldValues[] = [];
    errors: FormErrors[] = [];
    model: TFieldValues = {} as TFieldValues;
    values: TFieldValues[] = [];

    constructor(
        public formInstance: FormInstance<TFieldValues>,
        public options: FieldArrayOptions<TFieldValues>,
    ) {
        makeObservable(this, {
            dirtyFields: observable,
            errors: observable,
            model: observable,
            values: observable,
            prepend: action,
            append: action,
            insert: action,
            remove: action,
            move: action,
            swap: action,
            setValues: action,
            removeValues: action,
        });
        this.name = options.name;
        this.defaultValues = (_get(formInstance.defaultValues, options.name) ||
            []) as [];

        this.reset();
    }

    reset = (values?: TFieldValues[]): void => {
        const resetValues = values || this.defaultValues || [];
        this.values = [];
        this.append(resetValues);
    };

    prepend(
        value: Partial<TFieldValues> | Partial<TFieldValues>[],
        shouldFocus?: boolean,
    ) {
        const newValues = Array.isArray(value) ? value : [value];
        this.setValues([...newValues, ...this.values]);
    }

    append(
        value: Partial<TFieldValues> | Partial<TFieldValues>[],
        shouldFocus?: boolean,
    ) {
        const newValues = Array.isArray(value) ? value : [value];
        this.setValues([...this.values, ...newValues]);
    }

    insert(
        index: number,
        value: Partial<TFieldValues> | Partial<TFieldValues>[],
        shouldFocus?: boolean,
    ) {
        const values = toJS(this.values);
        if (index > 0 && !values[index - 1]) {
            return;
        }
        const newValues = Array.isArray(value) ? value : [value];
        values.splice(index, 0, ...(newValues as TFieldValues[]));
        this.setValues([...values]);
    }

    remove(index?: number | number[]) {
        const indexes = Array.isArray(index) ? index : [index];
        const newValues = toJS(this.values).filter(
            (x, i) => indexes.find((_x, _i) => _x === i) === undefined,
        );
        this.removeValues(indexes as []);
        this.setValues(newValues);
    }

    move(indexA: number, indexB: number) {
        const newValues = moveArray([...toJS(this.values)], indexA, indexB);
        this.setValues(newValues);
    }

    swap(indexA: number, indexB: number) {
        const newValues = swapArray([...toJS(this.values)], indexA, indexB);
        this.setValues(newValues);
    }

    getName(index: number, name: FieldName): FieldName {
        // return name;
        return toPath(this.name, index, name);
    }

    getValue(index: number, name: FieldName): FieldValue {
        return this.model[toPath(this.name, index, name)];
    }

    setValue(index: number, name: FieldName, value: FieldValue): void {
        name = toPath(this.name, index, name);
        this.setPathValue(name, value);
    }

    setPathValue(name: FieldName, value: FieldValue): void {
        (this.model as any)[name] = value;

        const index = getIndexFromArrayPath(name);
        this.values[index] = this.values[index] || {};
        _set(this.values[index], getNameFromArrayPath(name), value);
    }

    setValues(values: Partial<TFieldValues>[]): void {
        this.values = addKeys(values) as TFieldValues[];
        this.values.forEach((x, index) => {
            for (const key in x) {
                this.setValue(index, key, x[key]);
            }
        });
        this.formInstance.onSetFieldArrayValue(this);
    }

    removeValues(indexes: number[]) {
        this.values.forEach((value, i) => {
            if (
                indexes.find((indexValue, index) => indexValue != i) ===
                undefined
            ) {
                Object.keys(value).forEach((key: string) => {
                    const name = this.getName(i, key);
                    delete (this.model as any)[name];
                });
            }
        });
        this.formInstance.onRemoveFieldArrayValues(indexes, this);
    }
}
