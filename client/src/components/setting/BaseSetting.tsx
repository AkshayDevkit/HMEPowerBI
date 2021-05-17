import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Setting } from '@library/dynamic-schema';
import { Section } from '@library/section';
import { Debug, FormInstance } from '@library/form-workflow';
import { BaseForm } from '@components/base/components';
import './setting.scss';
import { RenderChildrenAsFunctionChild } from '@library/util/component';

export const BaseSetting: FC<{
    title: string;
    defaultValues: Setting;
    validationSchema: any;
    model: Setting | null;
    loading: boolean;
    onSave: (values: Setting) => void;
    onCancel: () => void;
}> = ({ title, defaultValues, validationSchema, model, loading, onSave, onCancel, children }) => {
    const history = useHistory();
    return (
        <BaseForm
            title={title + ' Settings'}
            defaultValues={defaultValues}
            model={model}
            loading={loading}
            onSave={(values) => {
                if (onSave) {
                    onSave(values as any);
                }
            }}
            onCancel={() => {
                if (onCancel) {
                    onCancel();
                }
            }}
            validationSchema={validationSchema}
            className="setting"
            autoHeightMax="calc(100vh + 60em)"
        >
            {({ form }: { form: FormInstance<any> }) => {
                return (
                    <Section style={{ padding: '0 1em' }}>
                        {/* <Debug value={form.values}></Debug> */}
                        {RenderChildrenAsFunctionChild(children, {
                            form,
                        })}
                    </Section>
                );
            }}
        </BaseForm>
    );
};
