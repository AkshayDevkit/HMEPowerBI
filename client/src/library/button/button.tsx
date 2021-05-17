import { ReactNode, MouseEventHandler, CSSProperties } from 'react';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd';
import './button.scss';

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Quaternary = 'quaternary',
    Ghost = 'ghost',
    Dashed = 'dashed',
    Link = 'link',
    Text = 'text',
}

export enum SubmitAction {
    Default = 'default',
    Close = 'close',
    New = 'new',
    Add = 'add',
    Back = 'back',
}

export enum ButtonHTMLType {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset',
}

export enum ButtonSize {
    Small = 'small',
    Middle = 'middle',
    Large = 'large',
}

interface IProps {
    primary?: boolean;
    type?: ButtonType;
    disabled?: boolean;
    startIcon?: any;
    endIcon?: any;
    children?: any;
    onClick?: MouseEventHandler<HTMLElement>;
    htmlType?: ButtonHTMLType;
    danger?: boolean;
    loading?: boolean;
    size?: ButtonSize;
    href?: string;
    style?: CSSProperties;
    className?: string;
    tabIndex?: number;
    icon?: ReactNode;
}

export const Button = (props: IProps) => {
    return (
        <span className="btn-container">
            <AntdButton
                tabIndex={props.tabIndex}
                htmlType={props.htmlType || ButtonHTMLType.Button}
                className={classNames('btn', props.type, props.className)}
                size={props.size}
                loading={props.loading}
                danger={props.danger}
                disabled={props.disabled}
                href={props.href}
                onClick={props.onClick}
                style={props.style}
                type={props.type as any}
                icon={props.icon}
            >
                {props.startIcon ? (
                    <span className="btn-icon start">{props.startIcon}</span>
                ) : null}
                {props.children}
                {props.endIcon ? (
                    <span className="btn-icon end">{props.endIcon}</span>
                ) : null}
            </AntdButton>
        </span>
    );
};
