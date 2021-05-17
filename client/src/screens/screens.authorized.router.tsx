import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeType } from '@app';
import { LoggedInUser } from '@components/user';
import { UserRouter } from './user';
import { SummaryRouter } from './summary';
import { ReportRouter } from './report';
import { SettingRouter } from './setting';

export const ScreenAuthorizedRoutes = ({
    user,
    theme,
}: {
    user: LoggedInUser;
    theme: ThemeType;
}) => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* NS - Switch Route Order is important, as keeping Home route as last, else use 'exact' */}
            <Switch>
                <Route path={ReportRouter.getBaseRoutes().root.path}>
                    <ReportRouter.Router />
                </Route>
                <Route path={UserRouter.getBaseRoutes().root.path}>
                    <UserRouter.Router />
                </Route>
                {/* <Route path={SummaryRouter.getBaseRoutes().root.path}>
                    <SummaryRouter.Router />
                </Route> */}
                <Route path={SettingRouter.getBaseRoutes().root.path}>
                    <SettingRouter.Router />
                </Route>
                <Route path="/">
                    <ReportRouter.Router />
                </Route>
            </Switch>
        </Router>
    );
};
