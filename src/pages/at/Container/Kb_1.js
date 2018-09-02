import React, { Component } from 'react';
import Markdown  from 'react-markdown';




class Kb_1 extends Component {
    constructor(props) {
        super(props);
    }




    render() {

        return (
            <div>


                <Markdown source={"https://coreos.com/etcd/docs/latest/\n" +
                "\n" +
                "Download the pre-built binary\n" +
                "\n" +
                "https://github.com/etcd-io/etcd/releases\n" +
                "\n" +
                "```\n" +
                "drwxr-xr-x. 2 root root   48 9月   2 21:07 network-online.target.wants\n" +
                "-rw-rw-r--. 1 etcd etcd  818 9月   2 22:28 etcd.service\n" +
                "```\n" +
                "\n" +
                " Active: failed (Result: start-limit)\n" +
                "\n" +
                "```\n" +
                "etcdctl cluster-health\n" +
                "bash: /usr/bin/etcdctl: 权限不够\n" +
                "```\n" +
                "https://blog.csdn.net/shida_csdn/article/details/78427434"}/>


            </div>



        );
    }
}

export default Kb_1;