import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes, BaseRoute } from '@screens/base';
import {
    ReportsScreen,
    ReportEdit,
} from '.';

interface ReportRoutes extends Routes {}

class ReportRouter extends BaseRouter<ReportRoutes> {
    baseRouteName = 'report';
    customRoutes: { [key: string]: BaseRoute } | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <ReportEdit />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <ReportEdit />
                </Route>
                <Route path={url}>
                    <ReportsScreen />
                </Route>
            </Switch>
        );
    };
}

const reportRouter = new ReportRouter();

export { reportRouter as ReportRouter };
