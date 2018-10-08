import React, { Component } from 'react';
import { Table, Col, Tabs } from 'antd';
const { Column } = Table.Column;
const TabPane = Tabs.TabPane;
import PermissionForm from '../../components/app/permission/permissionForm';

export default class appDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showPermissionForm: true
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
        return (
            <div>
                {/* <Tabs defaultActiveKey="1" > */}
                    {/* <TabPane tab="菜单" key="1"> */}
                        <Table>
                            <Column title="title" />
                            <Column title="Code" />
                            <Column title="type" />
                            <Column title="public" />
                        </Table>
                    {/* </TabPane>
                    <TabPane tab="权限" key="2">
                        <Table>
                            <Column title="title" />
                            <Column title="Code" />
                            <Column title="public" />
                        </Table>
                    </TabPane>
                </Tabs> */}
                

                <PermissionForm 
                    title="添加权限"
                    visible={this.state.showPermissionForm}
                    wrappedComponentRef={this.saveFormRef}
                    onOk={this.onSubmit}  />
            </div>
        );
    }
}
