import React, { Component } from 'react';
import Markdown  from 'react-markdown';




class Kb_3 extends Component {
    constructor(props) {
        super(props);
    }




    render() {

        return (
            <div>


                <Markdown source={"   选举投票可能会多次轮番上演，为了区分，所以需要定义你的投票是属于哪个轮次的。\n" +
                "\n" +
                "- Raft定义了term来表示选举轮次\n" +
                "- ZooKeeper定义了electionEpoch来表示\n" +
                "\n" +
                "他们都需要在某个轮次内达成过半投票来结束选举过程\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 事务ID\n" +
                "\n" +
                "在选举leader的时候，通常都希望 选举出来的leader至少包含之前全部已提交的日志.\n" +
                "\n" +
                "Raft和ZooKeeper都是采用事务越大的优先 ;\n" +
                "\n" +
                "ZooKeeper有2个轮次，一个是选举轮次electionEpoch，另一个是日志的轮次peerEpoch（日志轮次）。而Raft则是只有一个轮次，相当于日志轮次和选举轮次共用了。\n" +
                "\n" +
                "- Raft：term大的优先，然后log中的index大的优先\n" +
                "- ZooKeeper：peerEpoch大的优先，然后zxid大的优先, 最后是myid大的优先\n" +
                "\n" +
                "\n" +
                "\n" +
                "### leader选举的效率\n" +
                "\n" +
                "Raft中的每个server在某个term轮次内只能投一次票，**哪个candidate先请求投票谁就可能先获得投票**，这样就可能造成split vote，即各个candidate都没有收到过半的投票，Raft通过candidate设置不同的超时时间，来快速解决这个问题，使得先超时的candidate（在其他人还未超时时）优先请求来获得过半投票\n" +
                "\n" +
                " \n" +
                "\n" +
                "ZooKeeper中的每个server，在某个electionEpoch轮次内，可以投多次票，只要遇到更大的票就更新，然后分发新的投票给所有人。这种情况下不存在split vote现象，同时有利于选出含有更新更多的日志的server，但是选举时间理论上相对Raft要花费的多。\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 加入一个已经完成选举的集群\n" +
                "\n" +
                "- Raft：比较简单，该server启动后，会收到leader的AppendEntries RPC,这时就会从RPC中获取leader信息，识别到leader，即使该leader是一个老的leader，之后新leader仍然会发送AppendEntries RPC,这时就会接收到新的leader了（因为新leader的term比老leader的term大，所以会更新leader）\n" +
                "- ZooKeeper：该server启动后，会向所有的server发送投票通知，这时候就会收到处于LOOKING、FOLLOWING状态的server的投票（这种状态下的投票指向的leader），则该server放弃自己的投票，判断上述投票是否过半，过半则可以确认该投票的内容就是新的leader。\n" +
                "\n" +
                "\n" +
                "\n" +
                "### leader选举的触发\n" +
                "\n" +
                "触发一般有如下2个时机\n" +
                "\n" +
                " \n" +
                "\n" +
                "- server刚开始启动的时候，触发leader选举\n" +
                "- leader选举完成之后，检测到超时触发，谁来检测？\n" +
                "  - Raft：目前只是follower在检测。follower有一个选举时间，在该时间内如果未收到leader的心跳信息，则follower转变成candidate，自增term发起新一轮的投票，leader遇到新的term则自动转变成follower的状态\n" +
                "  - ZooKeeper：leader和follower都有各自的检测超时方式，leader是检测是否过半follower心跳回复了，follower检测leader是否发送心跳了。一旦leader检测失败，则leader进入LOOKING状态，其他follower过一段时间因收不到leader心跳也会进入LOOKING状态，从而出发新的leader选举。一旦follower检测失败了，则该follower进入LOOKING状态，此时leader和其他follower仍然保持良好，则该follower仍然是去学习上述leader的投票，而不是触发新一轮的leader选举\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 分区的应对\n" +
                "\n" +
                "ZooKeeper和Raft在一旦分区发生的情况下是是牺牲了高可用来保证一致性，即CAP理论中的CP。但是在没有分区发生的情况下既能保证高可用又能保证一致性，所以更想说的是所谓的CAP二者取其一，并不是说该系统一直保持CA或者CP或者AP，而是一个会变化的过程。在没有分区出现的情况下，既可以保证C又可以保证A，在分区出现的情况下，那就需要从C和A中选择一样。ZooKeeper和Raft则都是选择了C\n" +
                "\n" +
                " \n" +
                "\n" +
                "参考:http://m635674608.iteye.com/blog/2337085 "}/>

            </div>



        );
    }
}

export default Kb_3;