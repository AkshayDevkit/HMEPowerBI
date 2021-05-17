import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import { faAlert } from '@library/font-awesome-icon/fa-alert';
import { modalDefaultPros } from '../modal.default-props';

export const warning = ({ ...props }) => {
    props = modalDefaultPros(props);

    return Modal.warning({
        icon: (
            <span className="anticon">
                <FontAwesomeIcon icon={faAlert as any} />
            </span>
        ),
        ...props,
    });
};
