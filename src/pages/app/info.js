import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppAction } from '../../store/action';
import LoadingComponent from '../../components/help/lodding';
import pathToRegexp from 'path-to-regexp';
import styles from './info.styl';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router-dom';

@connect(({ apps: { targetApp } }) => {
    return { targetApp }
}, {
    fetchAppAction
})
export default class appDetail extends Component {

    loadApp = (newPath) => {
        const reg = pathToRegexp('/apps/:appId/(.*)');
        const match = reg.exec(newPath || window.location.pathname);
        this.appid = match[1];
        this.props.fetchAppAction(this.appid);
    }

    componentDidMount() {
        this.loadApp();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pathname != this.props.pathname) {
            this.loadApp(nextProps.pathname);
        }
    }

    render() {
        const { targetApp } = this.props;
        if (!targetApp.name) {
            return <LoadingComponent />
        }
        return (
            <div className={styles.appInfo}>
                <img src={targetApp.icon} />
                <div>
                    <p className={styles.appName}>{targetApp.name}</p>
                    <div className={styles.description}>{targetApp.description}</div>
                </div>
            </div>
        )
    }
}
