import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserAppSchema, changeShowEditUserPermission, changeShowChooseTargetApp, userAddRoleAction, userRemoveRoleAction, getUserAppRoleIdsAction } from '../../store/action';
import { Drawer, Button, Checkbox, Tree } from 'antd';
import { arrToTree } from '../../utils/tools';
const TreeNode = Tree.TreeNode;

@connect(({ userPermission, apps, users, appDetail }) => {
    return { userPermission, apps, users, appDetail };
}, { fetchUserAppSchema, changeShowEditUserPermission, changeShowChooseTargetApp,  userAddRoleAction, userRemoveRoleAction, getUserAppRoleIdsAction  })
export default class UserPermission extends Component {

    componentDidMount() {
        const {apps: { targetApp }} = this.props;
        if(targetApp.appid) {
            this.loadData(targetApp.appid);
        }
    }

    loadData = (appid) => {
        const { apps: { targetApp }, users: { targetUser: { _id } }  } = this.props;
        if(!appid) {
            appid = targetApp.appid;
        }
        this.props.fetchUserAppSchema(appid);
        this.props.getUserAppRoleIdsAction({ appid, userid: _id })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.apps.targetApp.appid != nextProps.apps.targetApp.appid) {
            this.loadData(nextProps.apps.targetApp.appid);
        }
    }

    closeDrawer = () => {
        this.props.changeShowEditUserPermission(false)
    }

    changTargetApp = () => {
        this.closeDrawer();
        this.props.changeShowChooseTargetApp(true)
    }

    changeRole = (roleid, rolecode, val) => {
        const { apps: { targetApp: { appid }}, users: { targetUser: { _id } }  } = this.props;
        if (val) {
            this.props.userAddRoleAction({ appid, roleid, rolecode, userid: _id })
        } else {
            this.props.userRemoveRoleAction({ appid, roleid, rolecode, userid: _id })
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
        const { userPermission: { showEditUserPermission, appSchema:{ roles, permissions }, userAppRoles }, apps: { targetApp } } = this.props;
        const menusTree = arrToTree({arr: permissions})
        const treeDom = this.loopTreeNode(menusTree);

        let checkedKeysMap = {}, checkedKeys = [];
        userAppRoles.map(rKey => {
            roles.map(r => {
                if (r._id == rKey) {
                    r.permissions.map(p => checkedKeysMap[p] = 1);
                }
            })
        });
        checkedKeys = Object.keys(checkedKeysMap);
        return (
            <Drawer
                title={<div>编辑用户权限 - {targetApp.name}  <Button onClick={this.changTargetApp}>切换应用</Button></div>}
                width={600 }
                destroyOnClose={true}
                visible={showEditUserPermission}
                onClose={this.closeDrawer}
                style={{height: '100%', display: 'flex', padding: 15}}>
                {roles.length == 0 && <div>应用未创建角色</div>}
                <div style={{display: 'flex', flexDirection: 'row', height: '100%', flex: 1}}>
                    <div style={{borderRight: '1px solid #CCC', flex: 1}}>
                        <p style={{color: '#999'}}>操作角色</p>
                        {roles.map(role => {
                            return <div style={{marginBottom: 6}}><Checkbox checked={userAppRoles.find(item => item==role._id)} onChange={(e) => this.changeRole(role._id, role.code, e.target.checked)}>{role.name}</Checkbox></div>
                        })}
                    </div>

                    <div style={{flex: 1, paddingLeft: 15}}>
                        <p style={{color: '#999'}}>权限预览<small>(不可操作)</small></p>
                        <Tree
                            showLine={true}
                            defaultExpandAll={true}
                            checkable
                            checkedKeys={checkedKeys}>
                            {treeDom}
                        </Tree>
                    </div>
                </div>
            </Drawer>
        )
    }
}