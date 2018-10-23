import React, { Component } from "react";
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

        const { targetUser = {} } = this.props;
        return (
            <Modal visible={visible} onOk={onOk} onCancel={onCancel} title={title}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="姓名"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                max: 20, message: '最多20个字符'
                            },{
                                required: true, message: '未输入姓名',
                            }],
                            initialValue: targetUser.name
                        })(
                            <Input placeholder={'姓名'}/>
                        )}
                    </FormItem>
                    {targetUser._id ? 
                        <FormItem
                            {...formItemLayout}
                            label="UserId" >
                            <span>{targetUser.userId}</span>
                        </FormItem> :<FormItem
                            {...formItemLayout}
                            label="UserId" >
                        {getFieldDecorator('userId', {
                            rules: [{
                                pattern: /^[A-Za-z_]{1,20}$/, message: '字母或下换线, 最多20个字符'
                            }, {
                                required: true, message: '未输入 userId',
                            }],
                            initialValue: ''
                        })(
                            <Input placeholder={'唯一用户表示'}/>
                        )}
                    </FormItem>}
                    <FormItem
                        {...formItemLayout}
                        label="部门"
                    >
                        {getFieldDecorator('deptName', {
                            rules: [{
                                max: 120, message: '最多120个字符'
                            }],
                            initialValue: targetUser.deptName
                        })(
                            <Input.TextArea  placeholder={'部门'}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}