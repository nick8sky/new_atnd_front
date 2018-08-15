import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import {Affix, Layout, Row, Col, Icon, BackTop, Anchor, Menu, Breadcrumb} from 'antd'


//Bundle
import Bundle from './component/Bundle';
import './App.css';
import Title from './pages/html/Title';
import Home from './pages/html/Home';






const {Link} = Anchor;

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;


//常量放在import之后
//主列表 加载过慢 改为主页加载预加载图片

const About = (props) => (
    <Bundle load={() => import('./pages/html/About')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

// -----------------------Index-----------------------

const Index0 = (props) => (
    <Bundle load={() => import('./pages/at/Index')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const Linux0 = (props) => (
    <Bundle load={() => import('./pages/at/Linux/Index')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


const React0 = (props) => (
    <Bundle load={() => import('./pages/at/React/Index')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Kubernetes0 = (props) => (
    <Bundle load={() => import('./pages/at/Container/Index')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

const Test0 = (props) => (
    <Bundle load={() => import('./pages/at/Test/Index')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);

// -----------------------Linux-----------------------

const Linux_1 = (props) => (
    <Bundle load={() => import('./pages/at/Linux/Linux_1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//------------------------React----------------------


const React_1 = (props) => (
    <Bundle load={() => import('./pages/at/React/React_1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);


//------------------------Kubernetes----------------------


const Kubernetes_1 = (props) => (
    <Bundle load={() => import('./pages/at/Container/Kb_1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);



//------------------------Test----------------------


const Test_1 = (props) => (
    <Bundle load={() => import('./pages/at/Test/Test_1')}>
        {(Chat) => <Chat {...props}/>}
    </Bundle>
);
//------------------------End----------------------

class App extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={18} offset={3}>
                        <div>
                            <br/>
                            <span style={{fontSize: '30px', marginBottom: '20px'}}> NICK 的代码设计</span><br/>
                             技术人生，青春似火.
                            <HashRouter>
                                <Route component={Title} path="/"/>
                            </HashRouter>
                            <br/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={18} offset={3}>
                        <Content style={{
                            margin: '14px 16px'
                        }}>
                            <HashRouter>
                                <div>
                                    <Route component={Home} exact strict path="/"/>
                                    <Route component={About} exact strict path="/about"/>

                                    <Route component={Index0} exact strict path="/index"/>
                                    <Route component={Kubernetes0} exact strict path="/kubernetes"/>
                                    <Route component={React0} exact strict path="/react"/>
                                    <Route component={Linux0} exact strict path="/linux"/>
                                    <Route component={Test0} exact strict path="/test"/>

                                    {/*------------------------Linux----------------------*/}
                                    <Route component={Linux_1} exact strict path="/linux_1"/>

                                    {/*------------------------Kubernetes-----------------*/}
                                    <Route component={Kubernetes_1} exact strict path="/kubernetes_1"/>

                                    {/*------------------------React----------------------*/}
                                    <Route component={React_1} exact strict path="/react_1"/>

                                    {/*------------------------Test----------------------*/}
                                    <Route component={Test_1} exact strict path="/test_1"/>



                                    {/*------------------------End------------------------*/}


                                </div>
                            </HashRouter>
                        </Content>
                    </Col>


                </Row>


                <Footer style={{textAlign: 'center'}}>
                    <a href='https://github.com/nick8sky'><Icon type="github" style={{marginRight: 8}}/></a> <a
                    href='http://blog.csdn.net/llianlianpay/'>csdn</a><br/>
                    ©2018 nick8sky.github.io all rights reserved nick
                </Footer>


                <div>
                    <BackTop/>
                </div>

            </div>
        )
    }
}

export default App;
