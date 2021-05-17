import { Modal } from 'antd';
import { modalDefaultPros } from '../modal.default-props';

export const error = ({ ...props }) => {
    props = modalDefaultPros(props);
    props.content = props.content || 'Something went wrong';

    return Modal.error({
        ...props,
    });
};
