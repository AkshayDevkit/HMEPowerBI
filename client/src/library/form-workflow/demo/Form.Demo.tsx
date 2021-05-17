import * as yup from 'yup';
import { Observer } from 'mobx-react-lite';
import { Button, ButtonHTMLType } from '@library/button';
import { Input } from '@library/input';
import { Control, Controller, useForm as useReactHookForm, UseFormMethods } from 'react-hook-form';
import { useForm, Form, Field, Debug, toPath, useFieldArray, FieldArrayInstance } from '..';
import { FormInstance } from '../types';
import { Dropdown } from '@library/dropdown';
import { useEffect, useState } from 'react';

// Check all these three components one by one with controlled inputs
// 1. DirectFormDemo[No Form library, only Mobx]
// and FieldDemo[with Mobx integrated Form library] produces same results with 500 inputs
// and realtime and update
// [Above both renders only the input affected only once]
// 2. ReacHookFormDemo is very very slow with watching all these fields
// [renderes all of the fields again incase of watch]

export const MobxDirectFormDemo = () => {
    const fields: string[] = [];
    for (let i = 0; i < 250; i++) {
        fields.push('name' + i);
    }

    const form = useForm();
    return (
        <Observer>
            {() => (
                <form
                    name="test"
                    onSubmit={(e) => {
                        form.handleSubmit(
                            (values) => {
                                ;
                            },
                            (error) => {
                                ;
                            },
                        );
                        e.preventDefault();
                    }}
                    onReset={(event) => {
                        form.reset();
                        event.preventDefault();
                    }}
                >
                    {/* <Debug value={store.values} /> */}
                    <Debug value={form.dirtyFields} />
                    {fields.map((field) => {
                        return (
                            <MobxDirectFieldRenderer field={field} form={form} key={field} />
                        );
                    })}

                    <Button
                        onClick={() => {
                            // form.submit();
                        }}
                        htmlType={ButtonHTMLType.Submit}
                    >
                        Submit
                    </Button>
                    <Button htmlType={ButtonHTMLType.Reset}>Reset</Button>
                </form>
            )}
        </Observer>
    );
};

