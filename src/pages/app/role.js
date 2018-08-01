import React, { Component } from 'react';
import { Select, Form, Icon, Input, Button, Checkbox, Popconfirm } from 'antd';
const FormItem = Form.Item;

@Form.create()
export default class role extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };

        return (
            <div>


                <Form style={{marginTop: 20}} onSubmit={this.handleSubmit}>
                    <FormItem
                        {...tailFormItemLayout}
                    >
                        <Select placeholder={'选择角色操作'}></Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Id"
                    >
                        <span>10</span>
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
                        })(
                            <Input placeholder={'唯一代码'}/>
                        )}
                    </FormItem>
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
                                max: 120, message: '最多120个字符'
                            }],
                        })(
                            <Input.TextArea  placeholder={'简要介绍'}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...tailFormItemLayout}
                    >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
