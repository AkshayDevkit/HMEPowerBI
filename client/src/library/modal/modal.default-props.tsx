import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const modalDefaultPros = ({ ...props }) => {
    props.okButtonProps = props.okButtonProps || {};
    props.okButtonProps.icon = <FontAwesomeIcon size={'lg'} icon={faCheck} />;

    props.centered = true;

    return props;
};
