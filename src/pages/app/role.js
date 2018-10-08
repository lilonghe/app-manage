import React, { Component } from 'react';
import { Select, Form, Icon, Input, Button, Checkbox, Popconfirm, Table } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const  { Column } = Table.Column;
import { fetchAppRolesAction } from '../../store/action';
import RoleForm from '../../components/app/role/RoleForm';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppRolesAction
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

    changeTargetRole = (val) => {
        console.log(val);
        if (val) {
            const { appDetail: { roles } } = this.props;
            let role = roles.find(r => r.id == val);
            this.setState({
                targetRole: role || {}
            });
        } else {
            this.setState({
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
            if (err) {
                return;
            }
            console.log(values);
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
                            <Icon type="edit" style={{cursor: 'pointer'}} onClick={() => this.changeTargetRole(r.id)}/>
                            <div style={{width: 20, display:'inline-block'}}></div>
                            <Icon type="close" />
                        </div>
                    }} />
                </Table>

                <RoleForm 
                    targetRole={this.state.targetRole}
                    visible={this.state.showRoleForm} 
                    onCancel={this.toggleShowRoleForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.onSubmit} 
                    title="添加角色" />
            </div>
        );
    }
}
