import {List, Button, Spin,Icon,Rate,Tag} from 'antd';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';



const data = [
    {
        "title": "Kubernetes系列",
        "description": " ",
        "url": "kubernetes"
    },
    {
        "title": "Linux系列",
        "description": " ",
        "url": "linux"
    },
    {
        "title": "React系列",
        "description": " ",
        "url": "react"
    }
    ,
    {
        "title": "工具",
        "description": " ",
        "url": "util"
    }
    ,
    {
        "title": "实例",
        "description": " ",
        "url": "test"
    }



    ]





class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key:'',
            data: data,
        }

    }











    render() {

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
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default Index;