import React, { Component } from 'react';
import { Select, Form, Icon, Input, Button, Checkbox, Popconfirm, Table, message } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const  { Column } = Table.Column;
import { fetchAppRolesAction,addAppRoleAction,editAppRoleAction } from '../../store/action';
import RoleForm from '../../components/app/role/RoleForm';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppRolesAction, addAppRoleAction,editAppRoleAction
})
export default class role extends Component {

    state = {
        targetRole: {},
        showRoleForm: false
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
        console.log(val);
        if (val) {
            const { appDetail: { roles } } = this.props;
            let role = roles.find(r => r._id == val);
            await this.setState({
                targetRole: role || {}
            });
        } else {
            await this.setState({
                targetRole: {}
            });
        }
      
       this.toggleShowRoleForm();
    }

    toggleShowRoleForm = () => {
        this.setState({
            showRoleForm: !this.state.showRoleForm
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                const { appDetail: { appid } } = this.props;
                if(this.state.targetRole._id) {
                    this.props.editAppRoleAction({...values, _id: this.state.targetRole._id, appid}, ({ err }) => {
                        if(!err) {
                            message.success('编辑角色成功');
                        }
                    })
                } else {
                    this.props.addAppRoleAction({...values, appid}, ({ err }) => {
                        if(!err) {
                            message.success('添加角色成功');
                        }
                    })
                }
               
            }
        })
    }

    render() {
        const { appDetail: { roles } } = this.props;
        return (
            <div>
                <Icon type="file-add" theme="outlined" style={{cursor: 'pointer'}} onClick={this.changeTargetRole}/>
                <Table dataSource={roles} pagination={false}>
                    <Column title="name" dataIndex="name" />
                    <Column title="code" dataIndex="code" />
                    <Column title="description" dataIndex="description" />
                    <Column title="user count" dataIndex="count" />
                    <Column title="action" render={(t, r) => {
                        return <div>
                            <Icon type="edit" style={{cursor: 'pointer'}} onClick={() => this.changeTargetRole(r._id)}/>
                            <div style={{width: 20, display:'inline-block'}}></div>
                            <Icon type="close" />
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
            </div>
        );
    }
}
