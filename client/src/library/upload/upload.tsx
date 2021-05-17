import { Upload as AntdUpload, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonType } from '@library/button';

export interface IUploadProps extends UploadProps {
    title?: string;
}

export const Upload = (props: IUploadProps) => {
    return (
        <AntdUpload {...props}>
            <Button
                startIcon={
                    <FontAwesomeIcon icon={faFileUpload}></FontAwesomeIcon>
                }
                type={ButtonType.Quaternary}
            >
                {props.title || 'Upload'}
            </Button>
        </AntdUpload>
    );
};

export const LIST_IGNORE = AntdUpload.LIST_IGNORE;
