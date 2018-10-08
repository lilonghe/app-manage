import React, {  Component } from "React";
import {Modal, Form, Input, Switch, Radio} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


@Form.create()
export default class CustomerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSimple: false
        }
    }
    
    changeMenuType = (e) => {
        if (e.target.value == "permission") {
            this.setState({
                typeSimple: true
            })
        } else {
            this.setState({
                typeSimple: false
            })
        }
    }

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

        const { targetPermission = {} } = this.props;
        const { typeSimple } = this.state;
        return (
            <Modal visible={visible} onOk={onOk} onCancel={onCancel} title={title}>
                <Form>
                { targetPermission.id && <FormItem
                        {...formItemLayout}
                        label="Id"
                    >
                        <span>{targetPermission.id}</span>
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
                            initialValue: targetPermission.name
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
                            initialValue: targetPermission.code
                        })(
                            <Input placeholder={'唯一代码'}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="公开"
                    >
                        {getFieldDecorator('description', {
                            initialValue: targetPermission.public
                        })(
                            <Switch />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                    >
                        {getFieldDecorator('description', {
                            initialValue: targetPermission.type || 'menu'
                        })(
                            <RadioGroup onChange={this.changeMenuType}>
                                <RadioButton value="menu">菜单</RadioButton>
                                <RadioButton value="button">按钮</RadioButton>
                                <RadioButton value="permission">权限</RadioButton>
                            </RadioGroup>
                        )}
                    </FormItem>
                    { !typeSimple && <FormItem
                        {...formItemLayout}
                        label="样式"
                    >
                        {getFieldDecorator('style',{
                            initialValue: targetPermission.style
                        })(
                            <Input placeholder={'样式'}/>
                        )}
                    </FormItem> }
                    {!typeSimple && <FormItem
                        {...formItemLayout}
                        label="地址"
                    >
                        {getFieldDecorator('style',{
                            initialValue: targetPermission.url
                        })(
                            <Input placeholder={'url'}/>
                        )}
                    </FormItem> }
                </Form>
            </Modal>
        )
    }
}