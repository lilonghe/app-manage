import React, { Component } from 'react';
import { Select, Form, Icon, Input, Button, Checkbox, Popconfirm } from 'antd';
import { connect } from 'react-redux';
const FormItem = Form.Item;
import { fetchAppRolesAction } from '../../store/action';
import RoleForm from '../../components/app/role/RoleForm';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppRolesAction
})
export default class role extends Component {

    state = {
        targetRole: {}
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
       const { appDetail: { roles } } = this.props;
       let role = roles.find(r => r.id == val);
       this.setState({
           targetRole: role || {}
       })
    }

    render() {
        const { appDetail: { roles } } = this.props;
        return (
            <div>
                <Select 
                    allowClear
                    placeholder={'选择角色操作'} 
                    onChange={this.changeTargetRole} 
                    style={{minWidth: 300, marginLeft: '16.5%'}}>
                    { roles.map(role => <Select.Option value={role.id}>{role.name}</Select.Option>)}
                </Select>
                <RoleForm key={this.state.targetRole.id} targetRole={this.state.targetRole}  />
            </div>
        );
    }
}
