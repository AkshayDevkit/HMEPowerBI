import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faAlert } from '@library/font-awesome-icon/fa-alert';
import { Modal } from 'antd';
import { modalDefaultPros } from '../modal.default-props';

export const confirm = ({ ...props }) => {
    props = modalDefaultPros(props);

    const cancelButtonProps = props.cancelButtonProps || {};
    cancelButtonProps.icon = <FontAwesomeIcon size={'lg'} icon={faTimes} />;
    cancelButtonProps.className = 'ant-btn btn secondary';

    return Modal.confirm({
        okText: 'Yes',
        cancelText: 'No',
        icon: (
            <span className="anticon">
                <FontAwesomeIcon icon={faAlert as any} />
            </span>
        ),
        cancelButtonProps: cancelButtonProps,
        ...props,
    });
};
