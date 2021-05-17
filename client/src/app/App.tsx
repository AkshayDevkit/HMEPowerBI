import classNames from 'classnames';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { configure } from 'mobx';
import { Observer } from 'mobx-react-lite';
import { authStore } from '@auth';
import { UserContext } from '@components/user';
import { ScreenAuthorizedRoutes } from '@screens/screens.authorized.router';
import { ScreenUnauthorizedRoutes } from '@screens/screens.unauthorized.router';
import { Internationalization } from './../internationalization';
import { Center } from '@library/center';
import './App.scss';

configure({
    enforceActions: 'never',
});

Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: '2em' }} />);
Spin.defaultProps = {
    size: 'default',
    wrapperClassName: UserContext.theme,
} as any;

const MainContent = () => {
    return (
        <Observer>
            {() => (
                <div>
                    {authStore.loading && (
                        <Center app>
                            <Spin spinning={authStore.loading}></Spin>
                        </Center>
                    )}
                    {!authStore.loading && (
                        <div className={classNames('theme', UserContext.theme)}>
                            {UserContext.LoggedInUser ? (
                                <div>
                                    <ScreenAuthorizedRoutes
                                        user={UserContext.LoggedInUser}
                                        theme={UserContext.theme}
                                    />
                                </div>
                            ) : (
                                <ScreenUnauthorizedRoutes />
                            )}
                        </div>
                    )}
                </div>
            )}
        </Observer>
    );
};

export function App() {
    return (
        <div className="app">
            <Internationalization>
                <MainContent />
            </Internationalization>
        </div>
    );
}

// export default App;
