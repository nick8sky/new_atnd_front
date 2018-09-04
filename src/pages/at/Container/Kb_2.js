import React, { Component } from 'react';
import Markdown  from 'react-markdown';




class Kb_2 extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <Markdown source={" ### 1.CAP原理\n" +
                "\n" +
                "- 要想数据高可用，就得写多份数据\n" +
                "- 写多分数据就会导致数据一致性问题\n" +
                "- 数据一致性问题会引起性能问题\n" +
                "\n" +
                "### 2.一致性模型\n" +
                "\n" +
                "1. 弱一致性\n" +
                "2. 最终一致性（一段时间达到一致性）\n" +
                "3. 强一致\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 3.  扩展服务的方案\n" +
                "\n" +
                "- 数据分区： uid % node_size\n" +
                "- 数据热备：让多有的服务器都有相同的数据，提供相当的服务\n" +
                "\n" +
                "\n" +
                "\n" +
                "## 解决一致性事务问题的技术\n" +
                "\n" +
                "### 1. Master -Slave\n" +
                "\n" +
                "- 读写请求由Master负责\n" +
                "- 写请求写到Master后，由Master同步到Slave上\n" +
                "  - 由Master push or Slave pull\n" +
                "  - 通常是由Slave 周期性来pull，所以是最终一致性\n" +
                "\n" +
                "问题： 若在 pull 周期内（不是期间？），master挂掉，那么会导致这个时间片内的数据丢失\n" +
                "\n" +
                "- 若不想让数据丢掉，Slave 只能成为 ReadOnly方式等Master恢复\n" +
                "- 若容忍数据丢失，可以让 Slave代替Master工作\n" +
                "\n" +
                "如何保证强一致性？\n" +
                "\n" +
                "- Master 写操作，写完成功后，再写 Slave，两者成功后返回成功。若 Slave失败，两种方法\n" +
                "  1. 标记 Slave 不可用报错，并继续服务（等恢复后，再同步Master的数据，多个Slave少了一个而已）\n" +
                "  2. 回滚自己并返回失败\n" +
                "\n" +
                "### 2. Master-Master\n" +
                "\n" +
                "- 数据一般通过 Master 间的异步完成，所以是最终一致\n" +
                "- 好处： 一台Master挂掉，另外一台照样可以提供读写服务。但当数据没有\"同步\"到另外一台的Master上时，数据会丢失。\n" +
                "- 对同一数据的处理问题：记录数据的版本号和修改者，当数据发生冲突时，一般取最大版本号\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 3.两阶段提交 \n" +
                "\n" +
                "1 .第一阶段：针对准备工作\n" +
                "\n" +
                "- 参与者开始事务，执行准备工作：锁定资源（获取锁操作）\n" +
                "- 协调者询问所有节点是否可以执行提交\n" +
                "- 参与者响应协调者，如果事务的准备工作成功，则回应\"可以提交\"，否则，拒绝提交\n" +
                "\n" +
                "2 .第二阶段：\n" +
                "\n" +
                "- 若都响应可以提交，则协调者向所有参与者发送正式提交的命令（更新值），参与者完成正式提交，释放资源，回应完成。协调者收到所有节点的完成响应后结束这个全局事务.。若参与者回应拒绝提交，则协调者向所有的参与者发送回滚操作，并释放资源，当收到全部节点的回滚回应后，取消全局事务\n" +
                "\n" +
                "3 .存在的问题：若一个没提交，就会进行回滚\n" +
                "\n" +
                "- 第一阶段：若消息的传递未接收到，则需要协调者作超时处理，要么当做失败，要么重载\n" +
                "- 第二阶段：若参与者的回应超时，要么重试，要么把那个参与者即为问题节点，提出整个集群\n" +
                "- 在第二阶段中，参与者未收到协调者的指示（也许协调者挂掉），则所有参与者会进入“不知所措” 的状态（但是已经锁定了资源），所以引入了三段提交\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 4. 三段提交：把3中的第一阶段 分成了两段\n" +
                "\n" +
                "1. 询问\n" +
                "2. 锁定资源（获取锁）\n" +
                "3. 提交\n" +
                "\n" +
                "- 核心理念：在询问的时候并不锁定资源，除非所有人都同意了，才开始锁定\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 5. Raxos 算法\n" +
                "（少数服从多数）\n" +
                "\n" +
                "- 解决的问题：在一个可能发生异常的分布式系统中如何就某个值达成一致，让整个集群的节点对某个值的变更达成一致。\n" +
                "- 任何一个节点都可以提出要修改某个数据的提案,是否通过这个提案取决于这个集群中是否有超过半数的节点同意。\n" +
                "- 当一个Server接收到比当前版本号小的提案时，则拒绝。当收到比当前大的版本号的提案时，则锁定资源，进行修改，返回OK.   也就是说收到超过一半的最大版本的提案才算成功。\n" +
                "\n" +
                "**核心思想**：\n" +
                "\n" +
                "1. 在抢占式访问权的基础上引入多个acceptor，也就是说当一个版本号更大的提案可以剥夺较小版本号已经获取的锁。\n" +
                "2. 后者认同前者的原则：\n" +
                "   - 在肯定旧epoch 无法生成确定性取值时，新的 epoch 会提交自己的value\n" +
                "   - 一旦 旧epoch形成确定性取值，新的 epoch肯定可以获取到此取值，并且会认同此取值，不会被破坏。\n" +
                "\n" +
                "翻译\n" +
                "  epoch  时代\n" +
                "\n" +
                "### 6.ZAB 协议 \n" +
                "( Zookeeper Atomic  Broadcast) 原子广播协议：保证了发给各副本的消息顺序相同\n" +
                "\n" +
                "**定义**：原子广播协议 ZAB 是一致性协议，Zookeeper 把其作为数据一致性的算法。ZAB 是在 Paxos 算法基础上进行扩展而来的。Zookeeper 使用单一主进程 Leader用于处理客户端所有事务请求，采用 ZAB 协议将服务器状态以事务形式广播到所有 Follower 上，由于事务间可能存在着依赖关系，ZAB协议保证 Leader 广播的变更序列被顺序的处理，一个状态被处理那么它所依赖的状态也已经提前被处理\n" +
                "\n" +
                "**核心思想**：保证任意时刻只有一个节点是Leader，所有更新事务由Leader发起去更新所有副本 Follower，更新时用的是 **两段提交协议**，只要多数节点 prepare 成功，就通知他们commit。各个follower 要按当初 leader 让他们 prepare 的顺序来 apply 事务\n" +
                "\n" +
                "\n" +
                "**协议状态**\n" +
                "\n" +
                "1. Looking:系统刚启动时 或者 Leader 崩溃后正处于选举状态\n" +
                "2. Following：Follower 节点所处的状态，Follower与 Leader处于数据同步状态\n" +
                "3. Leading：Leader 所处状态，当前集群中有一个 Leader 为主进程\n" +
                "\n" +
                "- ZooKeeper启动时所有节点初始状态为Looking，这时集群会尝试选举出一个Leader节点，选举出的Leader节点切换为Leading状态；当节点发现集群中已经选举出Leader则该节点会切换到Following状态，然后和Leader节点保持同步；当Follower节点与Leader失去联系时Follower节点则会切换到Looking状态，开始新一轮选举；在ZooKeeper的整个生命周期中每个节点都会在Looking、Following、Leading状态间不断转换\n"}/>
                <p><img src={require('../../imgs/kbs/20161020111750616.png' )}/></p>

                <Markdown source={"选举出Leader节点后 ZAB 进入原子广播阶段，这时Leader为和自己同步每个节点 Follower 创建一个操作序列，一个时期一个 Follower 只能和一个Leader保持同步\n" +
                "\n" +
                "\n" +
                "**阶段**\n" +
                "\n" +
                "1. Election： 在 Looking状态中选举出 Leader节点，Leader的LastZXID总是最新的（只有lastZXID的节点才有资格成为Leade,这种情况下选举出来的Leader总有最新的事务日志）。在选举的过程中会对每个Follower节点的ZXID进行对比只有highestZXID的Follower才可能当选Leader\n" +
                "当Zookeeper集群中的一台服务器出现以下两种情况之一时，需要进入Leader选举。\n" +
                "\n" +
                "　　(1) 服务器初始化启动。\n" +
                "\n" +
                "　　(2) 服务器运行期间无法和Leader保持连接。\n" +
                "\n" +
                "\n" +
                "\n" +
                "1. 服务器启动时期的Leader选举\n" +
                "\n" +
                "　　若进行Leader选举，则至少需要两台机器，这里选取3台机器组成的服务器集群为例。在集群初始化阶段，当有一台服务器Server1启动时，其单独无法进行和完成Leader选举，当第二台服务器Server2启动时，此时两台机器可以相互通信，每台机器都试图找到Leader，于是进入Leader选举过程。选举过程如下：\n" +
                "\n" +
                "　　**(1) 每个Server发出一个投票**。由于是初始情况，Server1和Server2都会将自己作为Leader服务器来进行投票，每次投票会包含所推举的服务器的myid和ZXID，使用(myid, ZXID)来表示，此时Server1的投票为(1, 0)，Server2的投票为(2, 0)，然后各自将这个投票发给集群中其他机器。\n" +
                "\n" +
                "　　**(2) 接受来自各个服务器的投票**。集群的每个服务器收到投票后，首先判断该投票的有效性，如检查是否是本轮投票、是否来自LOOKING状态的服务器。\n" +
                "\n" +
                "　　**(3) 处理投票**。针对每一个投票，服务器都需要将别人的投票和自己的投票进行PK，PK规则如下\n" +
                "\n" +
                "　　　　**· 优先检查ZXID**。ZXID比较大的服务器优先作为Leader。\n" +
                "\n" +
                "　　　　**· 如果ZXID相同，那么就比较myid**。myid较大的服务器作为Leader服务器。\n" +
                "\n" +
                "　　对于Server1而言，它的投票是(1, 0)，接收Server2的投票为(2, 0)，首先会比较两者的ZXID，均为0，再比较myid，此时Server2的myid最大，于是更新自己的投票为(2, 0)，然后重新投票，对于Server2而言，其无须更新自己的投票，只是再次向集群中所有机器发出上一次投票信息即可。\n" +
                "\n" +
                "　　**(4) 统计投票**。每次投票后，服务器都会统计投票信息，判断是否已经有过半机器接受到相同的投票信息，对于Server1、Server2而言，都统计出集群中已经有两台机器接受了(2, 0)的投票信息，此时便认为已经选出了Leader。\n" +
                "\n" +
                "　　**(5) 改变服务器状态**。一旦确定了Leader，每个服务器就会更新自己的状态，如果是Follower，那么就变更为FOLLOWING，如果是Leader，就变更为LEADING。\n" +
                "\n" +
                "\n" +
                "\n" +
                "2. 服务器运行时期的Leader选举\n" +
                "\n" +
                "　　在Zookeeper运行期间，Leader与非Leader服务器各司其职，即便当有非Leader服务器宕机或新加入，此时也不会影响Leader，但是一旦Leader服务器挂了，那么整个集群将暂停对外服务，进入新一轮Leader选举，其过程和启动时期的Leader选举过程基本一致。假设正在运行的有Server1、Server2、Server3三台服务器，当前Leader是Server2，若某一时刻Leader挂了，此时便开始Leader选举。选举过程如下\n" +
                "\n" +
                "　　(1) **变更状态**。Leader挂后，余下的非Observer服务器都会讲自己的服务器状态变更为LOOKING，然后开始进入Leader选举过程。\n" +
                "\n" +
                "　　(2) **每个Server会发出一个投票**。在运行期间，每个服务器上的ZXID可能不同，此时假定Server1的ZXID为123，Server3的ZXID为122；在第一轮投票中，Server1和Server3都会投自己，产生投票(1, 123)，(3, 122)，然后各自将投票发送给集群中所有机器。\n" +
                "\n" +
                "　　(3) **接收来自各个服务器的投票**。与启动时过程相同。\n" +
                "\n" +
                "　　(4) **处理投票**。与启动时过程相同，此时，Server1将会成为Leader。\n" +
                "\n" +
                "　　(5) **统计投票**。与启动时过程相同。\n" +
                "\n" +
                "　　(6) **改变服务器的状态**。与启动时过程相同。\n" +
                "\n" +
                "参考 : https://blog.csdn.net/gaoshan12345678910/article/details/67638657\n" +
                "\n"+
                "2. Discovery:Follower 节点向准 Leader推送 FollwerInfo,该信息包含了上一周期的epoch，接受准 Leader 的 NEWLEADER 指令\n" +
                "\n" +
                "3. Sync：将 Follower 与 Leader的数据进行同步，由Leader发起同步指令，最终保持数据的一致性\n" +
                "\n" +
                "4. Broadcast：Leader广播 Proposal 与 Commit，Follower 接受 Proposal 与 commit。因为一个时刻只有一个Leader节点，若是更新请求，只能由Leader节点执行（若写连到的是 Follower 节点，则需转发到Leader节点执行；读请求可以从Follower 上读取）\n" +
                "\n" +
                "   - 消息广播使用了TCP协议进行通讯所有保证了接受和发送事务的顺序性。广播消息时Leader节点为每个事务Proposal分配一个全局递增的ZXID（事务ID），每个事务Proposal都按照ZXID顺序来处理（Paxos 保证不了）\n" +
                "\n" +
                "   - Leader节点为每一个Follower节点分配一个队列按事务ZXID顺序放入到队列中，且根据队列的规则FIFO来进行事务的发送。\n" +
                "\n" +
                "     \n" +
                "\n" +
                "5. Recovery ：根据Leader的事务日志对Follower 节点数据进行同步更新\n" +
                "\n" +
                "   - 同步策略：\n" +
                "     1. **SNAP(全量)** ：如果Follower数据太老，Leader将发送快照SNAP指令给Follower同步数据；\n" +
                "     2. **DIFF(增量)** ：Leader发送从Follolwer.lastZXID到Leader.lastZXID议案的DIFF指令给Follower同步数据；\n" +
                "     3. **TRUNC(删除)** ：当Follower.lastZXID比Leader.lastZXID大时，Leader发送从Leader.lastZXID到Follower.lastZXID的TRUNC指令让Follower丢弃该段数据；（当老Leader在Commit前挂掉，但是已提交到本地）\n" +
                "   - Follower将所有事务都同步完成后Leader会把该节点添加到可用Follower列表中；\n" +
                "   - Follower接收Leader的NEWLEADER指令，如果该指令中epoch比当前Follower的epoch小那么Follower转到Election阶段\n" +
                "\n" +
                "翻译\n" +
                "  Recovery  复苏\n" +
                "\n" +
                "\n" +
                "\n" +
                "### 7. Raft 算法\n" +
                "\n" +
                "- Raft 算法也是一种少数服从多数的算法，在任何时候一个服务器可以扮演以下角色之一：\n" +
                "  1. Leader：负责 Client 交互 和 log 复制，同一时刻系统中最多存在一个\n" +
                "  2. Follower：被动响应请求 RPC，从不主动发起请求 RPC\n" +
                "  3. Candidate : 由Follower 向Leader转换的中间状态\n" +
                "- 在选举Leader的过程中，是有时间限制的，raft 将时间分为一个个 Term，可以认为是“逻辑时间”：\n" +
                "  1. 每个 Term中至多存在1个 Leader\n" +
                "  2. 某些 Term由于得到多个票数一样多的vote，就会选举失败。则会出现 Split Vote  ，再由候选者发出邀票\n" +
                "  3. 每个 Server 本地维护 currentTerm\n" +
                "\n"}/>
                <p><img src={require('../../imgs/kbs/20161020111805342.png' )}/></p>

                <Markdown source={"- 选举过程：\n" +
                "\n" +
                "  Raft协议在选举阶段交互的RPC有两类：RequestVote和AppendEntries。\n" +
                "\n" +
                "  - RequestVote是用来向其他节点发送竞选投票。\n" +
                "  - AppendEntries是当该节点得到更多的选票后，成为Leader，向其他节点确认消息。\n" +
                "\n" +
                "  Raft采用心跳机制触发Leader选举。系统启动后，全部节点初始化为Follower，term为0.节点如果收到了RequestVote或者AppendEntries，就会保持自己的Follower身份。如果一段时间内没收到AppendEntries消息直到选举超时，说明在该节点的超时时间内还没发现Leader，Follower就会转换成Candidate，自己开始竞选Leader。一旦转化为Candidate，该节点立即开始下面几件事情：\n" +
                "\n" +
                "  - 1、增加自己的term。\n" +
                "\n" +
                "  - 2、启动一个新的定时器。\n" +
                "\n" +
                "  - 3、给自己投一票。\n" +
                "\n" +
                "  - 4、向所有其他节点发送RequestVote，并等待其他节点的回复。\n" +
                "\n" +
                "如果在这过程中收到了其他节点发送的AppendEntries，就说明已经有Leader产生，自己就转换成Follower，选举结束。\n" +
                "\n" +
                "如果在计时器超时前，节点收到多数节点的同意投票，就转换成Leader。同时向所有其他节点发送AppendEntries，告知自己成为了Leader。\n" +
                "\n" +
                "每个节点在一个term内只能投一票，采取先到先得的策略，Candidate前面说到已经投给了自己，**Follower会投给第一个收到RequestVote的节点**。每个Follower有一个计时器，在计时器超时时仍然没有接受到来自Leader的心跳RPC, 则自己转换为Candidate, 开始请求投票，就是上面的的竞选Leader步骤。\n" +
                "\n" +
                "如果多个Candidate发起投票，每个Candidate都没拿到多数的投票（Split Vote），那么就会等到计时器超时后重新成为Candidate，重复前面竞选Leader步骤。\n" +
                "\n" +
                "Raft协议的定时器采取随机超时时间，这是选举Leader的关键。每个节点定时器的超时时间随机设置，随机选取配置时间的1倍到2倍之间。由于随机配置，所以各个Follower同时转成Candidate的时间一般不一样，在同一个term内，先转为Candidate的节点会先发起投票，从而获得多数票。多个节点同时转换为Candidate的可能性很小。即使几个Candidate同时发起投票，在该term内有几个节点获得一样高的票数，只是这个term无法选出Leader。由于各个节点定时器的超时时间随机生成，那么最先进入下一个term的节点，将更有机会成为Leader。连续多次发生在一个term内节点获得一样高票数在理论上几率很小，实际上可以认为完全不可能发生。一般1-2个term类，Leader就会被选出来。 \n" +
                "\n" +
                "  \n" +
                "- 日志更新问题：\n" +
                "\n" +
                "  如果在日志复制过程中，发生了网络分区或者网络通信故障，使得Leader不能访问大多数Follwers了，那么Leader只能正常更新它能访问的那些Follower服务器，而大多数的服务器Follower因为没有了Leader，他们重新选举一个候选者作为Leader，然后这个Leader作为代表于外界打交道，如果外界要求其添加新的日志，这个新的Leader就按上述步骤通知大多数Followers，如果这时网络故障修复了，那么原先的Leader就变成Follower，在失联阶段这个老Leader的任何更新都不能算commit，都回滚，接受新的Leader的新的更新。\n" +
                "\n" +
                "- 流程：\n" +
                "  1. Client 发送command 命令给 Leader\n" +
                "  2. Leader追加日志项，等待 commit 更新本地状态机，最终响应 Client\n" +
                "  3. 若 Client超时，则不断重试，直到收到响应为止（重发 command，可能被执行多次，在被执行但是由于网络通信问题未收到响应）\n" +
                "     - 解决办法：Client 赋予每个 Command唯一标识，Leader在接收 command 之前首先检查本地log "}/>

            </div>
        );
    }
}

export default Kb_2;