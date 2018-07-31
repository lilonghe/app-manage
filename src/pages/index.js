import React,{ Component } from 'react';
import { List, Avatar, Input } from 'antd';
import { connect } from 'react-redux';
import { fetchAppsAction } from '../store/action';
import { Link } from 'react-router-dom';
import styles from './index.styl';

@connect(({ apps }) => {
    return { apps }
}, { fetchAppsAction })
export default class index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
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

    render() {
        const { apps: { list } } = this.props;
        const appsView = this.filterApps(this.state.keyword, list)
        return (
            <div className={styles.appListWrapper}>
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
            </div>
        )
    }
}
