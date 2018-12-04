import React, {  Component } from "react";
import {Modal, Form, Input} from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class RoleFormModal extends Component {
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

        const { targetRole = {} } = this.props;
        return (
            <Modal visible={visible} onOk={onOk} onCancel={onCancel} title={title}>
                <Form>
                { targetRole.id && <FormItem
                        {...formItemLayout}
                        label="Id"
                    >
                        <span>{targetRole.id}</span>
                    </FormItem> }
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
                            initialValue: targetRole.name
                        })(
                            <Input placeholder={'名称'}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Code"
                    >
                        {getFieldDecorator('code', {
                            rules: [{
                                pattern: /^[A-Za-z_]{1,20}$/, message: '字母或下换线, 最多20个字符'
                            }, {
                                required: true, message: '未输入 code',
                            }],
                            initialValue: targetRole.code
                        })(
                            <Input placeholder={'唯一代码'}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                max: 120, message: '最多120个字符'
                            }, {
                                required: true, message: '未输入简介',
                            }],
                            initialValue: targetRole.description
                        })(
                            <Input.TextArea  placeholder={'简要介绍'}/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}