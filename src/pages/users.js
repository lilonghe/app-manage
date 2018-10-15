import React, {Component} from 'react';
import { Input, Table, Button } from 'antd';

export default class User extends Component {
    render() {
        const usersColumns = [
            {title:"唯一标识", dataIndex: 'userId' },
            {title:'名字', dataIndex:'name'},
            {title:'创建时间', dataIndex:'createdAt'},
            {title:'更新时间', dataIndex:'updatedAt'},
            {title:'操作', dataIndex:'action', render: (text, record) =>{
                <div>
                    <Button>编辑权限</Button>
                    <Button>删除</Button>
                </div>
            }},
        ]

        return (
            <div style={{width: 1200, margin: 'auto'}}>
                {/* <Button>添加用户</Button> */}
                <Input />
                <Table columns={usersColumns}/>
            </div>
        )
    }
}