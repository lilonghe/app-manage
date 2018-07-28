import React,{ Component } from 'react';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { fetchAppsAction } from './store/action';

@connect(({ apps }) => {
    return { apps }
}, { fetchAppsAction })
export default class App extends Component {

    componentDidMount() {
        this.props.fetchAppsAction();
    }

    render() {
        const { apps: { list } } = this.props;
        return (
            <div style={{
                maxWidth: '500px',
                margin: 'auto'
            }}>
                <List
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" src={item.icon} />}
                                title={<a href="https://ant.design">{item.name}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}/>
            </div>
        )
    }
}
