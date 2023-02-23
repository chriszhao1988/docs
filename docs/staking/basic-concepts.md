---
sidebar_position: 1
---
# Basic Concepts

## Earn rewards while securing TreasureNet

加密货币投资者希望获得质押奖励，但是不想经历配置验证节点的麻烦，或者没有足够的加密货币来满足成为验证节点的最低要求，就需要用到委托，将UNIT委托给其他validator，该validator会收取少量的费用用作佣金(commission)。

同事validator也可以通过自抵押获取质押奖励

Staking 是TreasureNet ecosystem的其中一环，任何拥有任何数量UNIT token的用户都可以帮助保护网络并在此过程中获得奖励，这些用户被成为staker。

:::caution
  Staked UNIT 永远不会离开您 。 即使不能自由交易，抵押的UNIT也永远不会为Validator所有。
:::

## POS机制概述

TreasureNet是基于Tendermint Core 和Cosmos-SDK构建的基于POS机制的BFT共识协议的公链。

在TreasureNet中允许任何实体通过抵押链上资产成为验证者，但并不是所有的验证者都有资格参与共识投票。为了保证共识效率，TreasureNet对可以参与共识投票的验证者集合做了限制，具体规则可以参考[Active Validator的选取规则](../validators/faq.md)

运营验证者节点需要一定的技术门槛，并不是所有的人都有能力独立运营验证者节点，但是为了促使尽可能多的流通中的链上资产参与共识投票，TreasureNet允许任意实体将自己持有的链上资产委托(delegate)给某个活多个验证者，由该验证者代自己参与共识投票。

然后按照抵押的链上资产数量评选活跃验证者，链上资产数量统计的是自己抵押的链上资产数和被委托的链上资产数的总和。

链上资产持有人可以根据验证者的表现来决定是否将自己委托给某一验证者的链上资产重新委托(redelegate)给另一个更具竞争力的验证者，或者可以直接撤回委托。

TreasureNet构建了奖励机制，通过区块奖励和交易费一起作为奖励总和来奖励参与共识投票的活跃验证者，这样可以激励社区中所有持币方尽可能多的将自己持有的链上资产投入抵押(通过自抵押成为验证者或者将自己链上资产委托给链上已经存在的验证者)。

TreasureNet同时也构建了惩罚机制，对违反共识规则或者节点不稳定的验证者进行处罚，活跃验证者参与共识投票过程的权利，来自其抵押的链上资产和网络中其他实体委托的链上资产，因此验证者的奖励和惩罚由这两方面的实体共同承担。

分配奖励时，活跃验证者的运营方可以抽取其代理的链上资产的部分收益作为佣金(commission),以奖励其为节点稳定运行所付出的努力。通过这种共同受益和共同担责的机制设计，才能让验证者运营方有意愿维持验证者节点的安全、稳定、高效的运行，用来吸引更多链上资产持有方。

## What is stake?

Stake 是 depositing 158 UNIT token 来activate自己的validator node的过程，作为一个validator，您将负责存储数据，处理交易以及向区块链添加新区块。这将为每个人确保TreasureNet的安全，并在此过程中为您赢得新的UNIT Token。

## Why stake your Unit?

- #### Earn rewards
  - 对帮助网络达成共识的行动给予奖励。您将因运行将交易正确分批放入新区块并检查其他验证器的工作中获得奖励，因为这是保持区块链安全运行的原因。
- #### Better security
  - 随着更多的UNIT token被质押，网络对供给的抵抗力变得更强，因为他需要更多的UNIT来控制大部分网络。要成为有效的安全威胁，意味着您需要控制系统中的大部分UNIT token。


## Community Resources

- Provide links to community resources, such as forums, chat groups, and other support channels, to assist users with any questions or issues they may encounter while staking.
