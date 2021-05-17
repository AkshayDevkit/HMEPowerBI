import classNames from 'classnames';
import { CSSProperties } from 'react';
import './widget.scss';

export enum WidgetColor {
    Blue = 'blue',
    Green = 'green',
    Red = 'red',
    Purple = 'purple',
    Yellow = 'yellow',
}

export const Widget = ({
    color,
    title,
    contentTitle,
    className,
    style,
    children,
}: {
    color: WidgetColor;
    title: string;
    contentTitle?: string;
    className?: string;
    style?: CSSProperties;
    children?: any;
}) => {
    className = classNames(color ? color : '', className, 'widget');
    return (
        <div className="widget-container">
            <div className={className} style={style}>
                <div className="title">{title}</div>
                <div className="content">
                    <div className="content-title">{contentTitle}</div>
                    <div className="content-count">{children}</div>
                </div>
            </div>
        </div>
    );
};
