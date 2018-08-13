import React, { Component } from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';


function onSelect(value) {
    console.log('onSelect', value);
}


class Home extends React.Component {
    state = {
        dataSource: ['论钢铁是怎么炼成的'],
    }


    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value,
                value + value,
                value + value + value,
            ],
        });
    }




    componentDidMount() {

    }
    render() {
        const { dataSource } = this.state;
        return (
            <AutoComplete
                dataSource={dataSource}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={this.handleSearch}
                placeholder="input here"
            >
                <Input
                    suffix={(
                        <Button className="search-btn" size="large" type="primary">
                            <Icon type="search" />
                        </Button>
                    )}
                />
            </AutoComplete>




        );
    }
}



export default Home;