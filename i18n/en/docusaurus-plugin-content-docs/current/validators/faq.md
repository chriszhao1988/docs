---
sidebar_position: 7
---

# FAQ

## Introduce

### What is a validator?

TreasuerNet [基于Tendermint](https://docs.tendermint.com/main/introduction/what-is-tendermint.html)它依赖于一组负责在区块链中提交新块的验证器。这些验证者通过广播包含由每个验证者的私钥签名的加密签名的投票来参与共识协议。

验证者候选者可以绑定他们自己的 UNIT或者TAT，并让代币持有者将UNIT “委托”或质押给他们。TreasureNet 目前只允许100个validator参与共识，但随着时间的推移，可以通过治理提案增加验证器的数量。验证者由委托给他们的 UNIT代币总数和TAT一起决定([参见活跃验证者的选取规则](./faq.md))，投票权最高的前 100 名验证者候选人是当前的活跃验证者参与共识生成新的区块。

验证者及其委托人通过执行 Tendermint 共识协议赚取 Unit 作为区块条款和代币作为交易费用。请注意，验证者可以为其委托人收取的费用设置佣金百分比作为额外奖励。

如果验证者双重签名或长时间离线，他们质押的 UNIT（包括委托给他们的用户的 UNIT）可能会被罚没。处罚取决于违规的严重程度。

### Active Validator的选取规则

:::caution
  产品补充 更易懂的版本
:::

1. 每个节点要想成为Validator必须自抵押UNIT，且验证者的自我委托永远不能低于 min-self-delegation(最小自抵押,默认为158unit)。
2. 第一轮筛选满足min-self-delegation的validator，取权重最高的前400个validator进行选取。
   - 通过event监听bid操作，获取质押TAT的validator为list-supervalidator。
   - 第一步中没有质押TAT的validator称为list-validator。
3. 判断Active Validator(活跃验证者)的数量:
   - 如果list-supervalidator + list-validator >= 200,Active Validator的数量 num = 100。
   - 如果list-supervalidator + listvalidator < 200,Actibr Validator的数量 num = (list-supervalidator + listvalidator ) / 2。
4. 第二轮筛选
   - 当list-supervalidator < 100, 且listvalidator > 100, All-list-super = list-supervalidator (选取全部的list-supervalidator作为参考值), num-validator = 2 * num - num(All-list-super), 从list-validator中选取权重前num-validator，组成新的All-list-validator。
   - 当list-supervalidator >= 100 且 list-validator >= 100, 从list-supervalidator中选取前100组成新的All-list-super, 从list-validator中选取权重前100，组成新的All-list-validator。
   - list-supervalidator < 100 且 list-validator < 100, All-list-super = list-supervalidator, All-list-validator = list-validator。
   - 当list-supervalidator > 100, 且listvalidator < 100, All-list-validator = list-validator (选取全部的list-validator作为参考值), num-super = 2 * num - num(All-list-validator), 从list-supervalidator中选取权重前num-super，组成新的All-list-super。
5. 第三轮筛选，组成新的Active Validator进行接下来的pos运算
   - 将All-list-super和All-list-validator组成新的列表list，然后随机选取其中的num作为Active Validator

### What is "staking"?

TreasureNet is a public Proof-of-Stake (PoS) blockchain, meaning that validator's weight is determined by the amount of staking tokens (UNIT) bonded as collateral. These staking tokens can be staked directly by the validator or delegated to them by UNIT holders.

Any user in the system can declare its intention to become a validator by sending a [create-validator](./faq.md) transaction. From there, they become validators.

验证者的权重（即总权益或投票权）决定了它是否是一个活跃的验证者，也决定了该节点提出区块的频率以及它将获得多少收益。根据active Validator选取规则选出合适的validator作为活跃验证者。如果验证者双重签名或经常离线，他们将冒着被抵押的代币（包括用户委托的 UNIT）被协议“罚没”的风险，以惩罚疏忽和不当行为。

### What is a full node?
A full node is a program that fully validates transactions and blocks of a blockchain. It is distinct from a light client node that only processes block headers and a small subset of transactions. Running a full node requires more resources than a light client but is necessary in order to be a validator. In practice, running a full-node only implies running a non-compromised and up-to-date version of the software with low network latency and without downtime.

Of course, it is possible and encouraged for any user to run full nodes even if they do not plan to be validators.

### What is a delegator?

不能或不想操作验证节点的人仍然可以作为委托人参与质押过程。事实上，验证者的选择不是基于他们自己委托的股份，而是基于他们的总股份，即他们自己委托的股份和委托给他们的股份的总和。这是一个重要的属性，因为它使委托人可以防止验证者表现出不良行为。如果验证者行为不端，他们的委托人会将他们的 UNIT 移离他们，从而减少他们的股份。最终，通过[Active Validator的选取规则](./faq.md)，他们将退出验证者集。

**委托人分享他们验证者的收入，但他们也分担风险。** 在收入方面，验证人和委托人的不同之处在于，验证人可以对分配给委托人的收入收取佣金。该佣金事先为委托人所知，并且只能根据预定义的约束进行更改([请参阅staking](../protocolDevelopers/modules/staking.md))。就风险而言，如果验证者行为不当，委托人的 UNIT 可能会被削减。有关更多信息，请参阅[slashing](../protocolDevelopers/modules/slashing.md)。

要成为委托人，UNIT 持有者需要发送一个“委托交易”，在其中指定他们想要绑定多少个 UNIT 以及与哪个验证者绑定。候选验证者列表将显示在 TreasutreNet 浏览器中。之后，如果委托人想要解绑部分或全部股份，他们需要发送“解绑交易”。从那里开始，委托人将不得不等待 3 周才能取回他们的 UNIT。委托人还可以发送“重新绑定交易”以从一个验证器切换到另一个验证器，而无需经过 3 周的等待期([请参阅重新委托和解除绑定](../protocolDevelopers/modules/staking.md))。


### Validator states

Treasurenetd中的Validator可以有三种状态Unbonded、Unbonding和Bonded。
通过Msg-CreateValidator消息创建的新验证者被初始化成Unbonded状态，并被设置份额以及投票权重。staking模块的EndBlocker()会统计本区块验证者状态的变化

* 新创建的Validator的投票权重排名进入前100名:状态从Unbonded变成Bonded。
* 新创建的Validator的投票权重排名没有进入前100名:Unbonded状态维持不变。
* 投票权重增加且投票权重排名进入前100名时的状态切换
  - Unbonded --> Bonded: 初次成为活跃验证者。
  - Unbonding --> Bonded: 再次成为活跃验证者。
  - Bonded维持不变: 已经是活跃验证者

### What does staking imply?
Staking UNIT can be thought of as a safety deposit on validation activities. When a validator or a delegator wants to retrieve part or all of their deposit, they send an unbonding transaction. Then, the deposit undergoes a two week unbonding period during which they are liable to being slashed for potential misbehaviors committed by the validator before the unbonding process started.

Validators, and by association delegators, receive block provisions, block rewards, and fee rewards. If a validator misbehaves, a certain portion of its total stake is slashed (the severity of the penalty depends on the type of misbehavior). This means that every user that bonded UNIT to this validator gets penalized in proportion to its stake. Delegators are therefore incentivized to delegate to validators that they anticipate will function safely.

### Incentives
#### What is the incentive to stake?
区块奖励由两部分构成，验证者权益池中每个成员都会获得不同类型的收入:

   * Block rewards: 链上资产铸造生成新的区块奖励，为了激励公司投票过程的参与方，将链上资产奖励给公司投票的过程参与方。
   * Transaction fees: TreasureNet链上发生交易所产生的交易费用

最新铸造的链上资产与收集到的交易费用合并在一起，就得到了当前区块奖励，然后根据每个验证在的权重分配给验证者的权益池，然后在每个验证者的权益池中，按照每个委托人的股份比例分配给委托人。

#### What is the incentive to run a validator ?
Validators earn proportionally more revenue than their delegators because of commissions.

Validators also play a major role in governance. If a delegator does not vote, they inherit the vote from their validator. This gives validators a major responsibility in the ecosystem.

#### What is a validator's commission?
Revenue received by a validator's pool is split between the validator and its delegators. The validator can apply a commission on the part of the revenue that goes to its delegators. This commission is set as a percentage. Each validator is free to set its initial commission, maximum daily commission change rate and maximum commission. TreasureNet enforces the parameter that each validator sets. These parameters can only be defined when initially declaring candidacy, and may only be constrained further after being declared.

#### How are block provisions distributed?

[参阅distribution模块中关于奖励分配的介绍](../protocolDevelopers/modules/distribution.md)
