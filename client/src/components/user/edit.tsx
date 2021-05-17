import { useEffect, useState } from 'react';
import { Yup } from '@library/yup';
import { Section, SectionLayoutType } from '@library/section';
import { Debug, Field, FormInstance } from '@library/form-workflow';
import { Input } from '@library/input';
import { BaseForm } from '@components/base/components';
import { User } from './types';
import { userStore } from './instances';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().required('First Name is required'),
    email: Yup.string().nullable().required('Email is required'),
    userId: Yup.string().nullable().required('User Id is required'),
    contact1: Yup.string().nullable().required('Contact1 is required'),
});

export const UserEdit = ({
    title = 'User',
    defaultValues,
    model,
    loading,
    onSave,
    onCancel,
    modal = false,
    modalVisible = false,
}: {
    title?: string;
    defaultValues: any;
    model: User | null;
    loading: boolean;
    onSave: (values: User) => void;
    onCancel: () => void;
    modal?: boolean;
    modalVisible?: boolean;
}) => {
    return (
        <BaseForm
            title={title}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={onSave as any}
            onCancel={onCancel}
            validationSchema={validationSchema}
            modal={modal}
            modalVisible={modalVisible}
        >
            {({ form }: { form: FormInstance<any> }) => {
                return (
                    <Section layout={SectionLayoutType.Horizontal} totalFields={2}>
                        <Debug value={form.values}></Debug>
                        <Field name="userId" label="User Id">
                            <Input disabled={model?.id as any} />
                        </Field>
                        <Field name="firstName" label="First Name">
                            <Input />
                        </Field>
                        <Field name="lastName" label="Last Name">
                            <Input />
                        </Field>
                        <Field name="email" label="Email">
                            <Input />
                        </Field>
                        <Field name="contact1" label="Contact1">
                            <Input />
                        </Field>
                        <Field name="contact2" label="Contact2">
                            <Input />
                        </Field>
                        <Field name="address1" label="Address1">
                            <Input />
                        </Field>
                        <Field name="address2" label="Address2">
                            <Input />
                        </Field>
                        <Field name="city" label="City">
                            <Input />
                        </Field>
                        <Field name="state" label="State">
                            <Input />
                        </Field>
                        <Field name="Country" label="Country">
                            <Input />
                        </Field>
                        <Field name="zipcode" label="Zipcode">
                            <Input />
                        </Field>
                    </Section>
                );
            }}
        </BaseForm>
    );
};

export const UserEditModal = ({
    title,
    visible,
    onSave,
    onCancel,
}: {
    title: string;
    visible: boolean;
    onSave?: (user: User) => void;
    onCancel: () => void;
}) => {
    const [isModalVisible, setIsModalVisible] = useState(visible);

    useEffect(() => {
        setIsModalVisible(visible);
    }, [visible]);

    return (
        <UserEdit
            title={title}
            defaultValues={userStore.defaultValues}
            model={userStore.selectedItem}
            loading={userStore.loading}
            onSave={(user) => {
                if (user.id) {
                    userStore.update(user.id, user as any, () => {
                        setIsModalVisible(false);
                        if (onSave) {
                            onSave(user);
                        }
                    });
                } else {
                    userStore.create(user as any, (user) => {
                        setIsModalVisible(false);
                        if (onSave) {
                            onSave(user);
                        }
                    });
                }
            }}
            onCancel={() => {
                setIsModalVisible(false);
                if (onCancel) {
                    onCancel();
                }
            }}
            modal={true}
            modalVisible={isModalVisible}
        />
    );
};
