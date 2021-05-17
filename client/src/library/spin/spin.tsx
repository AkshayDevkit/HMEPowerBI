import classNames from 'classnames';
import { Observer } from 'mobx-react-lite';
import { Spin as AntdSpin } from 'antd';
import { UserContext } from '@components/user';
import './spin.scss';

export enum SpinSize {
    Small = 'small',
    Default = 'default',
    Large = 'large',
}

export const Spin = ({
    spinning,
    size,
    delay,
    tip,
    children,
}: {
    spinning: boolean;
    size?: SpinSize;
    delay?: number;
    tip?: string;
    children?: any;
}) => {
    return (
        <Observer>
            {() => (
                <AntdSpin
                    spinning={spinning}
                    size={size}
                    delay={delay}
                    tip={tip}
                >
                    {children}
                </AntdSpin>
            )}
        </Observer>
    );
};
