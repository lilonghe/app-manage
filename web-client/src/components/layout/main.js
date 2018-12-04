import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class main extends Component {
    render() {
        const { children } = this.props;
        let key = window.location.pathname.split('/')[1];
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">Logo </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[key]}
                        style={{ lineHeight: '64px', display: 'inline-block' }}
                    >
                        <Menu.Item key="users"><Link to={'/users'}>用户管理</Link></Menu.Item>
                        <Menu.Item key="apps"><Link to={'/apps'}>应用管理</Link></Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ background: '#fff', padding: '24px 0', margin: 0, minHeight: window.innerHeight - 120 }}>
                    {children}
                </Content>
            </Layout>
        );
    }
}
