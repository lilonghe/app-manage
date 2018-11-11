import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { changeShowChooseTargetApp, fetchAppsAction, chooseAppAction } from '../../store/action';
import styles from './chooseTargetApp.styl';

@connect(({ apps }) => {
    return { apps }
}, { changeShowChooseTargetApp, fetchAppsAction,chooseAppAction })
export default class ChooseTargetApp extends Component {

    closeDrawer = () => {
        this.props.changeShowChooseTargetApp(false)
    }

    componentDidMount() {
        if (this.props.apps.list.length < 1){
            this.props.fetchAppsAction();
        }
    }

    chooseApp = async (appid) => {
        await this.props.chooseAppAction(appid);
        if (this.props.onChange) {
            this.props.onChange();
        }
        this.props.changeShowChooseTargetApp(false);
    }

    render() {
        const { apps: { showChooseTargetApp, list } } = this.props;
        return (
            <Drawer
                visible={showChooseTargetApp}
                onClose={this.closeDrawer}>
                {list.map(app => <div onClick={() => this.chooseApp(app.appid)} className={styles.appItem}>
                    <img src={app.icon} /> {app.name}
                </div>)}
            </Drawer>
        )
    }
}