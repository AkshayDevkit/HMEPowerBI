import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { Yup } from '@library/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faUser } from '@fortawesome/free-solid-svg-icons';
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
import { Form, useForm, Field, FormInstance } from '@library/form-workflow';
import { Spin } from '@library/spin';
import { Button, ButtonHTMLType, ButtonType } from '@library/button';
import { Input, InputType } from '@library/input';
import { User } from './types';
import { Center } from '@library/center';
import { AppContext } from '@app';
import { authStore, AuthType } from '@auth';
import { AuthRouter } from '@screens/auth';
import { LabelPosition } from '@library/label';
import './style.scss';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().nullable().required('First Name is required'),
    email: Yup.string().nullable().required('Email is required'),
    userId: Yup.string().nullable().required('User Id is required'),
    contact1: Yup.string().nullable().required('User Id is required'),
});

export const UserRegister = () => {
    const history = useHistory();
    const form = useForm({
        defaultValues: {},
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            authStore.register(values as User);
        },
        onReset: () => {},
    });

    return (
        <Observer>
            {() => (
                <div className="user-register">
                    {/* <Logo size={LogoSize.ExtraLarge} /> */}
                    {AppContext.authType == AuthType.Azure ? (
                        <Center app>
                            <Spin spinning={true}></Spin>
                            <h2>Loading...</h2>
                        </Center>
                    ) : (
                        <Center height={'100%'}>
                            <Form instance={form}>
                                <Section theme={SectionTheme.White}>
                                    <SectionHeader>
                                        <Section align={SectionAlignment.Left}>
                                            <SectionHeaderTitle
                                                startIcon={
                                                    <FontAwesomeIcon
                                                        icon={faUser}
                                                    ></FontAwesomeIcon>
                                                }
                                            >
                                                Register
                                            </SectionHeaderTitle>
                                        </Section>
                                        <Section align={SectionAlignment.Right}>
                                            <Button
                                                type={ButtonType.Quaternary}
                                                onClick={() => {
                                                    history.push(
                                                        AuthRouter.getRoutes()
                                                            .login.path,
                                                    );
                                                }}
                                            >
                                                Log In
                                            </Button>
                                        </Section>
                                    </SectionHeader>
                                    <Spin spinning={authStore.loading}>
                                        <SectionBody padding>
                                            <ScrollBar
                                                autoHeight
                                                autoHeightMax={
                                                    'calc(100vh - 25em)'
                                                }
                                            >
                                                <Section
                                                    layout={
                                                        SectionLayoutType.Vertical
                                                    }
                                                >
                                                    <Field
                                                        name="userId"
                                                        label="UserId"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input />
                                                    </Field>
                                                    <Field
                                                        name="firstName"
                                                        label="First Name"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input />
                                                    </Field>
                                                    <Field
                                                        name="lastName"
                                                        label="Last Name"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input />
                                                    </Field>
                                                    <Field
                                                        name="email"
                                                        label="Email"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input
                                                            type={
                                                                InputType.Email
                                                            }
                                                        />
                                                    </Field>
                                                    <Field
                                                        name="contact1"
                                                        label="Contact1"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input />
                                                    </Field>
                                                    <Field
                                                        name="password"
                                                        label="Password"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input
                                                            type={
                                                                InputType.Password
                                                            }
                                                        />
                                                    </Field>
                                                    <Field
                                                        name="confirmPassword"
                                                        label="Confirm Password"
                                                        className={
                                                            LabelPosition.Inline
                                                        }
                                                    >
                                                        <Input
                                                            type={
                                                                InputType.Password
                                                            }
                                                        />
                                                    </Field>
                                                </Section>
                                            </ScrollBar>
                                        </SectionBody>
                                    </Spin>
                                    <SectionFooter>
                                        <Section
                                            layout={
                                                SectionLayoutType.Horizontal
                                            }
                                            align={SectionAlignment.Center}
                                            autoSpacing={true}
                                        >
                                            <Section>
                                                <Button
                                                    startIcon={
                                                        <FontAwesomeIcon
                                                            icon={faUser}
                                                        ></FontAwesomeIcon>
                                                    }
                                                    loading={authStore.loading}
                                                    type={ButtonType.Primary}
                                                    htmlType={ButtonHTMLType.Submit}
                                                >
                                                    Register
                                                </Button>
                                            </Section>
                                            <Section>
                                                <Button
                                                    startIcon={
                                                        <FontAwesomeIcon
                                                            icon={faEraser}
                                                        ></FontAwesomeIcon>
                                                    }
                                                    type={ButtonType.Secondary}
                                                    htmlType={ButtonHTMLType.Submit}
                                                >
                                                    Reset
                                                </Button>
                                            </Section>
                                        </Section>
                                    </SectionFooter>
                                </Section>
                            </Form>
                        </Center>
                    )}
                </div>
            )}
        </Observer>
    );
};
