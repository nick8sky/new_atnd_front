import React, { Component } from 'react';

import { Table,Input ,Button} from 'antd';

const { TextArea } = Input;


const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
}, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
}];

class Linux_1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'class',
            loading: false
        }
    }


    handleOk = (e) => {
        this.setState({
            loading: true,
        });

    }


    handleCancel = (e) => {
        this.setState({
            loading: false,
        });
    }

    render() {
        const {loading} = this.state;
        const loadMore = loading? (
            <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
                <Table  columns={columns} dataSource={dataSource} />
            </div>
        ) :null;

        return (
            <div>


                <TextArea rows={4}
                          value={this.state.value}
                          onChange={(e)=>this.setState({value:e.target.value})}
                          onPressEnter= {this.handleOk}
                >
                </TextArea>
                <Button onClick={this.handleCancel}>Cancel</Button>


                <div>{loadMore}</div>



            </div>



        );
    }
}

export default Linux_1;