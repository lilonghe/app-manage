import React, {Component} from 'react';
import { Input, Table, Button, message } from 'antd';
import { searchUserAction, addUserAction, changeShowChooseTargetApp, changeShowEditUserPermission, changeTargetUser } from '../store/action';
import { connect } from 'react-redux';
import InfoForm from '../components/user/infoForm';
import ChooseTargetApp from '../components/app/chooseTargetApp';
import EditUserPermission from '../components/user/userPermission';


@connect(({ users, apps }) => {
    return { users, apps };
}, { searchUserAction,addUserAction, changeShowChooseTargetApp, changeShowEditUserPermission, changeTargetUser })
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
                const { users:{ targetUser } } = this.props;
                if(!targetUser._id) {
                    this.props.addUserAction({...values}, (({err}) => {
                        if (!err) {
                            message.success('添加成功');
                            this.toggleShowInfoForm();
                            this.searchUser();
                        }
                    }))
                }
            }
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    addUser = () =>{
        this.toggleShowInfoForm();
    }

    toggleShowInfoForm = () => {
        this.setState({
            showInfoForm: !this.state.showInfoForm
        })
    }

    editUserPerms = async (id) => {
        let user = this.props.users.userList.find(user => user._id == id);

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

    render() {
        const usersColumns = [
            {title:"唯一标识", dataIndex: 'userId' },
            {title:'名字', dataIndex:'name'},
            {title:'部门', dataIndex:'deptName'},
            {title:'创建时间', dataIndex:'createdAt'},
            {title:'更新时间', dataIndex:'updatedAt'},
            {title:'操作', dataIndex:'action', render: (text, record) =>{
                return <div>
                    <Button onClick={() => this.editUserPerms(record._id)}>编辑权限</Button>
                    <Button>删除</Button>
                </div>
            }},
        ]
        const { users: { userList, totalUser, targetUser } } = this.props;

        return (
            <div style={{width: 1200, margin: 'auto'}}>
                <Button onClick={this.addUser}>添加用户</Button> 共{totalUser}个用户
                <Input onChange={this.changeKeyword}/>
                <Table dataSource={userList} columns={usersColumns} pagination={{
                    total: totalUser,
                    hideOnSinglePage: true
                }}/>


                <InfoForm 
                    key={targetUser._id}
                    targetUser={targetUser}
                    visible={this.state.showInfoForm} 
                    onCancel={this.toggleShowInfoForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.handleSubmit} 
                    title={targetUser._id ? "编辑用户":"添加用户"} />

                <ChooseTargetApp onChange={this.changeTargetApp} />
                <EditUserPermission />
            </div>
        )
    }
}