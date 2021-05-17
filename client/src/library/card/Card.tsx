import { FC } from 'react';
import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';
import './card.scss';

export interface CardProps extends AntdCardProps {
    width?: string | number;
}

export const Card: FC<CardProps> = (props) => {
    const width = props.width;
    return (
        <div className="card-container">
            <AntdCard {...props} style={{ width: props.width }}>
                {props.children}
            </AntdCard>
        </div>
    );
};
