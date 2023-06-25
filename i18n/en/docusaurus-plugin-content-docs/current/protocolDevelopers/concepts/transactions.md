---
sidebar_position: 1
---

# Transactions

交易是指由账户发起的改变区块链状态的行为。为了有效地执行状态更改，每笔交易都会广播到整个网络。任何节点都可以广播请求在区块链状态机上执行的交易；发生这种情况后，验证器将验证、执行交易并将产生的状态更改传播到网络的其余部分。

为了处理每笔交易，网络上的计算资源都会被消耗。因此，“gas”的概念是作为验证者处理交易所需的计算的参考而出现的。用户必须为此计算付费，所有交易都需要相关费用。该费用是根据执行交易所需的 gas 和 gas 价格计算的。

此外，交易需要使用发送方的私钥进行签名。这证明交易只能来自发件人，而不是欺诈性发送。

简而言之，将签名交易提交到网络后的交易生命周期如下：

- 交易哈希是加密生成的。
- 该交易被广播到网络并添加到由所有其他未决网络交易组成的交易池中。
- 验证者必须选择你的交易并将其包含在一个块中，以验证交易并认为它“成功”。

交易哈希是一个唯一标识符，可用于检查交易信息，例如，发出的事件是否成功。

交易可能因各种原因而失败。例如，提供的 gas 或费用可能不足。此外，交易验证可能会失败。每笔交易都有特定的条件，必须满足这些条件才能被视为有效。一个广泛的验证是发送者是交易签名者。在这种情况下，如果您在发件人地址与签名者地址不同的地方发送交易，即使费用足够，交易也会失败。

## Cosmos Transactions

On Cosmos chains, transactions are comprised of metadata held in contexts and sdk.Msgs that trigger state changes within a module through the module's Protobuf Msg service.

When users want to interact with an application and make state changes (e.g. sending coins), they create transactions. Cosmos transactions can have multiple sdk.Msgs. Each of these must be signed using the private key associated with the appropriate account(s), before the transaction is broadcasted to the network.

Cosmos 交易包括以下信息：

- Msgs：消息数组（sdk.Msg）
- GasLimit：用户选择的选项，用于计算他们需要支付多少 gas
- FeeAmount：用户愿意支付的最大费用
- TimeoutHeight：交易有效的区块高度
- Signatures: 来自 tx 所有签名者的签名数组
- Memo: 随交易发送的注释或评论

To submit a Cosmos transaction, users must use one of the provided clients.

## Etherenum Transactions

Ethereum transactions refer to actions initiated by EOAs (externally-owned accounts, managed by humans), rather than internal smart contract calls. Ethereum transactions transform the state of the EVM and therefore must be broadcasted to the entire network.

Ethereum transactions also require a fee, known as gas. (EIP-1559) introduced the idea of a base fee, along with a priority fee which serves as an incentive for miners to include specific transactions in blocks.

There are several categories of Ethereum transactions:

- regular transactions: transactions from one account to another
- contract deployment transactions: transactions without a to address, where the contract code is sent in the data field
- execution of a contract: transactions that interact with a deployed smart contract, where the to address is the smart contract address

An Ethereum transaction 包括以下信息：

- recipient: 接收者地址
- signature: 发送者签名
- nonce: 来自account的 tx 编号的计数器
- value: 要转账的代币数量
- data: 包括任意数据。 在部署智能合约或进行智能合约方法调用时使用
- gasLimit: 要消耗的最大gas量
- maxPriorityFeePerGas: mas gas to be included as tip to validators
- maxFeePerGas: 为 tx 支付的最大 gas 量

Treasurenet supports the following Ethereum transactions.


