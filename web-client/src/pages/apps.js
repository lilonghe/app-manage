import React,{ Component } from 'react';
import { List, Avatar, Input, Button, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { fetchAppsAction,addAppAction,editAppAction } from '../store/action';
import { Link } from 'react-router-dom';
import styles from './apps.styl';
import InfoForm from '../components/app/infoForm';

@connect(({ apps }) => {
    return { apps }
}, { fetchAppsAction,addAppAction,editAppAction })
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            showInfoForm: false,
            targetApp: {}
        }
    }

    componentDidMount() {
        this.props.fetchAppsAction();
    }

    filterApps = (val, apps) => {
        val = val.toLowerCase()
        return apps.filter(item => item.name.toLowerCase().indexOf(val) != -1 || item.description.indexOf(val) != -1);
    }

    changeKeyword = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }


    handleSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                if (this.state.targetApp._id) {
                    this.props.editAppAction({...values, appid: this.state.targetApp.appid}, ({ err, data }) => {
                        if (!err) {
                            message.success('编辑成功');
                            this.props.fetchAppsAction();
                            this.toggleShowInfoForm();
                        }
                    })
                } else {
                    this.props.addAppAction({...values}, ({ err, data }) => {
                        if (!err) {
                            message.success('添加成功');
                            this.props.fetchAppsAction();
                            this.toggleShowInfoForm();
                        }
                    })
                }
            }
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    toggleShowInfoForm = () => {
        this.setState({
            showInfoForm: !this.state.showInfoForm
        })
    }

    editApp = (id, e) => {
        e.preventDefault();
        const { apps: { list } } = this.props;
        const app = list.find(item => item._id == id);
        if (app) {
            this.setState({
                targetApp: app
            }, this.toggleShowInfoForm());
        }
    }

    createApp = () => {
        this.setState({
            targetApp: {}
        }, this.toggleShowInfoForm());
    }

    render() {
        const { apps: { list } } = this.props;
        const appsView = this.filterApps(this.state.keyword, list)
        return (
            <div className={styles.appListWrapper}>
                <Button onClick={this.createApp}>添加应用</Button>
                <Input onChange={this.changeKeyword} placeholder={"输入关键词查询"} />
                <List
                    dataSource={appsView}
                    renderItem={item => (
                        <Link to={`/apps/${item.appid}/info`}>
                            <List.Item className={styles.appItem} actions={[<Icon 
                                    onClick={(e) => this.editApp(item._id, e)}
                                    type="edit" theme="outlined" style={{cursor: 'pointer', marginRight: 10}}/>]}>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" src={item.icon} />}
                                    title={<Link to={`/apps/${item.appid}/info`}>{item.name}</Link>}
                                    description={item.description}
                                />
                            
                            </List.Item>
                        </Link>
                    )}/>


                <InfoForm 
                    key={this.state.targetApp._id}
                    targetApp={this.state.targetApp}
                    visible={this.state.showInfoForm} 
                    onCancel={this.toggleShowInfoForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.handleSubmit} 
                    title={this.state.targetApp._id ? "编辑应用":"添加应用"} />
            </div>
        )
    }
}
