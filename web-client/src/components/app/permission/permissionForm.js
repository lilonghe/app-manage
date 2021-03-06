import React, {  Component } from "react";
import {Modal, Form, Input, Switch, Radio, TreeSelect, InputNumber } from 'antd';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const TreeNode = TreeSelect.TreeNode;


@Form.create()
export default class PermissionFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeName: props.targetPermission.type || 'menu',
        }
    }
    
    changeMenuType = (e) => {
        if (e.target.value == "permission") {
            this.setState({
                typeName: e.target.value
            })
        } else {
            this.setState({
                typeName: e.target.value
            })
        }
    }
    
    loopTreeNode = (data) => data.map((item) => {
        const { targetPermission: { id } } = this.props;
        if(item.type=='permission') return <span></span>;
        if(item.children && item.id != id) {
            return <TreeNode value={item.id} title={item.title} key={item.id}>
                {this.loopTreeNode(item.children)}
            </TreeNode>
        }
        return <TreeNode disabled={id == item.id} value={item.id} title={item.title}  key={item.id}/>
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
        const { typeName } = this.state;
        const treeDom = this.loopTreeNode(menusTree);
        const typeSimple = typeName == 'permission' ? true : false;
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
                    {!targetPermission.code && <FormItem
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
                    </FormItem> }
                    {targetPermission.code && <FormItem
                        {...formItemLayout}
                        label="Code"
                    >{targetPermission.code}</FormItem>}
                    <FormItem
                        {...formItemLayout}
                        label="公开"
                    >
                        {getFieldDecorator('public', {
                            initialValue: targetPermission.public
                        })(
                            <Switch defaultChecked={targetPermission.public} />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="类型"
                    >
                        {getFieldDecorator('type', {
                            initialValue: targetPermission.type || 'menu'
                        })(
                            <RadioGroup disabled={targetPermission.type} onChange={this.changeMenuType}>
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
                    {!typeSimple && <FormItem
                        {...formItemLayout}
                        label="父级"
                    >
                        {getFieldDecorator('parentId',{
                            initialValue: targetPermission.parentId
                        })(
                            <TreeSelect
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                placeholder="选择父级节点"
                            >
                                {treeDom}
                            </TreeSelect>
                        )}
                    </FormItem> }
                    { !typeSimple && <FormItem
                        {...formItemLayout}
                        label="Rank"
                        help="从小到大排序"
                    >
                        {getFieldDecorator('rank', {
                            rules: [],
                            initialValue: targetPermission.rank || 0
                        })(
                            <InputNumber />
                        )}
                    </FormItem> }
                </Form>
            </Modal>
        )
    }
}