import {List, Button, Spin,Icon,Rate,Tag} from 'antd';
import {Link} from 'react-router-dom';
import React, { Component } from 'react';



const data = [
    {
        "title": "React 环境搭建",
        "description": " ",
        "url": "react_1",
        "mi": 2.0,
        "typeColor": "cyan",
        "typeName": "React",
        "updateTime": "2018-03-05"
    }]





class React0 extends Component {
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
                                    <span>{item.description }<p></p><Tag>{item.typeName}</Tag><Rate allowHalf defaultValue={item.mi} />|<IconText type="calendar" text={item.updateTime} />
                                <br/></span>
                                }
                            />
                        </List.Item>

                    )}
                />
            </div>
        );
    }
}

export default React0;