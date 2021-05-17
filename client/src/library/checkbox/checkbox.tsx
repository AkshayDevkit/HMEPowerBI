import { FocusEventHandler } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import './checkbox.scss';

export interface CheckboxProps {
    name?: string;
    label: string;
    value?: boolean;
    onChange?: (e: CheckboxChangeEvent) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
}

export const Checkbox = ({
    name,
    value,
    onChange,
    onBlur,
    label,
    className,
    defaultChecked,
    disabled,
}: CheckboxProps) => {
    return (
        <div className="checkbox">
            <AntdCheckbox
                name={name}
                checked={value || false}
                indeterminate={value}
                onChange={onChange}
                className={className}
                defaultChecked={defaultChecked}
                disabled={disabled}
            />
            <span className="label">{label}</span>
        </div>
    );
};
