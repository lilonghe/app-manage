import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppsPage from './pages/apps';
import AppDetailPage from './pages/appDetail';
import MainLayout from './components/layout/main';
import UsersPage from './pages/users';


export default class App extends Component {

    render() {
        return (
            <Router>
                <MainLayout key={window.location.href}>
                    <Switch>
                        <Redirect exact path="/" to="/users"/>
                        <Route exact path='/users' component={UsersPage} />
                        <Route exact path='/apps' component={AppsPage} />
                        <Route path='/apps/:appId' component={AppDetailPage} />
                    </Switch>
                </MainLayout>
            </Router>
        );
    }
}
