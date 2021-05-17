import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes, BaseRoute } from '@screens/base';
import { UserLogin, UserRegister } from '@components/user';

interface AuthRoutes extends Routes {
    login: BaseRoute;
    register: BaseRoute;
}

class AuthRouter extends BaseRouter<AuthRoutes> {
    baseRouteName = 'auth';
    customRoutes: { [key: string]: BaseRoute } | null = {
        register: {
            path: `/${this.baseRouteName}/register`,
            redirect: (args: any) => '',
        },
        login: {
            path: `/${this.baseRouteName}/login`,
            redirect: (args: any) => '',
        },
    };

    Router = ({ routes }: any) => {
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getRoutes().register.path}>
                    <UserRegister />
                </Route>
                <Route path={this.getRoutes().login.path}>
                    <UserLogin />
                </Route>
                <Route path={url}>
                    <UserLogin />
                </Route>
            </Switch>
        );
    };
}

const authRouter = new AuthRouter();

export { authRouter as AuthRouter };
