import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {Link} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class main extends Component {
    render() {
        const { children } = this.props;
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['apps']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="apps"><Link to={'/'}>应用管理</Link></Menu.Item>
                    </Menu>
                </Header>
                {/*<Layout>*/}
                    {/*<Sider width={200} style={{ background: '#fff' }}>*/}
                        {/*<Menu*/}
                            {/*mode="inline"*/}
                            {/*defaultSelectedKeys={['apps']}*/}
                            {/*style={{ height: '100%', borderRight: 0 }}*/}
                        {/*>*/}
                            {/*<Menu.Item key={'apps'}><Link to={'/'}>应用列表</Link></Menu.Item>*/}
                        {/*</Menu>*/}
                    {/*</Sider>*/}
                    {/*<Layout style={{ padding: '0 24px 24px' }}>*/}
                        <Content style={{ background: '#fff', padding: '24px 0', margin: 0, minHeight: window.innerHeight - 120 }}>
                            {children}
                        </Content>
                    {/*</Layout>*/}
                {/*</Layout>*/}
            </Layout>
        );
    }
}
