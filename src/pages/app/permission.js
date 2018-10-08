import React, { Component } from 'react';
import { Table, Col, Tabs, Switch } from 'antd';
const { Column } = Table.Column;
const TabPane = Tabs.TabPane;
import PermissionForm from '../../components/app/permission/permissionForm';
import { connect } from 'react-redux';
import { fetchAppPermissionAction } from '../../store/action';

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppPermissionAction
})
export default class appDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPermissionForm: true
        }
    }

    componentDidMount() {
        const { appDetail: { appid } } = this.props;
        if (appid) {
            this.props.fetchAppPermissionAction(appid)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.appDetail.appid != nextProps.appDetail.appid) {
            this.props.fetchAppPermissionAction(nextProps.appDetail.appid)
        }
    }

    toggleShowPermissionForm = () => {
        this.setState({
            showPermissionForm: !this.state.showPermissionForm
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
        const { appDetail: { permissions } } = this.props;
        return (
            <div>
                <Table dataSource={permissions}>
                    <Column title="title" dataIndex="title" />
                    <Column title="Code" dataIndex="code"  />
                    <Column title="type"  dataIndex="type"  />
                    <Column title="public"  dataIndex="public" render={(t) => <Switch checked={t} />}  />
                </Table>
            </div>
        );
    }
}
