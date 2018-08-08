import React, {Component} from 'react';

const loadingStyle = {
    textAlign: 'center',
    fontSize: 20
};

export default class loading extends Component {
    render() {
        let { height } = this.props;
        if (!height) {
            height = 300;
        }
        return (
            <div style={{...loadingStyle, height}}>
                加载中...
            </div>
        );
    }
}
