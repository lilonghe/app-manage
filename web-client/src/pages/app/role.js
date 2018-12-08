import React, { Component } from 'react';
import { Select, Form, Icon, Input, Button, Checkbox, Popconfirm, Table, message, Drawer, Tooltip } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const  { Column } = Table.Column;
import { fetchAppRolesAction,addAppRoleAction,editAppRoleAction, editAppRolePermissionAction } from '../../store/action';
import RoleForm from '../../components/app/role/roleForm';
import RolePermission from '../../components/app/role/rolePermission';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppRolesAction, addAppRoleAction,editAppRoleAction, editAppRolePermissionAction
})
export default class role extends Component {

    state = {
        targetRole: {},
        showRoleForm: false,
        showPermissionDrawer: false
    }

    componentDidMount() {
        const { appDetail: { info } } = this.props;
        this.props.fetchAppRolesAction(info.appid);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    changeTargetRole = async (val) => {
        if (val) {
            const { appDetail: { roles } } = this.props;
            let role = roles.find(r => r.id == val);
            await this.setState({
                targetRole: role || {}
            });
        } else {
            await this.setState({
                targetRole: {}
            });
        }
    }

    toggleShowRoleForm = () => {
        this.setState({
            showRoleForm: !this.state.showRoleForm
        })
    }

    editRoleInfo = async (id) => {
        await this.changeTargetRole(id);
        this.toggleShowRoleForm();
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    loadRoles = () => {
        const { appDetail: { info } } = this.props;
        this.props.fetchAppRolesAction(info.appid);
    }

    onSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                const { appDetail: { appid } } = this.props;
                if(this.state.targetRole.id) {
                    const { code, id } = this.state.targetRole;
                    this.props.editAppRoleAction({...values,code, id, appid}, ({ err }) => {
                        if(!err) {
                            message.success('编辑角色成功');
                            this.toggleShowRoleForm();
                            this.loadRoles();
                        }
                    })
                } else {
                    this.props.addAppRoleAction({...values, appid}, ({ err }) => {
                        if(!err) {
                            message.success('添加角色成功');
                            this.toggleShowRoleForm();
                            this.loadRoles();
                        }
                    })
                }
               
            }
        })
    }

    editRolePermission = async (id) => {
        await this.changeTargetRole(id);
        this.setState({
            showPermissionDrawer: true
        })
    }

    changeRolePermissions = (keys) => {
        const { appDetail: { appid } } = this.props;
        const { targetRole: { id, code } } = this.state;

        this.props.editAppRolePermissionAction({ appid: appid, role_code: code, permission_codes: keys }, ({ err }) => {
            if (!err) {
                message.success('已更新');
            }
        });
    }

    toggleShowPermissionDrawer = () =>{
        this.setState({
            showPermissionDrawer: !this.state.showPermissionDrawer
        })
    }

    render() {
        const { appDetail: { roles } } = this.props;
        const {targetRole} = this.state;
        return (
            <div>
                <div style={{marginBottom: 10}}>
                    <Button onClick={this.editRoleInfo}><Icon type="file-add" theme="outlined"/>添加</Button>
                    <span style={{marginLeft: 10}}>现有共 {roles.length} 项</span>
                </div>
                <Table dataSource={roles} pagination={false}>
                    <Column title="名称" dataIndex="name" />
                    <Column title="code" dataIndex="code" />
                    <Column title="介绍" dataIndex="description" />
                    <Column title="关联用户数" dataIndex="count" />
                    <Column title="操作" render={(t, r) => {
                        return <div>
                            <Tooltip title="编辑角色基础信息"><Icon type="edit" style={{cursor: 'pointer'}} onClick={() => this.editRoleInfo(r.id)}/></Tooltip>
                            <div style={{width: 20, display:'inline-block'}}></div>
                            <Tooltip title="编辑角色权限"><Icon type="project" theme="outlined" style={{cursor: 'pointer'}} onClick={() => this.editRolePermission(r.id)}/></Tooltip>
                            <div style={{width: 20, display:'inline-block'}}></div>
                            <Tooltip title="comming soon..."><Icon type="close" /></Tooltip>
                        </div>
                    }} />
                </Table>

                {this.state.showRoleForm && <RoleForm 
                    targetRole={this.state.targetRole}
                    visible={this.state.showRoleForm} 
                    onCancel={this.toggleShowRoleForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.onSubmit} 
                    title={this.state.targetRole ? "编辑角色":"添加角色"} /> }

                <Drawer
                    title="编辑权限"
                    placement="right"
                    width={400}
                    closable={false}
                    onClose={this.toggleShowPermissionDrawer}
                    visible={this.state.showPermissionDrawer}>
                    <RolePermission key={targetRole.id} checkedKeys={targetRole.permissions} onChange={this.changeRolePermissions} />
                </Drawer>
            </div>
        );
    }
}
