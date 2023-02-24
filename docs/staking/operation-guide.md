---
sidebar_position: 3
---

## How to Delegate

这是一个操作只能帮助您快速的成为delegator,但是您需要确定您是否在TreasureNet主网上是否拥有代币UNIT和TAT

### Access the dashboard

  * 在钱包中(MetaMask)中选择Treasurenet主网。

  ![Staking_MetaMask](/img/docs/metamask.jpg)

  * 访问[官网](https://124.70.23.119:3007/Stake/profile),选择合适的Active Validator

  ![Staking_Active_Validator](/img/docs/Staking_Active_Validator.png)

### Delegate to a Validator

  * 选择好合适的Active Validator后点击stake开始进行委托

  ![Staking_Stake](/img/docs/Staking_tanchuang.png)

  :::note
    点击stake后弹出弹框会发现详细信息
      * My Staked : 您委托的代币总量(在这个Active Validator中)
      * Stake Amount : 需要质押多少代币
      * Wallet Blance : 您自己账户下的代币总量
  :::
  :::caution
    您质押的代币不能超过自己账户下的代币总量，也就是Stake Amount　<　Wallet Blance。
  :::

  * 委托成功

  ![Staking_Successful](/img/docs/successful.png)

  * 解除委托绑定

  ![unstake](/img/docs/unstake.png)

  :::caution
    解除委托绑定后，您在这个Active Validator中所分配到的区块奖励将自动给您发送到账户中。(在不解除绑定的情况下，奖励分配都是被动奖励分发，您可以参考[奖励分发机制](../protocolDevelopers/modules/distribution.md))
  :::

### Stake Statistics

  * 查看具体的质押情况，可以查看自己总的stake情况和分配的奖励
  
  ![Stake_Profile](/img/docs/Stake_Profile.png)

  :::note
      * Total Staked : 您所有Active Validator 委托的代币总量
      * Total Rewards : 您分配到的所有奖励
  :::

  * 取回自己的区块奖励

  在TreasureNet中采取了另外一种策略，我们称为被动奖励分发，即区块奖励不会主动转入目标账户，validator运营方或者委托人想要提取奖励时，需要主动发起提现交易。

  ![Withdraw_Rewards](/img/docs/Withdraw_Rewards.png)

  :::caution
    这里需要注意的是，当我们链上某一个validator的权重发生改变的时候(重新委托或者撤回委托等操作)，区块奖励会自动的分发下去。
  :::

:::info
  🚧 Documentation is in progress.
:::
