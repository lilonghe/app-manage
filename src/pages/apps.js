import React,{ Component } from 'react';
import { List, Avatar, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import { fetchAppsAction,addAppAction } from '../store/action';
import { Link } from 'react-router-dom';
import styles from './apps.styl';
import InfoForm from '../components/app/infoForm';

@connect(({ apps }) => {
    return { apps }
}, { fetchAppsAction,addAppAction })
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            showInfoForm: false
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
                this.props.addAppAction({...values}, ({ err, data }) => {
                    if (!err) {
                        message.success('添加成功');
                        this.props.fetchAppsAction();
                        this.toggleShowInfoForm();
                    }
                })
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

    render() {
        const { apps: { list } } = this.props;
        const appsView = this.filterApps(this.state.keyword, list)
        return (
            <div className={styles.appListWrapper}>
                <Button onClick={this.toggleShowInfoForm}>添加应用</Button>
                <Input onChange={this.changeKeyword} placeholder={"输入关键词查询"} />
                <List
                    dataSource={appsView}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" src={item.icon} />}
                                title={<Link to={`/apps/${item.appid}/info`}>{item.name}</Link>}
                                description={item.description}
                            />
                        </List.Item>
                    )}/>


                <InfoForm 
                    visible={this.state.showInfoForm} 
                    onCancel={this.toggleShowInfoForm}
                    wrappedComponentRef={this.saveFormRef} 
                    onOk={this.handleSubmit} 
                    title="添加应用" />
            </div>
        )
    }
}
