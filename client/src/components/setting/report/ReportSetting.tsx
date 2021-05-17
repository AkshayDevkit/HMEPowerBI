import { FC } from 'react';
import { Yup } from '@library/yup/yup-extended';
import { Debug, FormInstance } from '@library/form-workflow';
import { toPropertySchemaArray, toPropertyViewArray } from '@library/dynamic-schema';
import { BaseSetting } from '../BaseSetting';
import { SchemaField, ViewField } from '../SettingFields';
import { SettingSection } from '../SettingSection';
import { DefaultSettings } from '../default.values';
import { ReportSetting } from '../types';
import { Observer } from 'mobx-react-lite';

const validationSchema = Yup.object().shape({});

export const ReportSettingEdit: FC<{
    defaultValues: any;
    model: ReportSetting | null;
    loading: boolean;
    onSave: (values: ReportSetting) => void;
    onCancel: () => void;
}> = ({ model, loading, onSave, onCancel }) => {
    return (
        <Observer>
            {() => (
                <BaseSetting
                    title="Report"
                    defaultValues={DefaultSettings.report}
                    validationSchema={validationSchema}
                    model={model}
                    loading={loading}
                    onSave={onSave as any}
                    onCancel={onCancel}
                >
                    {({ form }: { form: FormInstance<any> }) => {
                        return (
                            <Observer>
                                {() =>
                                    (form.values as any).schema && (
                                        <div>
                                            <Debug value={form.values}></Debug>
                                            <SettingSection title="Schema">
                                                {toPropertySchemaArray(
                                                    (form.values as any).schema.properties,
                                                ).map((x) => {
                                                    return (
                                                        <SchemaField
                                                            name={`schema.properties.${x.name}`}
                                                            key={x.name}
                                                            fieldSchema={x}
                                                            form={form}
                                                        />
                                                    );
                                                })}
                                            </SettingSection>
                                            <SettingSection title="Form">
                                                {toPropertyViewArray(
                                                    (form.values as any).views.edit.properties,
                                                ).map((value) => {
                                                    return (
                                                        <ViewField
                                                            name={`views.edit.properties.${value.name}`}
                                                            key={value.name}
                                                            fieldView={value}
                                                        />
                                                    );
                                                })}
                                            </SettingSection>
                                            <SettingSection title="Table">
                                                {toPropertyViewArray(
                                                    (form.values as any).views.list.properties,
                                                ).map((value) => {
                                                    return (
                                                        <ViewField
                                                            name={`views.list.properties.${value.name}`}
                                                            key={value.name}
                                                            fieldView={value}
                                                        />
                                                    );
                                                })}
                                            </SettingSection>
                                        </div>
                                    )
                                }
                            </Observer>
                        );
                    }}
                </BaseSetting>
            )}
        </Observer>
    );
};
