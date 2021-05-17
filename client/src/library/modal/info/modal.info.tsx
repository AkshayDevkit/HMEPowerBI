import { Modal } from 'antd';
import { modalDefaultPros } from '../modal.default-props';

export const info = ({ ...props }) => {
    props = modalDefaultPros(props);

    return Modal.info({
        ...props,
    });
};
