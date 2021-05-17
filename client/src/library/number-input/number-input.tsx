import {
    useState,
    useEffect,
    ReactNode,
    ChangeEventHandler,
    FocusEventHandler,
    MouseEventHandler,
    ChangeEvent,
    FocusEvent,
} from 'react';
import { useIntl } from 'react-intl';
import { Input, InputType } from '@library/input';
import {
    NumberFormatType,
    NumberInputValidator,
} from './number-input-validator';
import './number-input.scss';

export interface INumberInputProps {
    id?: string;
    type?: string;
    name?: string;
    value?: number;
    defaultValue?: number;
    maxLength?: number;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
    disabled?: boolean;
    endIcon?: ReactNode;
    onEndIconClick?: MouseEventHandler<HTMLSpanElement>;
    format?: NumberFormatType;
}

export const NumberInput = ({
    id,
    name,
    value,
    maxLength,
    placeholder,
    onChange,
    onFocus,
    onBlur,
    disabled,
    endIcon,
    onEndIconClick,
    format = NumberFormatType.Number,
}: INumberInputProps) => {
    const [controlValue, setControlValue] = useState(value);
    const { formatNumber } = useIntl();

    const numberInputValidator = new NumberInputValidator(format);

    placeholder = placeholder || numberInputValidator.placeholder;
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numberValue = numberInputValidator.transform(value);
        setControlValue(numberValue);
        if (onChange) {
            onChange(updateEventValue(event, numberValue));
        }
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setVisiblePlaceholder(false);
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setVisiblePlaceholder(true);
        let numberValue = numberInputValidator.parseNumber(event.target.value);
        if (isValue(numberValue) && numberValue != '') {
            numberValue = numberInputValidator.formatNumber(
                numberValue,
                formatNumber,
            );
            setControlValue(numberValue);

            if (onBlur) {
                onBlur(updateEventValue(event, numberValue));
            }
        } else {
            if (onBlur) {
                onBlur(event);
            }
        }
    };

    const updateEventValue = (event: any, value: number) => {
        return {
            ...event,
            target: {
                ...event.target,
                value: value,
                name: name,
            },
            value: value,
        };
    };

    const isValue = (value: any) => {
        return value != null && value != undefined;
    };

    useEffect(() => {
        setControlValue(value);
    }, [value]);

    useEffect(() => {
        if (isValue(value) && (value as any) != '')
            setControlValue(
                numberInputValidator.formatNumber(value, formatNumber),
            );
    }, []);

    return (
        <div className="number-text-box">
            <Input
                id={id}
                type={InputType.Text}
                name={name}
                value={controlValue}
                maxLength={maxLength}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={disabled}
                placeholder={visiblePlaceholder ? placeholder : ''}
                endIcon={endIcon}
                onEndIconClick={onEndIconClick}
            />
        </div>
    );
};
