import {List, Button, Spin,Icon,Rate,Tag} from 'antd';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';



const data = [
    {
        "title": "React 语法测试",
        "description": " ",
        "url": "test_1"
    },
    {
        "title": "字体颜色测试",
        "description": " ",
        "url": "test_2"
    },

]





class Test0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key:'',
            data: data,
        }

    }











    render() {
        const IconText = ({ type, text }) => (
            <span> <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        const {loading, data} = this.state;
        return (
            <div>



                <List
                    className="demo-loadmore-list"
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item >
                            <List.Item.Meta
                                title={
                                    <span>

                                 <Link to={item.url}> <span className="link">{item.title}</span></Link>
                                </span>
                                }
                                description={
                                    <span>{item.description }<br/></span>
                                }
                            />
                        </List.Item>

                    )}
                />
            </div>
        );
    }
}

export default Test0;