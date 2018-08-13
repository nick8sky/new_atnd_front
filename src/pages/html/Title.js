import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon,Popover } from 'antd';
const SubMenu = Menu.SubMenu;


class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'class',
        }
    }
    handleClick = (e) => {

        this.setState({
            current: e.key,
        });
    }

    handleClick2 = (e) => {
        window.location.replace("#/class")
    }

    handleClick3 = (e) => {
        window.history.back()
    }






    render() {

        return (
            <div >
                <div >
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >

                    <Menu.Item  style={{float:'right'}} key="back" >
                        <Popover  content="返回"  >
                            <a href="javascript:void(0)" onClick={this.handleClick3}> <span style={{fontSize: '20px'}}><Icon type="rollback" /></span></a>
                        </Popover>
                    </Menu.Item>

                    <Menu.Item  style={{float:'right'}} key="about" >
                        <Popover  content="关于我"  >
                            <Link to="/about"><Icon type="user" /></Link>
                        </Popover>

                    </Menu.Item>

                    <Menu.Item  style={{float:'right'}} key="class" >
                        <Popover  content="文档"  >
                            <Link to="/index"><Icon type="appstore-o" /></Link>
                        </Popover>

                    </Menu.Item>


                   {/* <SubMenu    style={{float:'right'}} title={<span><Icon type="appstore-o" /></span>}  key="class"  onTitleClick={this.handleClick2}>

                        <Menu.Item key="setting:12"><Link to="/index">实用工具</Link></Menu.Item>
                        <Menu.Item key="setting:12"><Link to="/design">中间件系列</Link></Menu.Item>
                        <Menu.Item key="setting:12"><Link to="/design">X系列</Link></Menu.Item>
                    </SubMenu>*/}

                    <Menu.Item  style={{float:'right'}} key="home" >
                        <Popover  content="首页"  >
                            <a href="#/"> <span style={{fontSize: '20px'}}><Icon type="home"  /></span></a>
                        </Popover>
                    </Menu.Item>

                </Menu>

                </div>

            </div>
        );
    }
}

export default Title;