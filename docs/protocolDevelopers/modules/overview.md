# Modules

# Overview

TreasureNet链利用Cosmos SDK和底层的Tendermint核心共识引擎。具体来说，Cosmos SDK 是一个框架，可促进在 Tendermint 之上开发安全状态机。

在本文档中，我们将重点介绍我们使用的一些重要模块，例如：

Auth - 为应用程序验证账户和交易，并负责指定基本交易和账户类型;

Authz - 促进授予一个帐户代表另一个帐户执行操作的授权；

Bank - 代币转账功能和所有资产总供应量的查询支持；

Distribution - 费用分配，并向验证者和委托人提供奖励；

Gov - 链上提案和投票；

Mint - 创建新的质押代币单位；

Slashing - 验证者惩罚机制；

Staking - 公共区块链的权益证明层；

Upgrade - 有助于将TreasureNet链顺利升级到新的软件版本。
