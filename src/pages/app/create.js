import React, { Component } from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class extends Component {
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

        return (
            <div>
                <h2>创建应用</h2>
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
                            initialValue: targetRole.name
                        })(
                            <Input placeholder={'名称'}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="简介"
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                max: 20, message: '最多20个字符'
                            },{
                                required: true, message: '未输入简介',
                            }],
                            initialValue: targetRole.name
                        })(
                            <Input placeholder={'简介'}/>
                        )}
                    </FormItem>
                </Form>
            </div>
        )
    }
}