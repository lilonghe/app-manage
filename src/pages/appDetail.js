import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAppAction } from '../store/action';
import LoadingComponent from '../components/help/lodding';
import pathToRegexp from 'path-to-regexp';
import styles from './appDetail.styl';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link, Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import InfoPage from './app/info';
import PermissionPage from './app/permission';
import RolePage from './app/role';

@connect(({ apps: { targetApp } }) => {
    return { targetApp }
}, {
    fetchAppAction
})
export default class appDetail extends Component {

    state = {
        path: ''
    }

    loadApp = (newPath) => {
        const reg = pathToRegexp('/apps/:appId/(.*)');
        const match = reg.exec(newPath || window.location.pathname);
        this.appid = match[1];
        console.log(match[2]);
        this.setState({
            path: match[2]
        });
        this.props.fetchAppAction(this.appid);
    }

    onSelectMenu = (params) => {
        this.setState({
            path: params.key
        })
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
        const { path } = this.state;
        if (!targetApp.name) {
            return <LoadingComponent />
        }
        return (
            <Router>
                <div className={styles.appDetailWapper} style={{minHeight: window.innerHeight - 120}}>
                    <Layout style={{backgroundColor: '#FFF'}}>
                        <Sider width={180} style={{ background: '#fff', borderRight: '1px solid #DDD' }}>
                            <div className={styles.appInfo}>
                                <img src={targetApp.icon} />
                                <div>
                                    <p className={styles.appName}>{targetApp.name}</p>
                                </div>
                            </div>
                            <Menu
                                mode="inline"
                                selectedKeys={[path]}
                                onSelect={this.onSelectMenu}
                                style={{ borderRight: 0 }}
                            >
                                <Menu.Item key={'info'}><Link to={`/apps/${targetApp.appid}/info`}>应用信息</Link></Menu.Item>
                                <Menu.Item key={'permissions'}><Link to={`/apps/${targetApp.appid}/permissions`}>权限管理</Link></Menu.Item>
                                <Menu.Item key={'roles'}><Link to={`/apps/${targetApp.appid}/roles`}>角色管理</Link></Menu.Item>
                                <Menu.Item key={'menus'}><Link to={`/apps/${targetApp.appid}/menus`}>菜单管理</Link></Menu.Item>
                            </Menu>
                        </Sider>
                        <Content style={{marginLeft: 20, paddingTop: 20}}>
                            <Route exact path={'/apps/:appId/info'} component={InfoPage} />
                            <Route path='/apps/:appId/permissions' component={PermissionPage}/>
                            <Route path='/apps/:appId/roles' component={RolePage}/>
                        </Content>
                    </Layout>
                </div>
            </Router>
        )
    }
}
