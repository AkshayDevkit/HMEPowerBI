import { ReactNode } from 'react';
import { CSSProperties } from 'styled-components';
import './spliter.scss';

export const Spliter = ({
    children,
    style,
}: {
    children: ReactNode[];
    style?: CSSProperties;
}) => {
    if (children && !children.length) {
        throw new Error('Spliter requires children elements');
    }
    return (
        <div className="spliter" style={style}>
            {children}
        </div>
    );
};

export const SpliterContainer = ({
    width,
    align,
    children,
    style,
}: {
    width: string;
    align?: 'left' | 'right' | undefined;
    children: ReactNode;
    style?: CSSProperties;
}) => {
    align = align || 'left';
    if (!width) {
        throw new Error('Please specify width');
    }
    if (children && (children as any).length) {
        throw new Error('Spliter requires single DOM element');
    }
    return (
        <div
            className="container"
            style={{
                width: width,
                float: align,
                ...(style || {}),
            }}
        >
            {children}
        </div>
    );
};
