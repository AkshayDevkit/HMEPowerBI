import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@library/modal';
import { Button, ButtonType } from '@library/button';

export const modalDemo = () => {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = (e: any) => {
        setVisible(false);
    };

    const handleCancel = (e: any) => {
        setVisible(false);
    };

    return (
        <div className="modal-demo">
            <Button type={ButtonType.Primary} onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title={
                    <span className="title">
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Modal
                    </span>
                }
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                closable
                footer={[
                    <span key="submit" style={{ float: 'left' }}>
                        <Button type={ButtonType.Primary} onClick={handleOk}>
                            Submit
                        </Button>
                    </span>,
                    <Button
                        key="back"
                        type={ButtonType.Secondary}
                        onClick={handleCancel}
                    >
                        Return
                    </Button>,
                ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
};

export { modalDemo as ModalDemo };
