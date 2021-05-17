import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

export const Avatar = ({
    name,
    url,
    size,
}: {
    name: string;
    url: string;
    size?: AvatarSize;
}) => {
    return (
        <div className="avatar">
            <AntdAvatar
                size={size || 'default'}
                icon={<UserOutlined />}
                src={url}
                style={{
                    backgroundColor: '#f56a00',
                }}
                alt={name}
            >
                {name}
            </AntdAvatar>
            <span style={{ marginLeft: '0.5em' }}>{name}</span>
        </div>
    );
};
