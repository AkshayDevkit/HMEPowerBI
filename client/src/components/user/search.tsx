import { Yup } from '@library/yup';
import { Section } from '@library/section';
import { Field } from '@library/form-workflow';
import { Input } from '@library/input';
import { BaseSearch } from '@components/base/components';

const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
});

export const UserSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
    onHide,
}: {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: any) => void;
    onReset: () => void;
    onHide: () => void;
}) => {
    return (
        <BaseSearch
            defaultValues={defaultValues}
            criteria={criteria}
            loading={loading}
            onSearch={onSearch}
            onReset={onReset}
            validationSchema={validationSchema}
            onHide={onHide}
        >
            <Section>
                <Field name="userId" label="User Id">
                    <Input />
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
            </Section>
        </BaseSearch>
    );
};
