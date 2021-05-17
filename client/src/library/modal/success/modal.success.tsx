import { Modal } from 'antd';
import { modalDefaultPros } from '../modal.default-props';

export const success = ({ ...props }) => {
    props = modalDefaultPros(props);

    return Modal.success({
        ...props,
    });
};
