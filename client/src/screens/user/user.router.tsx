import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes, BaseRoute } from '@screens/base';
import { UsersScreen, UserEdit } from '.';

interface UserRoutes extends Routes {}

class UserRouter extends BaseRouter<UserRoutes> {
    baseRouteName = 'user';
    customRoutes: { [key: string]: BaseRoute } | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <UserEdit />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <UserEdit />
                </Route>
                <Route path={url}>
                    <UsersScreen />
                </Route>
            </Switch>
        );
    };
}

const userRouter = new UserRouter();

export { userRouter as UserRouter };
