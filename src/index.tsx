import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {Redirect, Route, Router, Switch} from 'react-router';
import DashboardPage from './DashboardPage';
import AggregatesPage from './AggregatesPage';
import {
    aggregateDetailsPath,
    aggregatePath,
    commandsPath,
    dashboardPath, eventsPath, executeCommandPath, executeEventPath,
    executeQueryPath,
    queriesPath,
} from './routes';
import MainLayout from './layout/MainLayout';
import AggregateDetailsPage from './AggregateDetailsPage';
import SnackbarStack from './SnackbarStack';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
import QueriesPage from './QueriesPage';
import ThemeProvider from './material-ui/ThemeProvider';
import CommandsPage from './CommandsPage';
import EventsPage from './EventsPage';

const history = createHashHistory();

const Main = () => (
    <Switch>
        <Route path={dashboardPath} exact={true} component={DashboardPage} />
        <Route path={queriesPath} exact={true} component={QueriesPage} />
        <Route path={executeQueryPath} exact={true} component={QueriesPage} />
        <Route path={commandsPath} exact={true} component={CommandsPage} />
        <Route path={executeCommandPath} exact={true} component={CommandsPage} />
        <Route path={eventsPath} exact={true} component={EventsPage} />
        <Route path={executeEventPath} exact={true} component={EventsPage} />
        <Route path={aggregatePath} exact={true} component={AggregatesPage} />
        <Route path={aggregateDetailsPath} exact={true} component={AggregateDetailsPage} />
        <Redirect from={'/'} to={dashboardPath} />
    </Switch>
);

ReactDOM.render((
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
                <Router history={history}>
                    <MainLayout>
                        <Main/>
                    </MainLayout>
                </Router>
                <SnackbarStack />
            </ThemeProvider>
        </PersistGate>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
