import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes, BaseRoute } from '@screens/base';
import { SummaryScreen } from '@screens/summary';

interface SummaryRoutes extends Routes {}

class SummaryRouter extends BaseRouter<SummaryRoutes> {
    baseRouteName = 'summary';
    customRoutes: { [key: string]: BaseRoute } | null = null;

    Router = ({ routes }: any) => {
        // The `path` lets us build <Route> paths that are
        // relative to the parent route, while the `url` lets
        // us build relative links.
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={url}>
                    <SummaryScreen />
                </Route>
            </Switch>
        );
    };
}

const summaryRouter = new SummaryRouter();

export { summaryRouter as SummaryRouter };
