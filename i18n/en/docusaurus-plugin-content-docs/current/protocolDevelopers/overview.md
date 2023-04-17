---
sidebar_position: 1
---

# Introduction

## Consensus Mechanism

Treasurenet 是一个高度可扩展、高吞吐量的区块链，运行在权益证明 (PoS) 共识机制上，并在 Tendermint 核心拜占庭容错共识方法之上使用 Cosmos 软件开发工具包 (SDK) 构建。

虽然工作证明（PoW）被成功的应用于BTC区块链网络之中，但创建PoS是为了作为一种强大的替代方案。行业参与者提出，比特币使用的巨量能源对世界的电力系统造成的压力。这使得PoW的能源成本难以接受，以至于矿工需要衡量他们的收益与能源消耗之间的平衡。

PoW要求所有的节点消耗大量的算力来争夺记账权，但在每一轮共识中，只有一个节点的工作量有效，意味着有大量的资源被浪费，因此，权益证明机制Proof of Stake（PoS）在2013年被提出，目的是解决资源浪费的问题。

在PoS共识中，节点争夺记账权依靠的不是算力而是权益（代币）。PoS同样需要计算哈希值，但与PoW不同的是，不需要持续暴力计算寻找nonce值，每个节点在每一轮共识中只需要计算一次Hash，当拥有的权益越多，满足Hash目标的机会越大，获得记账权的机会越大。可以说，PoS是一个资源节省的共识协议。



## Transactions and Blocks

交易是指由账户发起的改变区块链状态的行为。为了有效地执行状态更改，每笔交易都会广播到整个网络。任何节点都可以广播请求在区块链状态机上执行的交易；发生这种情况后，验证器将验证、执行交易并将产生的状态更改传播到网络的其余部分。

详情可以参考[这里](./concepts/transactions.md)



## Smart Contracts

自 2015 年以太坊问世以来，通过智能合约控制数字资产的能力 吸引了大量开发者社区在以太坊虚拟机 (EVM) 上构建去中心化应用程序。该社区不断创建广泛的工具并引入标准，这进一步提高了 EVM 兼容技术的采用率。

无论您是在 Treasurenet 上构建新的用例，还是从另一个基于 EVM 的链（例如以太坊）移植现有的 dApp，您都可以轻松地在 Treasurenet 上构建和部署 EVM 智能合约，以实现您的 dApp 的核心业务逻辑。Treasurenet 与 EVM 完全兼容，因此它允许您使用 EVM 上可用的相同工具（Solidity、Remix、Oracles 等）和 API（即以太坊 JSON-RPC）。


## Upgrades and Governance:

### Guiding Principles and Values

#### 1. Progressive Decentralization：

TreasureNet网络皆在网络验证以及治理和财务方面尽可能的去中心化。虽然网络弹性和权力下放至关重要，但我们认识到有必要继续进行战略和基于科学的规划，社区将采取渐进式权力下放的立场。

#### 2. User-Centrism：

TreasureNet Blockchain Network 致力于在 Cosmos 生态系统中提供独特且优秀的 EVM 体验。因此，我们必须继续优化 
  1. user adoption 
  2. 有助于稳定增长的品质：
      - 网络流动性
      - 用户体验的改善
      - 数据主权
      - 区块的稳定生产
      - 教育资源
      - 强有力的治理等。

#### 3. Consensusual Collaboration

虽然 Cosmos SDK 的治理实现相对无需许可，但这并不意味着任何人都有权工作或获得报酬。提案将由社区单独根据其优点进行评估，并最终进行表决。此外，提案必须遵循 Treasurenet 网络的治理框架，并遵守章程中概述的原则。

### Upgrades

#### Planned Upgrades
Planned upgrades are coordinated scheduled upgrades that use the upgrade module logic. This facilitates smoothly upgrading Treasurenet to a new (breaking) software version as it automatically handles the state migration for the new release.

#### Unplanned Upgrades
Unplanned upgrades are upgrades where all the validators need to gracefully halt and shut down their nodes at exactly the same point in the process. This can be done by setting the --halt-height flag when running the treasurenetd start command.

If there are breaking changes during an unplanned upgrade (see below), validators will need to migrate the state and genesis before restarting their nodes.


