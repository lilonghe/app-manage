import React, {  Component } from "react";
import {Modal, Form, Input, Switch, Radio, TreeSelect} from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;


@Form.create()
export default class PermissionFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSimple: false,
            typeName: 'menu',
        }
    }
    
    changeMenuType = (e) => {
        if (e.target.value == "permission") {
            this.setState({
                typeSimple: true,
                typeName: e.target.value
            })
        } else {
            this.setState({
                typeSimple: false,
                typeName: e.target.value
            })
        }
    }
    
    loopTreeNode = (data) => data.map((item) => {
        if(item.children) {
            return <TreeNode value={item._id} title={item.title} key={item._id}>
                {this.loopTreeNode(item.children)}
            </TreeNode>
        }
        return <TreeNode value={item._id} title={item.title}  key={item._id}/>
    })

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

        const { targetPermission = {}, menusTree } = this.props;
        const { typeSimple, typeName } = this.state;
        const treeDom = this.loopTreeNode(menusTree);
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
                        {getFieldDecorator('title', {
                            rules: [{
                                max: 20, message: '最多20个字符'
                            },{
                                required: true, message: '未输入名称',
                            }],
                            initialValue: targetPermission.title
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
                                pattern: /^[A-Za-z_][A-Za-z_0-9]{1,20}$/, message: '非数字开头的字符串, 最多20个字符'
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
                        {getFieldDecorator('public', {
                            initialValue: targetPermission.public
                        })(
                            <Switch />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                    >
                        {getFieldDecorator('type', {
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
                        {getFieldDecorator('url',{
                            initialValue: targetPermission.url
                        })(
                            <Input placeholder={'url'}/>
                        )}
                    </FormItem> }
                    {typeName=='menu' && <FormItem
                        {...formItemLayout}
                        label="父级"
                    >
                        {getFieldDecorator('parentId',{
                            initialValue: targetPermission.parentId
                        })(
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="Please select"
                            >
                                {treeDom}
                            </TreeSelect>
                        )}
                    </FormItem> }
                </Form>
            </Modal>
        )
    }
}