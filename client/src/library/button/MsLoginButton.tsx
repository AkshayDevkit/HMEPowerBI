import { FC } from 'react';
import { Button, ButtonProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
import { WindowsFilled } from '@ant-design/icons';

export const MsLoginButton: FC<ButtonProps> = (props) => {
    return (
        <Button
            {...props}
            icon={<WindowsFilled />}
            style={{ background: '#1babe2', color: '#fff' }}
        >
            <strong> Sign in with Microsoft</strong>
        </Button>
    );
};
