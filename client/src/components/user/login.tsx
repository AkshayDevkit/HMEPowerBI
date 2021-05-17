import { useHistory } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { Yup } from '@library/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faUser } from '@fortawesome/free-solid-svg-icons';
import { ScrollBar } from '@library/scrollbar';
import { Logo, LogoSize } from '@screens/layout';
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
import { MsLoginButton } from '@library/button/MsLoginButton';
import { Input, InputType } from '@library/input';
import { LabelPosition } from '@library/label';
import { User } from './types';
import { Center } from '@library/center';
import { AppContext } from '@app';
import { authStore, AuthType } from '@auth';
import { AuthRouter } from '@screens/auth';
import './style.scss';

const validationSchema = Yup.object().shape({
    userId: Yup.string().nullable().required('User Id is required'),
    password: Yup.string().nullable().required('Password is required'),
});

export const UserLogin = () => {
    const history = useHistory();
    const form = useForm({
        defaultValues: {},
        validationSchema: validationSchema,
        onSubmit: (user: any) => {
            authStore.logIn(user as User);
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
                            <Section
                                style={{
                                    marginLeft: '-15em',
                                    marginTop: '-15em',
                                }}
                            >
                                <Logo src="/nitor_logo.png" size={LogoSize.Large}></Logo>
                            </Section>
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
                                                Login
                                            </SectionHeaderTitle>
                                        </Section>
                                        <Section align={SectionAlignment.Right}>
                                            <Button
                                                type={ButtonType.Quaternary}
                                                onClick={() => {
                                                    history.push(
                                                        AuthRouter.getRoutes().register.path,
                                                    );
                                                }}
                                            >
                                                Register New User?
                                            </Button>
                                        </Section>
                                    </SectionHeader>
                                    <Spin spinning={authStore.loading}>
                                        <SectionBody padding>
                                            <ScrollBar
                                                autoHeight
                                                autoHeightMax={'calc(100vh - 45em)'}
                                            >
                                                <Section layout={SectionLayoutType.Vertical}>
                                                    <Field
                                                        name="userId"
                                                        label="UserId"
                                                        className={LabelPosition.Inline}
                                                    >
                                                        <Input />
                                                    </Field>
                                                    <Field
                                                        name="password"
                                                        label="Password"
                                                        className={LabelPosition.Inline}
                                                    >
                                                        <Input type={InputType.Password} />
                                                    </Field>
                                                </Section>
                                            </ScrollBar>
                                        </SectionBody>
                                    </Spin>
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
                                                            icon={faUser}
                                                        ></FontAwesomeIcon>
                                                    }
                                                    loading={authStore.loading}
                                                    type={ButtonType.Primary}
                                                    htmlType={ButtonHTMLType.Submit}
                                                >
                                                    LogIn
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
                                                    htmlType={ButtonHTMLType.Reset}
                                                >
                                                    Reset
                                                </Button>
                                            </Section>
                                        </Section>
                                        <Section style={{ marginTop: 10 }}>
                                            <MsLoginButton
                                                onClick={() => {
                                                    authStore.logIn();
                                                }}
                                            />
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
