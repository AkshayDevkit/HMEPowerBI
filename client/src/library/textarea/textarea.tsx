import { useState, useEffect, useRef } from 'react';
import { EventKeys } from '@util/event-keys';
import './textarea.scss';

export const Textarea = ({
    name,
    value,
    rows,
    placeholder,
    setValue,
    onChange,
    onFocus,
    onBlur,
    disabled,
}: any) => {
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(true);
    const control = useRef();

    const handleFocus = (event: any) => {
        setVisiblePlaceholder(false);
        if (onFocus) {
            onFocus(event);
        }
    };

    const handleBlur = (event: any) => {
        setVisiblePlaceholder(true);
        if (onBlur) {
            onBlur(event);
        }
    };

    const handleKeydown = (event: any) => {
        if (EventKeys.isDelete(event)) {
            if (setValue) {
                setValue('');
            }
        }
    };

    useEffect(() => {
        (control.current as any).addEventListener('keydown', handleKeydown);
        return () => {
            (control.current as any).removeEventListener('keydown', handleKeydown);
        };
    }, []);

    return (
        <div className="textarea" ref={control as any}>
            {disabled ? (
                <textarea
                    name={name}
                    value={value}
                    rows={rows}
                    placeholder={visiblePlaceholder ? placeholder : ''}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled
                />
            ) : (
                <textarea
                    name={name}
                    value={value}
                    rows={rows}
                    placeholder={visiblePlaceholder ? placeholder : ''}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            )}
        </div>
    );
};
