import { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import './section-header.scss';

export const SectionHeader = ({
    className,
    style,
    padding,
    children,
}: {
    className?: string;
    style?: CSSProperties;
    padding?: boolean;
    children?: ReactNode;
}) => {
    return (
        <div
            className={classNames(
                'section-header',
                padding ? `padding` : '',
                className,
            )}
            style={style}
        >
            {children}
        </div>
    );
};

export const SectionHeaderTitle = ({
    startIcon,
    endIcon,
    className,
    style,
    children,
}: any) => {
    return (
        <div className={classNames('title', className)} style={style}>
            {startIcon ? <span className="icon start">{startIcon}</span> : null}
            <span className="text">{children}</span>
            {endIcon ? <span className="icon end">{endIcon}</span> : null}
        </div>
    );
};
