---
sidebar_position: 3
---

# 质押和质押奖励

这是一个操作只能帮助您快速的成为 delegator,但是您需要确定您是否在 Treasurenet 主网上是否拥有代币 UNIT 和 TAT

### 访问仪表板

- 在钱包中(MetaMask)中选择 Treasurenet 主网。

![Staking_MetaMask](/img/docs/metamask.jpg)

- 访问[官网](https://124.70.23.119:3007/Stake/profile),选择合适的 Active Validator

![Staking_Active_Validator](/img/docs/Staking_Active_Validator.png)

### 委托给验证者

- 选择好合适的 Active Validator 后点击 stake 开始进行委托

![Staking_Stake](/img/docs/Staking_tanchuang.png)

:::note
点击 stake 后弹出弹框会发现详细信息
_ My Staked : 您委托的代币总量(在这个 Active Validator 中)
_ Stake Amount : 需要质押多少代币 \* Wallet Blance : 您自己账户下的代币总量
:::
:::caution
您质押的代币不能超过自己账户下的代币总量，也就是 Stake Amount 　<　 Wallet Blance。
:::

- 委托成功

![Staking_Successful](/img/docs/successful.png)

- 解除委托绑定

![unstake](/img/docs/unstake.png)

:::caution
解除委托绑定后，您在这个 Active Validator 中所分配到的区块奖励将自动给您发送到账户中。(在不解除绑定的情况下，奖励分配都是被动奖励分发，您可以参考[奖励分发机制](../../protocolDevelopers/modules/distribution.md))
:::

### 质押数据统计

- 查看具体的质押情况，可以查看自己总的 stake 情况和分配的奖励

![Stake_Profile](/img/docs/Stake_Profile.png)

:::note
_ Total Staked : 您所有 Active Validator 委托的代币总量
_ Total Rewards : 您分配到的所有奖励
:::

- 取回自己的区块奖励

在 Treasurenet 中采取了另外一种策略，我们称为被动奖励分发，即区块奖励不会主动转入目标账户，validator 运营方或者委托人想要提取奖励时，需要主动发起提现交易。

![Withdraw_Rewards](/img/docs/Withdraw_Rewards.png)

:::caution
这里需要注意的是，当我们链上某一个 validator 的权重发生改变的时候(重新委托或者撤回委托等操作)，区块奖励会自动的分发下去。
:::

:::info
🚧 Documentation is in progress.
:::
