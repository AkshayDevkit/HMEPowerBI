import { ChangeEvent, cloneElement, CSSProperties, FocusEvent, useEffect, useState } from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import { reaction } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { useFormContext } from './useFormContext';
import { FieldError, FieldName } from './types';
import { FieldErrorMessage } from './FieldErrorMessage';
import classNames from 'classnames';
import { useFieldArrayContext } from './useFieldArrayContext';

export interface FieldProps {
    name: FieldName;
    label?: string;
    className?: string;
    children?: any;
    index?: number;
    style?: CSSProperties;
}

export const Field = (props: FieldProps) => {
    if (!props.children) {
        throw new Error('kindly pass children to use Field component');
    }

    if (Array.isArray(props.children)) {
        throw new Error('kindly pass only one children to use Field component');
    }

    let name = props.name || props.children.props?.name;

    if (!name) {
        throw new Error('kindly pass name to use Field component for ' + name);
    }

    const form = useFormContext();

    const fieldArrayRootProperty = form.fieldArrays.find((x) => name === x.name);

    const fieldArray = !fieldArrayRootProperty ? useFieldArrayContext() : null;

    if (fieldArray && !props.index && props.index !== 0) {
        throw new Error('kindly pass index to use Field with Field Array component for ' + name);
    }

    if (fieldArray) {
        name = fieldArray.getName(props.index as any, name);
    }

    var values = fieldArray ? fieldArray.model : form.values;

    const getFieldValue = () => _get(values, name);

    const [value, setValue] = useState<unknown>(getFieldValue());

    const parseValue = (event: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
        return event.target.type === 'checkbox' ? event.target.checked : event.target.value; //
    };

    const setFormValue = (name: string, value: any) => {
        if (fieldArray) {
            fieldArray.setPathValue(name, value);
        } else {
            form.setValue(name, value);
        }
    };

    const modifiedProps: any = {
        name: name,
        key: name,
        value: value,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
            if (props.children.props.onChange) {
                props.children.props.onChange(event);
            }
            const parsedValue = parseValue(event);
            if (getFieldValue() !== parsedValue) {
                setValue(parsedValue);
                setFormValue(name, parsedValue);
            }
        },
        onBlur: (event: ChangeEvent<HTMLInputElement>) => {
            if (props.children.props.onBlur) {
                props.children.props.onBlur(event);
            }
        },
    };

    const children = cloneElement(props.children, {
        ...props,
        ...modifiedProps,
    });

    useEffect(() => {
        const dispose = reaction(
            () => {
                return [getFieldValue()];
            },
            () => {
                setValue(getFieldValue());
            },
            {
                fireImmediately: true,
            },
        );
        return () => {
            dispose();
        };
    }, [getFieldValue()]);

    return (
        <Observer>
            {() => (
                <div
                    className={classNames(
                        'field',
                        {
                            'field-array': fieldArrayRootProperty,
                            'field-array-property': fieldArray,
                            'no-label': !props.label,
                        },
                        props.className ? props.className : '',
                    )}
                    style={props.style}
                >
                    <div className="form-label">
                        {props.label && <label htmlFor={name}>{props.label}</label>}
                    </div>
                    <div className="field-control">
                        {form.formOptions.debug &&
                            console.log(
                                `Debug Rendered${fieldArrayRootProperty ? ` Root` : ``}${
                                    fieldArray ? ` Field Array` : ``
                                } Field ${name}`,
                            )}
                        {children}
                    </div>
                    {form.errors[name] && (
                        <FieldErrorMessage
                            key={name}
                            name={name}
                            error={form.errors[name] as FieldError}
                        />
                    )}
                </div>
            )}
        </Observer>
    );
};
