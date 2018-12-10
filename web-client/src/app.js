import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppsPage from './pages/apps';
import AppDetailPage from './pages/appDetail';
import MainLayout from './components/layout/main';
import UsersPage from './pages/users';
import LogsPage from './pages/logs';
import { notification  } from 'antd';

global.actionTip = {
    success: (msg) => {
        notification.success({
            message: '操作成功',
            description: msg,
            placement: 'bottomRight',
            duration: 1.5
        });
    },
    fail: (msg) => {
        notification.error({
            message: '操作失败',
            description: msg,
            placement: 'bottomRight',
            duration: 10
        });
    }
}


export default class App extends Component {

    render() {
        return (
            <Router>
                <MainLayout key={window.location.href}>
                    <Switch>
                        <Redirect exact path="/" to="/users"/>
                        <Route exact path='/users' component={UsersPage} />
                        <Route exact path='/apps' component={AppsPage} />
                        <Route exact path='/logs' component={LogsPage} />
                        <Route path='/apps/:appId' component={AppDetailPage} />
                    </Switch>
                </MainLayout>
            </Router>
        );
    }
}
