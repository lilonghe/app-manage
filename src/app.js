import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/index';
import AppDetailPage from './pages/appDetail';
import MainLayout from './components/layout/main';

export default class App extends Component {

    render() {
        return (
            <Router>
                <MainLayout>
                    <Switch>
                        <Route exact path='/' component={IndexPage} />
                        <Route path='/apps/:appId' component={AppDetailPage} />
                    </Switch>
                </MainLayout>
            </Router>
        );
    }
}
