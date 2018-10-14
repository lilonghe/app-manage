import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppAction } from '../../store/action';
import LoadingComponent from '../../components/help/lodding';
import pathToRegexp from 'path-to-regexp';
import styles from './info.styl';
import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link } from 'react-router-dom';

@connect(({ appDetail }) => {
    return { appDetail }
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
        const { appDetail: { info } } = this.props;
        if (!info.name) {
            return <LoadingComponent />
        }
        return (
            <div className={styles.appInfo}>
                <Avatar size={80} shape="square" src={info.icon}/>
                <div>
                    <div className={styles.appName}>{info.name}</div>
                    <div className={styles.appid}>@{info.appid}</div>
                    <div className={styles.description}>{info.description}</div>
                </div>
            </div>
        )
    }
}
