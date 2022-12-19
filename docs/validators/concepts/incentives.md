---
sidebar_position: 1
---

# Incentives


Treasurenet会从validator列表中根据一定规则选出一位成为Proposer，负责出块。出块成功后给本次共识的所有参与者账户中转应得的区块奖励（Unit Token）。

共识奖励由每个区块的出块奖励和总交易费构成，我们把共识奖励按不同比例分为以下部分：社区治理、区块提议者奖励、validator额外奖励、POS奖励。

## 具体计算公式

共识奖励(S)= 区块奖励+总交易费；

社区治理池获得奖励(C) = S \* 1%；

区块提议者获得奖励(A)= S \* (1% + 签名率 \* 4%)

## Bonus Stake 获得额外奖励：

获得额外总奖励(T)= S \* 80% \* （复筛选出的超级验证者个数/ 活跃的验证者总数）；

每个validator获得的奖励 = 额外奖励T \*（本轮质押的TAT数量/本轮质押的总TAT数量）

## validator和delegator获得奖励：

总奖励(R)= S – A – C – T；

每个validator获得奖励 = validator总奖励R \* (该validator名下的质押UNIT数/所有validator名下的质押UNIT数之和)；

delegator获得奖励 = 质押的validator获得奖励 \*（该delegator质押的UNIT数量 / 该validator名下的质押UNIT数量 ）\*（1 - 1%（佣金率））
