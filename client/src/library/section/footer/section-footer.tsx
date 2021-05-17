import { ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';
import './section-footer.scss';

export const SectionFooter = ({
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
        <div className={classNames('section-footer', className)} style={style}>
            {children}
        </div>
    );
};
