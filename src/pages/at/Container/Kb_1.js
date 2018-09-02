import React, { Component } from 'react';
import Markdown  from 'react-markdown';




class Kb_1 extends Component {
    constructor(props) {
        super(props);
    }




    render() {

        return (
            <div>


                <Markdown source={" Download the pre-built binary\n" +
                "\n" +
                "https://github.com/etcd-io/etcd/releases\n" +
                "\n" +
                "\n" +
                "解压安装\n" +
                "\n" +
                "```python\n" +
                "# tar zxvf etcd-v3.0.17-linux-amd64.tar.gz\n" +
                "# cd etcd-v3.0.17-linux-amd64\n" +
                "# cp etcd /usr/bin/\n" +
                "# cp etcdctl /usr/bin/\n" +
                "```\n" +
                "\n" +
                "配置Service\n" +
                "\n" +
                "```\n" +
                "[Unit]\n" +
                "Description=Etcd Service\n" +
                "After=network.target\n" +
                "After=network-online.target\n" +
                "Wants=network-online.target\n" +
                " \n" +
                "[Service]\n" +
                "Type=notify\n" +
                "Restart=on-failure\n" +
                "WorkingDirectory=/var/lib/etcd/\n" +
                "EnvironmentFile=-/etc/etcd/etcd.conf\n" +
                "ExecStart=/bin/bash -c \"GOMAXPROCS=$(nproc) /usr/bin/etcd \\\n" +
                "--name=\\\"${ETCD_NAME}\\\"\\\n" +
                "--data-dir=\\\"${ETCD_DATA_DIR}\\\" \\\n" +
                "--listen-peer-urls=\\\"${ETCD_LISTEN_PEER_URLS}\\\" \\\n" +
                "--listen-client-urls=\\\"${ETCD_LISTEN_CLIENT_URLS}\\\"\\\n" +
                "--advertise-client-urls=\\\"${ETCD_ADVERTISE_CLIENT_URLS}\\\"\\\n" +
                "--initial-cluster-token=\\\"${ETCD_INITIAL_CLUSTER_TOKEN}\\\"\\\n" +
                "--initial-cluster=\\\"${ETCD_INITIAL_CLUSTER}\\\" \\\n" +
                "--initial-cluster-state=\\\"${ETCD_INITIAL_CLUSTER_STATE}\\\"\"\n" +
                "[Install]\n" +
                "WantedBy=multi-user.target\n" +
                "```\n" +
                "\n" +
                "配置conf \n" +
                "\n" +
                " (以etcd01为例，其他节点注意对应地修改192.9.100.127 为对应节点IP，ETCD_NAME为对应节点etcd角色名)\n" +
                "\n" +
                "```\n" +
                "# mkdir /etc/etcd\n" +
                "# vim /etc/etcd/etcd.conf\n" +
                "```\n" +
                "\n" +
                "```\n" +
                "ETCD_NAME=etcd01\n" +
                "ETCD_DATA_DIR=\"/var/lib/etcd/data\"\n" +
                "ETCD_LISTEN_PEER_URLS=\"http://192.168.1.107:2380\"\n" +
                "ETCD_LISTEN_CLIENT_URLS=\"http://192.168.1.107:2379,http://127.0.0.1:2379\"\n" +
                "ETCD_INITIAL_ADVERTISE_PEER_URLS=\"http://192.168.1.107:2380\"\n" +
                "ETCD_INITIAL_CLUSTER=\"etcd01=http://192.168.1.104:2380,etcd02=http://192.168.1.106:2380,etcd03=http://192.168.1.107:2380\"\n" +
                "ETCD_INITIAL_CLUSTER_STATE=\"new\"\n" +
                "ETCD_INITIAL_CLUSTER_TOKEN=\"kube-etcd-cluster\"\n" +
                "ETCD_ADVERTISE_CLIENT_URLS=\"http://192.168.1.107:2379\"\n" +
                "```\n" +
                "\n" +
                "启动服务\n" +
                "\n" +
                "```\n" +
                "# mkdir -p /var/lib/etcd/data\n" +
                "# systemctl daemon-reload\n" +
                "# systemctl start etcd\n" +
                "# systemctl enable etcd\n" +
                "```\n" +
                "\n" +
                "验证\n" +
                "\n" +
                "```\n" +
                "# etcdctl cluster-health\n" +
                "bash: /usr/bin/etcdctl: 权限不够\n" +
                "```\n" +
                "\n" +
                "cluster may be unhealthy: failed to list members\n" +
                "Error:  client: etcd cluster is unavailable or misconfigured; error #0: dial tcp 127.0.0.1:2379: connect: connection refused\n" +
                "\n" +
                "检查\n" +
                "\n" +
                "```\n" +
                "systemctl status etcd.service\n" +
                "```\n" +
                "\n" +
                "Active: failed (Result: start-limit)\n" +
                "\n" +
                "```\n" +
                "chmod 755 etcd*\n" +
                "```\n" +
                "\n" +
                "重新执行 \n" +
                "\n" +
                "```\n" +
                "systemctl start etcd\n" +
                "etcdctl cluster-health\n" +
                "```\n" +
                "\n" +
                "member 320eb11a4720baba is healthy: got healthy result from http://192.168.1.104:2379\n" +
                "member d2cc3d65c2eda3e5 is healthy: got healthy result from http://192.168.1.107:2379\n" +
                "member e37e8afd5f99f6f9 is healthy: got healthy result from http://192.168.1.106:2379\n" +
                "cluster is healthy\n" +
                "\n" +
                "\n" +
                "\n" +
                "参看 ：https://blog.csdn.net/shida_csdn/article/details/78427434"}/>


            </div>



        );
    }
}

export default Kb_1;