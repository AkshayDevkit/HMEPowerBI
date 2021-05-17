import { useEffect, ReactNode, useState } from 'react';
import { Observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faEraser } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '@library/modal';
import { ScrollBar } from '@library/scrollbar';
import { RenderChildrenAsFunctionChild } from '@util/component';
import {
    Section,
    SectionHeader,
    SectionHeaderTitle,
    SectionBody,
    SectionFooter,
    SectionTheme,
    SectionAlignment,
    SectionLayoutType,
} from '@library/section';
import { Form, useForm } from '@library/form-workflow';
import { Spin } from '@library/spin';
import { Button, ButtonHTMLType, ButtonType } from '@library/button';
import { IModel } from '../models';

export interface IBaseForm {
    title: string;
    defaultValues: any;
    model: IModel | null;
    loading: boolean;
    onSave: (values: IModel) => void;
    onCancel: () => void;
    validationSchema: any;
    className?: string;
    children?: ReactNode;
    modal?: boolean;
    modalVisible?: boolean;
    autoHeightMax?: string;
}

export const BaseForm = ({
    title,
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    validationSchema,
    className,
    children,
    modal = false,
    modalVisible = false,
    autoHeightMax,
}: IBaseForm) => {
    const [isModalVisible, setIsModalVisible] = useState(modalVisible);

    const isUpdate = (): boolean => {
        return model && model.id ? true : false;
    };

    const form = useForm({
        defaultValues: isUpdate() ? model : defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (onSave) {
                onSave(values as any);
            }
        },
        onReset: () => {},
        debug: true,
    });

    useEffect(() => {
        setIsModalVisible(modalVisible);
    }, [modalVisible]);

    useEffect(() => {
        if (isUpdate()) {
            form.setValues(model as any);
        }
    }, [model]);

    if (modal) {
        return (
            <Modal
                title={title}
                visible={isModalVisible}
                onOk={() => {
                    form.submit();
                }}
                onCancel={() => {
                    setIsModalVisible(false);
                    if (onCancel) {
                        onCancel();
                    }
                }}
                okText={isUpdate() ? 'Update' : 'Add'}
            >
                <Form instance={form} className={className}>
                    <Spin spinning={loading}>
                        {RenderChildrenAsFunctionChild(children, { form })}
                    </Spin>
                </Form>
            </Modal>
        );
    }

    return (
        <Observer>
            {() => (
                <Form instance={form} className={className}>
                    <Section theme={SectionTheme.White}>
                        <SectionHeader>
                            <Section align={SectionAlignment.Left}>
                                <SectionHeaderTitle
                                    startIcon={
                                        <FontAwesomeIcon
                                            icon={isUpdate() ? faEdit : faPlus}
                                        ></FontAwesomeIcon>
                                    }
                                >
                                    {isUpdate() ? 'Edit' : 'New'} {title}
                                </SectionHeaderTitle>
                            </Section>
                        </SectionHeader>
                        <Spin spinning={loading}>
                            <SectionBody padding>
                                <ScrollBar autoHeight>
                                    {RenderChildrenAsFunctionChild(children, {
                                        form,
                                    })}
                                </ScrollBar>
                            </SectionBody>
                            <SectionFooter>
                                <Section
                                    layout={SectionLayoutType.Horizontal}
                                    align={SectionAlignment.Center}
                                    autoSpacing={true}
                                >
                                    <Section>
                                        <Button
                                            startIcon={
                                                <FontAwesomeIcon
                                                    icon={isUpdate() ? faEdit : faPlus}
                                                ></FontAwesomeIcon>
                                            }
                                            type={ButtonType.Primary}
                                            htmlType={ButtonHTMLType.Submit}
                                        >
                                            {isUpdate() ? 'Update' : 'Add'}
                                        </Button>
                                    </Section>
                                    <Section>
                                        <Button
                                            startIcon={
                                                <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
                                            }
                                            type={ButtonType.Secondary}
                                            onClick={() => {
                                                form.reset();
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Section>
                                    <Section>
                                        <Button
                                            startIcon={
                                                <FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>
                                            }
                                            type={ButtonType.Secondary}
                                            onClick={onCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </Section>
                                </Section>
                            </SectionFooter>
                        </Spin>
                    </Section>
                </Form>
            )}
        </Observer>
    );
};
