import React, {Component} from 'react';
import { Tabs, Table } from 'antd';
import { getAppLogs, getUserLogs} from '../services/api';
import { turnLogsActionToView } from '../utils/tools';

const TabPanel = Tabs.TabPane;
const Column = Table.Column;

export default class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appLogs: [],
            userLogs: []
        }
    }

    componentDidMount() {
        this.loadAppLogs();
        this.loadUserLogs();
    }

    async loadAppLogs() {
        const {err, data} = await getAppLogs();
        if (!err) {
            this.setState({
                appLogs: data
            })
        }
    }

    async loadUserLogs() {
        const {err, data} = await getUserLogs();
        if (!err) {
            this.setState({
                userLogs: data
            })
        }
    }

    render() {
        const { appLogs, userLogs } = this.state;
        return (
            <div>
                <Tabs defaultActiveKey="app">
                    <TabPanel key="app" tab="应用变更日志">
                        <Table dataSource={appLogs} pagination={false}>
                            <Column dataIndex="id"/>
                            <Column title="应用" dataIndex="name"/>
                            <Column title="动作" dataIndex="action" render={t => turnLogsActionToView(t)}/>
                            <Column title="动作类型" dataIndex="action_type" render={t => turnLogsActionToView(t)}/>
                            <Column title="描述" dataIndex="after" />
                            <Column title="操作时间" dataIndex="created_at"/>
                        </Table>
                    </TabPanel>
                    <TabPanel key="user" tab="用户变更日志">
                        <Table dataSource={userLogs} pagination={false}>
                            <Column dataIndex="id"/>
                            <Column title="用户标识" dataIndex="userid"/>
                            <Column title="用户名" dataIndex="name"/>
                            <Column title="用户部门" dataIndex="dept_name"/>
                            <Column title="动作" dataIndex="action" render={t => turnLogsActionToView(t)}/>
                            <Column title="动作类型" dataIndex="action_type" render={t => turnLogsActionToView(t)}/>
                            <Column title="应用" dataIndex="app_name" />
                            <Column title="描述" dataIndex="after" />
                            <Column title="操作时间" dataIndex="created_at"/>
                        </Table>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}