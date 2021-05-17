import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { BaseRouter, Routes, BaseRoute } from '@screens/base';
import { SettingsScreen } from './settings';
import { ReportSettingsScreen } from './reports';
import { ReportSettingEditScreen } from './report-setting-edit';

interface SettingRoutes extends Routes {}

class ReportSettingRouter extends BaseRouter<SettingRoutes> {
    baseRouteName = 'settings/report';
    customRoutes: { [key: string]: BaseRoute } | null = null;

    Router = ({ routes }: any) => {
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={this.getBaseRoutes().new.path}>
                    <ReportSettingEditScreen />
                </Route>
                <Route path={this.getBaseRoutes().edit.path}>
                    <ReportSettingEditScreen />
                </Route>
                <Route path={url}>
                    <ReportSettingsScreen />
                </Route>
            </Switch>
        );
    };
}

const reportSettingRouter = new ReportSettingRouter();

export { reportSettingRouter as ReportSettingRouter };

class SettingRouter extends BaseRouter<SettingRoutes> {
    baseRouteName = 'settings';
    customRoutes: { [key: string]: BaseRoute } | null = null;

    Router = ({ routes }: any) => {
        let { url } = useRouteMatch();
        return (
            <Switch>
                <Route path={reportSettingRouter.getBaseRoutes().root.path}>
                    <reportSettingRouter.Router />
                </Route>
                <Route path={url}>
                    <SettingsScreen />
                </Route>
            </Switch>
        );
    };
}

const settingRouter = new SettingRouter();

export { settingRouter as SettingRouter };
