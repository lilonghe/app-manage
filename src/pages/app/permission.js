import React, { Component } from 'react';
import { Table, Col, Tabs, Switch, Icon, message, Button } from 'antd';
const { Column } = Table.Column;
const TabPane = Tabs.TabPane;
import PermissionForm from '../../components/app/permission/permissionForm';
import { connect } from 'react-redux';
import { fetchAppPermissionAction, addAppPermissionAction } from '../../store/action';
import { arrToTree } from '../../utils/tools';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppPermissionAction, addAppPermissionAction
})
export default class AppPermission extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPermissionForm: false,
            expandItems: []
        }
    }

    componentDidMount() {
        const { appDetail: { appid } } = this.props;
        if (appid) {
            this.loadPermission(appid)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.appDetail.appid != nextProps.appDetail.appid) {
            this.loadPermission(nextProps.appDetail.appid)
        }
    }

    loadPermission = (appid) => {
        this.props.fetchAppPermissionAction(appid)
    }

    toggleShowPermissionForm = () => {
        this.setState({
            showPermissionForm: !this.state.showPermissionForm
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    changeExpandItems = (items) => {
        this.setState({
            expandItems: items
        })
    }

    expandAllItems = () => {
        const { appDetail: { permissions } } = this.props;
        let keys = [];
        permissions.map(k => keys.push(k._id));
        if(keys.length == this.state.expandItems.length) {
            this.changeExpandItems([]);            
        } else {
            this.changeExpandItems(keys);
        }
    }

    onSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                this.props.addAppPermissionAction({...values, appid: this.props.appDetail.appid}, ({ err,data }) => {
                    if(!err) {
                        this.toggleShowPermissionForm();
                        message.success('添加成功');
                        this.loadPermission(this.props.appDetail.appid);
                    }
                })
                return;
            }
        })
    }

    render() {
        const { appDetail: { permissions } } = this.props;
        const menusTree = arrToTree({arr: permissions})
        const columns = [
            {dataIndex: 'title', title: '标题'},
            {dataIndex: 'code', title: 'code'},
            {dataIndex: 'type', title: '类型'},
            {dataIndex: 'public', title: '公开', render: t => <Switch checked={t} />},
            {dataIndex: 'description', title: '简介'},
        ]
        return (
            <div>
                <div style={{marginBottom: 10}}>
                    <Button onClick={this.toggleShowPermissionForm}><Icon type="file-add" theme="outlined"/>添加</Button>
                    <Button style={{marginLeft: 10}} onClick={this.expandAllItems}>展开/折叠</Button>
                    <span style={{marginLeft: 10}}>现有共 {permissions.length} 项</span>
                </div>
                
                <Table size="small" expandedRowKeys={this.state.expandItems} onExpandedRowsChange={this.changeExpandItems} bordered={false} rowKey={r => r._id} dataSource={menusTree} pagination={false} columns={columns} />

                {this.state.showPermissionForm && <PermissionForm visible={this.state.showPermissionForm} 
                    onCancel={this.toggleShowPermissionForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.onSubmit} 
                    title="添加权限" 
                    menusTree={menusTree} />}
            </div>
        );
    }
}
