import { useEffect, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faEraser, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ScrollBar } from '@library/scrollbar';
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
import { Button, ButtonType } from '@library/button';
import { IModel } from '../models';

export interface IBaseSearch {
    defaultValues: any;
    criteria: any;
    loading: boolean;
    onSearch: (values: IModel) => void;
    onReset: () => void;
    onHide: () => void;
    validationSchema: any;
    children?: ReactNode;
}

export const BaseSearch = ({
    defaultValues,
    criteria,
    loading,
    onSearch,
    onReset,
    onHide,
    validationSchema,
    children,
}: IBaseSearch) => {
    const form = useForm({
        defaultValues: defaultValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (onSearch) {
                onSearch(values as any);
            }
        },
        onReset: () => {
            if (onReset) {
                onReset();
            }
        },
    });

    useEffect(() => {
        form.setValues(criteria);
    }, [criteria]);

    return (
        <Form instance={form}>
            <Section theme={SectionTheme.White}>
                <SectionHeader>
                    <Section align={SectionAlignment.Left}>
                        <SectionHeaderTitle
                            startIcon={<FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>}
                        >
                            Filter
                        </SectionHeaderTitle>
                    </Section>
                    <Section
                        layout={SectionLayoutType.Horizontal}
                        align={SectionAlignment.Right}
                        autoSpacing={true}
                    >
                        <FontAwesomeIcon
                            icon={faArrowCircleLeft}
                            className="icon"
                            size="lg"
                            onClick={onHide}
                            style={{ cursor: 'pointer' }}
                        ></FontAwesomeIcon>
                    </Section>
                </SectionHeader>
                <Spin spinning={loading}>
                    <SectionBody padding>
                        <ScrollBar autoHeightMax={'calc(100vh - 19.5em)'}>{children}</ScrollBar>
                    </SectionBody>
                    <SectionFooter>
                        <Section
                            layout={SectionLayoutType.Horizontal}
                            align={SectionAlignment.Center}
                            autoSpacing={true}
                        >
                            <Section>
                                <Button
                                    startIcon={<FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>}
                                    type={ButtonType.Primary}
                                    onClick={() => {
                                        form.submit();
                                    }}
                                >
                                    Filter
                                </Button>
                            </Section>
                            <Section>
                                <Button
                                    startIcon={<FontAwesomeIcon icon={faEraser}></FontAwesomeIcon>}
                                    type={ButtonType.Secondary}
                                    onClick={() => {
                                        form.reset();
                                    }}
                                >
                                    Reset
                                </Button>
                            </Section>
                        </Section>
                    </SectionFooter>
                </Spin>
            </Section>
        </Form>
    );
};