export const NewFieldDemo = () => {
    const fields: string[] = [];
    for (let i = 0; i < 250; i++) {
        fields.push('name' + i);
    }

    const validationSchema = yup.object().shape({
        name: yup.string().required(),
        lastname: yup.string().required(),
        metadata: yup.object().shape({
            array: yup
                .array()
                .of(
                    yup.object().shape({
                        key: yup.string().required(),
                        value: yup.string().required(),
                    }),
                )
                .min(2),
        }),
    });

    const form = useForm<any>({
        defaultValues: {
            name0: 'name0',
            name1: 'name1',
            metadata: {
                array: [
                    {
                        key: 'key1',
                        value: 'value1',
                    },
                    {
                        key: 'key2',
                        value: 'value2',
                    },
                ],
            },
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
        onSubmitError: (errors) => {
            alert(JSON.stringify(errors, null, 2));
        },
        onReset: () => {
            ;
        },
        debug: true,
        validationSchema: validationSchema,
    });

    const arrayFieldName = 'metadata.array';

    const fieldArray = useFieldArray({
        name: arrayFieldName,
        formInstance: form,
    });

    return (
        <Observer>
            {() => (
                <Form instance={form}>
                    {/* <Debug value={form.dirtyFields} /> */}
                    {/* <Debug value={form.values}></Debug> */}
                    {/* <Debug value={form.values}></Debug> */}
                    {/* <Debug value={fieldArray.values}></Debug> */}
                    <Field name={'name'}>
                        <Input />
                    </Field>
                    <Field name={'lastname'}>
                        <Input />
                    </Field>

                    <Button
                        onClick={() => {
                            fieldArray.prepend({
                                key: 'prepend-key',
                                value: '',
                            });
                        }}
                    >
                        Prepend
                    </Button>
                    <Button
                        onClick={() => {
                            fieldArray.append({
                                key: 'append-key',
                                value: '',
                            });
                        }}
                    >
                        Add
                    </Button>
                    <Button
                        onClick={() => {
                            fieldArray.insert(1, {
                                key: 'index-1-key',
                                value: '',
                            });
                        }}
                    >
                        Add at Index 1
                    </Button>
                    {fieldArray.values.map((value, index) => {
                        return (
                            <FieldArrayRenderer
                                key={`${arrayFieldName}[${index}]`}
                                arrayFieldName={arrayFieldName}
                                index={index}
                                fieldArray={fieldArray}
                            />
                        );
                    })}

                    <Button htmlType={ButtonHTMLType.Submit}>Form Submit</Button>
                    <Button
                        onClick={() => {
                            form.handleSubmit(
                                (values) => {
                                    alert(JSON.stringify(values, null, 2));
                                },
                                (errors) => {
                                    alert(JSON.stringify(errors, null, 2));
                                },
                            );
                        }}
                    >
                        Manual Submit
                    </Button>
                    <Button htmlType={ButtonHTMLType.Reset}>Form Reset</Button>
                    <Button
                        onClick={() => {
                            form.reset();
                        }}
                    >
                        Manual Reset
                    </Button>

                    {/* {fields.map((field) => {
                        return (
                            <div key={field}>
                                <Field name={field}>
                                    <Input />
                                </Field>
                                <Field name={field + '-d'}>
                                    <Dropdown data={['one', 'two']} />
                                </Field>
                            </div>
                        );
                    })} */}
                </Form>
            )}
        </Observer>
    );
};

export const ReacHookFormDemo = () => {
    const fields: string[] = [];
    for (let i = 0; i < 250; i++) {
        fields.push('name' + i);
    }

    const form = useReactHookForm({
        defaultValues: {
            name0: 'name0',
            name1: 'name1',
        },
    });

    return (
        <Observer>
            {() => (
                <form
                    name="test"
                    onSubmit={form.handleSubmit(
                        (values) => {
                            ;
                        },
                        (error) => {
                            ;
                        },
                    )}
                >
                    <Debug value={form.getValues()}></Debug>
                    {fields.map((field) => {
                        return (
                            <ReactHookFieldRenderer
                                field={field}
                                form={form}
                                key={field}
                                control={form.control}
                            />
                        );
                    })}

                    <Button htmlType={ButtonHTMLType.Submit}>Submit</Button>
                </form>
            )}
        </Observer>
    );
};

const MobxDirectFieldRenderer = ({ field, form }: { field: string; form: FormInstance<any> }) => {
    return (
        <Observer>
            {() => (
                <span key={field}>
                    {console.log('Debug Rendered' + field)}
                    <Input
                        name={field}
                        value={form.values[field]}
                        onChange={(event) => {
                            form.setValue(field, event.target.value);
                        }}
                        onBlur={(event) => {
                            form.setValue(field, event.target.value);
                        }}
                        key={field}
                    />
                    <Dropdown
                        data={['one', 'two']}
                        name={field + '-d'}
                        value={form.values[field + '-d']}
                        onChange={(event) => {
                            form.setValue(field + '-d', (event.target as any).value);
                        }}
                        onBlur={(event) => {
                            form.setValue(field + '-d', (event.target as any).value);
                        }}
                        key={field + '-d'}
                    />
                </span>
            )}
        </Observer>
    );
};

const ReactHookFieldRenderer = ({
    field,
    form,
    control,
}: {
    field: string;
    form: UseFormMethods<any>;
    control: Control<any>;
}) => {
    const [value, setValue] = useState(undefined);

    form.register(field);
    form.register(field + '-d');

    form.watch(field);
    form.watch(field + '-d');

    useEffect(() => {
        setValue(form.getValues(field));
    }, [form.getValues(field)]);
    return (
        <Observer>
            {() => (
                <span key={field}>
                    {console.log('Debug Rendered' + field)}
                    <Controller
                        name={field}
                        control={control}
                        render={(
                            { onChange, onBlur, value, name, ref },
                            { invalid, isTouched, isDirty },
                        ) => {
                            return (
                                <Input
                                    name={name}
                                    value={value}
                                    onChange={(event) => {
                                        onChange(event);
                                    }}
                                    onBlur={onBlur}
                                    key={name}
                                />
                            );
                        }}
                    />
                    <Controller
                        name={field + '-d'}
                        control={control}
                        render={(
                            { onChange, onBlur, value, name, ref },
                            { invalid, isTouched, isDirty },
                        ) => {
                            return (
                                <Dropdown
                                    data={['one', 'two']}
                                    name={name}
                                    value={value}
                                    onChange={(event) => {
                                        onChange(event);
                                    }}
                                    onBlur={onBlur}
                                    key={name}
                                />
                            );
                        }}
                    />
                </span>
            )}
        </Observer>
    );
};

const FieldArrayRenderer = ({
    arrayFieldName,
    index,
    fieldArray,
}: {
    arrayFieldName: string;
    index: number;
    fieldArray: FieldArrayInstance<any>;
}) => {
    const name = arrayFieldName + index;
    return (
        <div key={name} style={{ margin: '1em' }}>
            <div>
                {console.log('FieldArrayRenderer ' + name)}
                <Field name={`${arrayFieldName}[${index}].key`}>
                    <Input />
                </Field>
                <Field name={toPath(arrayFieldName, index, 'value')}>
                    <Input />
                </Field>
                <Button
                    onClick={() => {
                        fieldArray.remove(index);
                    }}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};
