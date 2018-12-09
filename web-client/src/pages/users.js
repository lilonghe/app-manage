import React, {Component} from 'react';
import { Input, Table, Button, message, Icon } from 'antd';
import { searchUserAction, addUserAction, editUserAction, changeShowChooseTargetApp, changeShowEditUserPermission, changeTargetUser } from '../store/action';
import { connect } from 'react-redux';
import InfoForm from '../components/user/infoForm';
import ChooseTargetApp from '../components/app/chooseTargetApp';
import EditUserPermission from '../components/user/userPermission';
import styles from './users.styl';


@connect(({ users, apps }) => {
    return { users, apps };
}, { searchUserAction,addUserAction, editUserAction, changeShowChooseTargetApp, changeShowEditUserPermission, changeTargetUser })
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: 20,
            keyword: "",
            offset: 0,
            showInfoForm: false
        };
    }

    componentDidMount() {
        this.searchUser();
    }

    searchUser = () => {
        const {limit, offset, keyword} = this.state;
        this.props.searchUserAction({ limit, offset, keyword });
    }

    changeKeyword = (e) => {
        this.setState({
            keyword: e.target.value,
            offset: 0
        });

        window.searchUserTimeout && clearTimeout(window.searchUserTimeout);
        window.searchUserTimeout = setTimeout(() =>{
            this.searchUser();
        }, 500);
    }

    handleSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                const { users:{ targetUser:{ id, userid } } } = this.props;
                if(!id) {
                    this.props.addUserAction({...values}, (({err}) => {
                        if (!err) {
                            message.success('添加成功');
                            this.toggleShowInfoForm();
                            this.searchUser();
                        }
                    }))
                } else {
                    this.props.editUserAction({...values, id, userid}, ({err}) =>{
                        if (!err) {
                            message.success('编辑成功');
                            this.toggleShowInfoForm();
                            this.searchUser();
                        }
                    });
                }
            }
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    addUser = () =>{
        this.props.changeTargetUser({});
        this.toggleShowInfoForm();
    }

    toggleShowInfoForm = () => {
        this.setState({
            showInfoForm: !this.state.showInfoForm
        })
    }

    editUserPerms = async (id) => {
        let user = this.props.users.userList.find(user => user.id == id);

        if (user) {
            this.props.changeTargetUser(user);
            if (!this.props.apps.targetApp.appid) {
                return this.props.changeShowChooseTargetApp(true)
            } 
            this.props.changeShowEditUserPermission(true);
        }
    }

    changeTargetApp = () => {
        this.props.changeShowEditUserPermission(true);
    }

    editUser = async (id) => {
        let user = this.props.users.userList.find(user => user.id == id);
        if (user) {
            await this.props.changeTargetUser(user);
            this.toggleShowInfoForm();
        }
    }

    render() {
        const usersColumns = [
            {title:"唯一标识", dataIndex: 'userid' },
            {title:'名字', dataIndex:'name'},
            {title:'部门', dataIndex:'dept_name'},
            {title:'创建时间', dataIndex:'created_at'},
            {title:'更新时间', dataIndex:'updated_at'},
            {title:'操作', dataIndex:'action', render: (text, record) =>{
                return <div className={styles.action}>
                    <Icon type="edit" onClick={() => this.editUser(record.id)}/>
                    <Icon type="project" onClick={() => this.editUserPerms(record.id)}>编辑权限</Icon>
                    <Icon type="delete">删除</Icon>
                </div>
            }},
        ]
        const { users: { userList, totalUser, targetUser } } = this.props;

        return (
            <div style={{width: 1200, margin: 'auto'}}>
                <Button onClick={this.addUser}>添加用户</Button> 共{totalUser}个用户
                <Input placeholder="输入关键词搜索用户" onChange={this.changeKeyword}/>
                <Table dataSource={userList} columns={usersColumns} pagination={{
                    total: totalUser,
                    hideOnSinglePage: true
                }}/>


                <InfoForm 
                    key={targetUser.id}
                    targetUser={targetUser}
                    visible={this.state.showInfoForm} 
                    onCancel={this.toggleShowInfoForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.handleSubmit} 
                    title={targetUser.id ? "编辑用户":"添加用户"} />

                <ChooseTargetApp onChange={this.changeTargetApp} />
                <EditUserPermission key={targetUser.id} />
            </div>
        )
    }
}