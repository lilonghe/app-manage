import React, {  Component } from "react";
import {Modal, Form, Input} from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class InfoFormModal extends Component {
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        const { onOk, onCancel, children, visible, title } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const { targetApp = {} } = this.props;
        return (
            <Modal visible={visible} onOk={onOk} onCancel={onCancel} title={title}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                max: 20, message: '最多20个字符'
                            },{
                                required: true, message: '未输入名称',
                            }],
                            initialValue: targetApp.name
                        })(
                            <Input placeholder={'名称'}/>
                        )}
                    </FormItem>
                    {targetApp._id ? 
                        <FormItem
                            {...formItemLayout}
                            label="AppId" >
                            <span>{targetApp.appid}</span>
                        </FormItem> :<FormItem
                            {...formItemLayout}
                            label="AppId" >
                        {getFieldDecorator('appid', {
                            rules: [{
                                pattern: /^[A-Za-z_]{1,20}$/, message: '字母或下换线, 最多20个字符'
                            }, {
                                required: true, message: '未输入 AppId',
                            }],
                            initialValue: ''
                        })(
                            <Input placeholder={'AppId'}/>
                        )}
                    </FormItem>}
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                max: 120, message: '最多120个字符'
                            },{
                                required: true, message: '未输入介绍',
                            }],
                            initialValue: targetApp.description
                        })(
                            <Input.TextArea  placeholder={'简要介绍'}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}