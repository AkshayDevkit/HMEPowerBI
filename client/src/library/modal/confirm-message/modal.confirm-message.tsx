import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faTimes,
    faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'antd';
import { modalDefaultPros } from '../modal.default-props';

export const confirmMessage = ({ ...props }) => {
    props.okButtonProps = props.okButtonProps || {};
    props.okButtonProps.icon = <FontAwesomeIcon size={'lg'} icon={faTimes} />;
    props.okButtonProps.className = 'btn secondary';
    props.centered = true;

    const cancelButtonProps = props.cancelButtonProps || {};
    cancelButtonProps.icon = <FontAwesomeIcon size={'lg'} icon={faCheck} />;
    cancelButtonProps.className = 'btn primary';

    const modal = Modal.confirm({
        okText: 'Ok & Term',
        cancelText: 'Ok',
        title: 'Message from Webpage',
        className: 'confirm-message',
        icon: (
            <span className="anticon">
                <FontAwesomeIcon size={'lg'} icon={faExclamationTriangle} />
            </span>
        ),
        cancelButtonProps: cancelButtonProps,
        ...props,
    });

    return modal;
};
