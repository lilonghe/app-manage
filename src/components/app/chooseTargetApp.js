import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Drawer } from 'antd';
import { changeShowChooseTargetApp } from '../../store/action';

@connect(({ apps }) => {
    return { apps }
}, { changeShowChooseTargetApp })
export default class ChooseTargetApp extends Component {

    closeDrawer = () => {
        this.props.changeShowChooseTargetApp(false)
    }

    render() {
        const { apps: { showChooseTargetApp } } = this.props;
        return (
            <Drawer
                visible={showChooseTargetApp}
                onClose={this.closeDrawer}>
                This is content.
            </Drawer>
        )
    }
}