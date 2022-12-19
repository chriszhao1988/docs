---
sidebar_position: 1
---

# Transactions

:::info
  🚧 Documentation is in progress.
:::

## Transaction Type

### Cosmos Transactions

### Ethereum Transactions

Ethereum交易是指由EOA（externally-owned accounts）而不是内部智能合约调用，Ethereum交易改变了EVM的状态，因此必须广播到整个网络。

Ethereum交易也需要收费，称为Gas[(EIP-1559)](https://eips.ethereum.org/EIPS/eip-1559)。 引入了基本费用的概念，以及作为激励矿工将特定交易包含到区块中的优先费用。

Ethereum交易有三类

- 常规交易：从一个账户到另一个账户 像是Transfer
- 合约部署交易：没有to地址的交易，合约代码在data字段中发送。
- 合约执行：与已完成部署的合约进行交互的交易，其中to地址为合约地址。

有关Ethereum Transactions以及Transaction lifecycle相关的内容，[查看这里](https://ethereum.org/en/developers/docs/transactions/)。

TN支持以下Ethereum Transactions

- Dynamic Fee Transactions [(EIP-1559)](https://eips.ethereum.org/EIPS/eip-1559)
- Access List Transactions [(EIP-2930)](https://eips.ethereum.org/EIPS/eip-2930)
- Legacy Transactions [(EIP-2718)](https://eips.ethereum.org/EIPS/eip-2718)
