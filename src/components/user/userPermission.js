import React,{Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserAppSchema, changeShowEditUserPermission, changeShowChooseTargetApp } from '../../store/action';
import { Drawer, Button, Checkbox } from 'antd'

@connect(({ userPermission, apps }) => {
    return { userPermission, apps };
}, { fetchUserAppSchema, changeShowEditUserPermission, changeShowChooseTargetApp })
export default class UserPermission extends Component {

    componentDidMount() {
        const {apps: { targetApp }} = this.props;
        if(targetApp.appid) {
            this.props.fetchUserAppSchema(targetApp.appid);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.apps.targetApp.appid != nextProps.apps.targetApp.appid) {
            this.props.fetchUserAppSchema(nextProps.apps.targetApp.appid);
        }
    }

    closeDrawer = () => {
        this.props.changeShowEditUserPermission(false)
    }

    changTargetApp = () => {
        this.closeDrawer();
        this.props.changeShowChooseTargetApp(true)
    }

    render() {
        const { userPermission: { showEditUserPermission, appSchema:{ roles } }, apps: { targetApp } } = this.props;
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
                        return <Checkbox>{role.name}</Checkbox>
                    })}
                </div>
            </Drawer>
        )
    }
}