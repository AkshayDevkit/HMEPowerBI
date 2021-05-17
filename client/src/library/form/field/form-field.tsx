import React, {
    ChangeEventHandler,
    cloneElement,
    CSSProperties,
    FocusEventHandler,
    useEffect,
    useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { Label } from '@library/label';
import { IForm } from '../useForm';
import { FormFieldHandlers } from './form-field.handlers';
import { FormFieldError } from './form-field-error';

export enum FormFieldLabelPosition {
    Top = 'top',
    Inline = 'inline',
}

export interface IFormFieldProps {
    name?: string;
    watch?: boolean;
    className?: string;
    label?: string;
    labelPosition?: FormFieldLabelPosition;
    endLabel?: string;
    required?: string;
    children?: any;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    isFieldArray?: boolean;
    style?: CSSProperties;
    empty?: boolean;
}

export const FormField = ({
    name = '',
    watch,
    className,
    label,
    labelPosition = FormFieldLabelPosition.Top,
    endLabel,
    required,
    children,
    onChange,
    onBlur,
    isFieldArray,
    style,
    empty,
    ...props
}: IFormFieldProps) => {
    const formContext = useFormContext() as IForm;
    const [touched, setTouched] = useState(false);
    if (empty) {
        return (
            <FormFieldRenderer
                name={name}
                formContext={formContext}
                touched={touched}
                className={className}
                labelPosition={labelPosition}
                endLabel={endLabel}
                label={label}
                required={required}
                isFieldArray={isFieldArray}
                style={style}
            >
                {children}
            </FormFieldRenderer>
        );
    }
    const formFieldHandlers = new FormFieldHandlers(children?.props);
    const [inputValue, setInputValue] = useState('');
    const properties: any = {};

    const isDirty = (value: any) => {
        return value != null || value != undefined || value != '';
    };

    const registerOnChange = () => {
        const existingOnChange = children.props.onChange;
        properties.onChange = (e: any) => {
            if (!touched) {
                setTouched(true);
            }
            if (existingOnChange) {
                existingOnChange(e);
            }

            const value =
                e.target.type === 'checkbox'
                    ? e.target.checked
                    : e.target.value;

            if (!inputValue && !value) {
                return;
            } else if (inputValue != value) {
                setFormContextValue(value);
            }
        };
    };

    const registerOnBlur = () => {
        const existingOnBlur = children.props.onBlur;
        properties.onBlur = (e: any) => {
            if (!touched) {
                setTouched(true);
            }
            if (existingOnBlur) {
                existingOnBlur(e);
            }

            const type = e.target.type;
            const value =
                type === 'checkbox' ? e.target.checked : e.target.value;

            formFieldHandlers.setValues(name, value);
            setDataProps();

            if (required || type === 'tel') {
                setFormContextValue(value);
            }
        };
    };

    const setFormContextValue = (value: any) => {
        setInputValue(value);
        formContext.setValue(name, value, {
            shouldValidate: true,
            shouldDirty: typeof value === 'boolean' ? value : isDirty(value),
        });
    };

    const setDataProps = () => {
        if (!children.props.data) {
            properties.data = formFieldHandlers.getValues(name);
        }
    };

    const setProps = () => {
        (props as any).name = name;
        (props as any).value = inputValue;

        if (watch) {
            (props as any).watch = formContext.watch(name);
        }
    };

    setDataProps();
    registerOnChange();
    registerOnBlur();
    setProps();

    children = cloneElement(children, {
        ...props,
        ...children.props,
        ...properties,
    });

    useEffect(() => {
        const _value = formContext.getValues(name);
        setInputValue(_value);
    }, [formContext.getValues(name)]);

    formContext.register(name);

    return (
        <FormFieldRenderer
            name={name}
            formContext={formContext}
            touched={touched}
            className={className}
            labelPosition={labelPosition}
            endLabel={endLabel}
            label={label}
            required={required}
            isFieldArray={isFieldArray}
            style={style}
        >
            {children}
        </FormFieldRenderer>
    );
};

const FormFieldRenderer = ({
    name,
    formContext,
    touched,
    className,
    endLabel,
    label,
    labelPosition,
    required,
    children,
    renderChildrenAsFunctionChild = true,
    isFieldArray,
    style,
}: any) => {
    const [isTouched, setTouched] = useState(touched);
    useEffect(() => {
        setTouched(touched);
    }, [touched]);

    return (
        <div
            className={classNames(
                'field' +
                    (isTouched && getFieldError(formContext.errors, name)
                        ? ' invalid'
                        : ''),
                labelPosition ? labelPosition : '',
                isFieldArray ? 'field-array' : '',
                className,
            )}
            style={style}
        >
            {!endLabel && label ? (
                <RenderLabel name={name} label={label} required={required} />
            ) : null}
            {isFieldArray && (
                <FormFieldError
                    key={name}
                    name={name}
                    error={getFieldError(formContext.errors, name)}
                    showIcon={true}
                    style={{
                        marginBottom: '1em',
                    }}
                />
            )}
            <div className="control">
                {children && (
                    <div className="form-input">
                        {!renderChildrenAsFunctionChild
                            ? children
                            : renderChildren(children)}
                    </div>
                )}
                {!isFieldArray && (
                    <FormFieldError
                        key={name}
                        name={name}
                        error={getFieldError(formContext.errors, name)}
                        showIcon={true}
                    />
                )}
            </div>
        </div>
    );
};

const RenderLabel = ({
    name,
    label,
    required,
}: {
    name: string;
    label: any;
    required: any;
}) => {
    return (
        <div className="form-label">
            <Label name={name} title={label} required={required} />
        </div>
    );
};

const renderChildren = (children: any) => {
    return children ? (
        typeof children === 'function' ? (
            children(children.props)
        ) : Array.isArray(children) ? (
            children.map((child, index) => {
                return renderChild(child, index.toString());
            })
        ) : (
            renderChild(children)
        )
    ) : (
        <input
            type="text"
            {...children.props.field}
            placeholder={children.props.title}
        />
    );
};

const renderChild = (child: any, key?: string) => {
    return <React.Fragment key={key}>{child}</React.Fragment>;
};

const getFieldError = (errors: any, name: string): any => {
    if (!errors || !name) {
        return undefined;
    }
    if (errors[name]) {
        return errors[name];
    }
    const names = name.split(new RegExp(/[,[\].]+?/)).filter((x) => x);
    if (errors[names[0]]) {
        return getRecursiveError(errors, names, 0);
    }
    return undefined;
};

const getRecursiveError = (
    errors: any,
    names: string[],
    counter: number,
): any => {
    const error = errors[names[counter]];
    if (error && error.message) {
        return error;
    } else if (error) {
        return getRecursiveError(error, names, counter + 1);
    }
    return undefined;
};
