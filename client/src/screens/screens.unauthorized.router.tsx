import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthRouter } from './auth';

export const ScreenUnauthorizedRoutes = () => {
    return (
        <Router>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* NS - Switch Route Order is important, as keeping Home route as last, else use 'exact' */}
            <Switch>
                <Route path="/">
                    <AuthRouter.Router />
                </Route>
            </Switch>
        </Router>
    );
};
