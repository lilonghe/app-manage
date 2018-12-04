import React, {  Component } from "react";
import {Modal, Form, Input, TreeSelect, Tree} from 'antd';
import { connect } from 'react-redux';
import { fetchAppPermissionAction, addAppPermissionAction } from '../../../store/action';
import { arrToTree } from '../../../utils/tools';
const TreeNode = Tree.TreeNode;

@connect(({ appDetail }) => {
    return { appDetail }
}, {
    fetchAppPermissionAction, addAppPermissionAction
})
export default class RolePermission extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { appDetail: { appid } } = this.props;
        if (appid) {
            this.loadPermission(appid)
        }
    }

    loadPermission = (appid) => {
        this.props.fetchAppPermissionAction(appid)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.appDetail.appid != nextProps.appDetail.appid) {
            this.loadPermission(nextProps.appDetail.appid)
        }
    }

    loopTreeNode = (data) => data.map((item) => {
        if(item.children) {
            return <TreeNode value={item.code} title={item.title} key={item.code}>
                {this.loopTreeNode(item.children)}
            </TreeNode>
        }
        return <TreeNode value={item.code} title={item.title}  key={item.code}/>
    })

    render() {
        const { appDetail: { permissions }, checkedKeys=[],onChange } = this.props;
        const menusTree = arrToTree({arr: permissions})
        const treeDom = this.loopTreeNode(menusTree);

        if (!permissions || permissions.length == 0) {
            return <span>暂无权限或加载中</span>
        }

        return (
            <div>
                <Tree
                    defaultExpandAll={true}
                    checkable
                    defaultCheckedKeys={checkedKeys}
                    onCheck={onChange}
                    placeholder="Please select">
                    {treeDom}
                </Tree>
            </div>
        )
    }
}