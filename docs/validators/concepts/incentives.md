---
sidebar_position: 1
---

# Incentives

为了激励参与共识的节点积极的参与投票，会将链上资产奖励给参与投票过程的参与方，参与方包括(委托人、活跃验证者、提案者)

Treasurenet会从validator列表中根据一定规则选出一位成为Proposer，负责出块。出块成功后给本次共识的所有参与者账户中转应得的区块奖励（Unit Token）。

共识奖励由每个区块的出块奖励和总交易费构成，我们把共识奖励按不同比例分为以下部分：社区治理、区块提议者奖励、validator额外奖励、POS奖励。

## 区块奖励的基本流程

distribution奖励分发过程:
* 在活跃验证者之间按照投票权重分发区块奖励。
* 从所有的区块奖励中按照参数CommunityTax(默认为2%)抽取固定比例作为社区税，存放在我们的社区池中，用于后面我们的社区建设，可以通过gov的方式来讲这部分token奖励给对社区做出过贡献的。
* 区块提案者获得当前奖励的固定比例(由参数BaseProposerReward默认为1%,TatReward默认为80%)。
* 根据区块中包含的投票信息，给区块提案者分配额外奖励。
  - 区块中包含的投票信息与参数BonusProposerReward(默认为4%)决定了额外奖励的比例。
  - 当所有活跃验证者都进行了投票并且所有投票都被打包进区块时区块提案者可以得到的额外奖励比例增大，比例由BonusProposerReward指定。
  - 当验证者有TAT进行了委托，提案者获取的额外奖励比例增大，比例为TatReward(默认为80%)。
* 扣除社区税、扣除区块提案者的基础奖励和额外奖励之后，剩余的区块奖励在所有的活跃验证者(包含区块提案者)之间按照投票权重进行分发。
* 验证者抽取整体收益的一定比例作为自己的佣金(commission)，这个比例由Validator中Commission指定。
* 扣除佣金之后的收益，按照抵押份额在验证者的委托人之间进行分发，验证者自抵押部分也在这一步中参与分成。

区块提案者的基础奖励比例固定，但额外奖励比例是浮动的，计算方式为:
```sh
BaseProposerReward + BonusProposerReward * (sumPrecommitPower / totalPower)
```
其中totalPower代表当前活跃验证者集合的投票权重之和，而sumPrecommitPower代表区块中所包含的投票权重之和。

活跃验证者的运营方可以获得的奖励包括自抵押收益和佣金收益，委托人可以获得的奖励只有抵押收益。委托人通过发送消息MsgWithdrawDelegatorReward可以取回自己抵押的链上资产所累积的收益(验证者的运营方也是通过发送该消息取回自抵押部分的收益),同时验证者运营方还可以通过发送消息MsgWithdrawValidatorCommission取回佣金收益。收益默认会转到最初发送委托操作的账户地址中,也可以重新设定接受收益的账户地址。

## 具体计算公式

共识奖励(S)= 区块奖励+总交易费；

社区治理池获得奖励(C) = S \* 1%；

区块提议者获得奖励(A)= S \* (1% + 签名率 \* 4%)

## Bonus Stake 获得额外奖励：

获得额外总奖励(T)= S \* 60% \* （复筛选出的超级验证者个数/ 活跃的验证者总数）；

每个validator获得的奖励 = 额外奖励T \*（本轮质押的TAT数量/本轮质押的总TAT数量）

## validator和delegator获得奖励：

总奖励(R)= S – A – C – T；

每个validator获得奖励 = validator总奖励R \* (该validator名下的质押UNIT数/所有validator名下的质押UNIT数之和)；

delegator获得奖励 = 质押的validator获得奖励 \*（该delegator质押的UNIT数量 / 该validator名下的质押UNIT数量 ）\*（1 - 1%（佣金率））
