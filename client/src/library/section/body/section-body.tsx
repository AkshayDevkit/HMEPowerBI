import { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import './section-body.scss';

export const SectionBody = ({
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
    className = classNames(padding ? `padding` : '');

    return (
        <div className={classNames('section-body', className)} style={style}>
            {children}
        </div>
    );
};
