import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Input } from '@library/input';
import { Section, SectionLayoutType } from '@library/section';
import { NumberInput } from '@library/number-input';
import { Field, FormInstance } from '@library/form-workflow';
import { Checkbox } from '@library/checkbox';
import { Label, LabelPosition } from '@library/label';
import {
    PropertySchema,
    PropertyType,
    PropertyView,
    ValidationType,
} from '@library/dynamic-schema';
import { toWord } from '@library/util/text-helper';
import { Card } from '@library/card';
import { observe } from 'mobx';

export const SchemaField = ({
    name,
    fieldSchema,
    form,
}: {
    name: string;
    fieldSchema: PropertySchema;
    form: FormInstance<any>;
}) => {
    let component: ReactNode = null;
    const [required, setRequired] = useState<boolean>(false);

    switch (fieldSchema.type) {
        case PropertyType.Text:
            component = <Input></Input>;
            break;
        case PropertyType.Number:
            component = <NumberInput></NumberInput>;
            break;
        case PropertyType.Boolean:
            component = <Checkbox label={fieldSchema.label || ''}></Checkbox>;
            break;
    }

    useEffect(() => {
        fieldSchema.validations = fieldSchema.validations || [];
        const requiredValidation = fieldSchema.validations.find(
            (x) => x.type === ValidationType.Required,
        )
            ? true
            : false;
        if (!requiredValidation) {
        }
        setRequired(requiredValidation);
    }, [fieldSchema]);

    useEffect(() => {
        fieldSchema.validations = fieldSchema.validations || [];
        const requiredValidation = fieldSchema.validations.find(
            (x) => x.type === ValidationType.Required,
        );
        if (requiredValidation) {
            fieldSchema.validations.splice(fieldSchema.validations.indexOf(requiredValidation), 1);
        }
        if (required) {
            fieldSchema.validations.push({
                ...requiredValidation,
                type: ValidationType.Required,
            });
        }
        form.setValue(`${name}.validations`, fieldSchema.validations);
    }, [required]);

    return (
        <div className="setting-field schema">
            <div>
                <Label title={toWord(fieldSchema.name || '')}></Label>
            </div>
            <Section layout={SectionLayoutType.Horizontal}>
                <Field name={`${name}.label`} label="Title" className={LabelPosition.Inline}>
                    <Input />
                </Field>
                <Checkbox
                    label="Required"
                    value={required}
                    onChange={(event) => {
                        setRequired(event.target.checked);
                    }}
                ></Checkbox>
            </Section>
        </div>
    );
};

export const ViewField = ({
    name,
    fieldView,
    editLabel,
}: {
    name: string;
    fieldView: PropertyView;
    editLabel?: boolean;
}) => {
    return (
        <div className="setting-field view">
            <div>
                <Label title={toWord(fieldView.name || '')}></Label>
            </div>
            <Section layout={SectionLayoutType.Horizontal}>
                {editLabel && (
                    <Field name={`${name}.label`} label="Title" className={LabelPosition.Inline}>
                        <Input />
                    </Field>
                )}
                <Field name={`${name}.enable`}>
                    <Checkbox label="Visible"></Checkbox>
                </Field>
            </Section>
        </div>
    );
};
