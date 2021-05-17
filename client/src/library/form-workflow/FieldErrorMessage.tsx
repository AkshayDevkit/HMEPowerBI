import { CSSProperties, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FieldError } from './types';

export const FieldErrorMessage = ({
    name,
    error,
    showIcon = true,
    style,
}: {
    name: string;
    error: FieldError;
    showIcon?: boolean;
    style?: CSSProperties;
}) => {
    const errors = error ? [error] : [] || [];
    return (
        <Fragment>
            {errors.length ? (
                <div className="field-error" style={style}>
                    <i className="arrow up"></i>
                    {showIcon && (
                        <span className="icon">
                            <FontAwesomeIcon
                                size={'lg'}
                                icon={faExclamationTriangle}
                            />
                        </span>
                    )}
                    {errors.map((error, index) => {
                        return (
                            <div key={index} className="text">
                                {error.message}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div></div>
            )}
        </Fragment>
    );
};
