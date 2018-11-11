import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserAppSchema, changeShowEditUserPermission, changeShowChooseTargetApp, userAddRoleAction, userRemoveRoleAction, getUserAppRoleIdsAction } from '../../store/action';
import { Drawer, Button, Checkbox } from 'antd'

@connect(({ userPermission, apps, users }) => {
    return { userPermission, apps, users };
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

    render() {
        const { userPermission: { showEditUserPermission, appSchema:{ roles }, userAppRoles }, apps: { targetApp } } = this.props;
        return (
            <Drawer
                title={<div>编辑用户权限 - {targetApp.name}  <Button onClick={this.changTargetApp}>切换应用</Button></div>}
                width={600 }
                destroyOnClose={true}
                visible={showEditUserPermission}
                onClose={this.closeDrawer}>
                {roles.length == 0 && <div>应用未创建角色</div>}

                <div>
                    {roles.map(role => {
                        return <Checkbox checked={userAppRoles.find(item => item==role._id)} onChange={(e) => this.changeRole(role._id, role.code, e.target.checked)}>{role.name}</Checkbox>
                    })}
                </div>
            </Drawer>
        )
    }
}