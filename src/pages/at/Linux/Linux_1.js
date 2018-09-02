import React, {Component} from 'react';
import Markdown from 'react-markdown';


class Linux_1 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>


                <Markdown source={"## CentOS7 关闭防火墙\n" +
                "\n" +
                "```\n" +
                "systemctl status firewalld.service\n" +
                "systemctl stop firewalld.service #停止firewall\n" +
                "systemctl disable firewalld.service #禁止firewall开机启动\n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "## ip固定\n" +
                "\n" +
                "cd  /etc/sysconfig/network-scripts/\n" +
                "\n" +
                "```\n" +
                "BOOTPROTO=\"static\"  \n" +
                "DNS1=\"192.168.159.2\"  \n" +
                "GATEWAY=\"192.168.159.2\"  \n" +
                "IPADDR=\"192.168.159.132\"  \n" +
                "```\n" +
                "\n" +
                "\n" +
                "\n" +
                "## chown\n" +
                "```\n" +
                "chmod –R 777 .\n" +
                "chown -R etcd2 /home/etcd2   chown -R user dir\n" +
                "\n" +
                "```\n" +
                "\n"}/>
            </div>
        );
    }
}

export default Linux_1;