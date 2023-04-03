---
sidebar_position: 3
---

# Gas and Fees

Gas 的概念表示在状态机上执行特定操作所需的计算量。

Gas 源自Ethereum上的概念，通过向系统支付少量token的价值来承担操作所需的计算消耗，以避免EVM交易计算量无限制的增长，EVM的每个操作都会消耗一定的Gas，通常是原生Token的一小部分，用户需要为它们想要进行的操作付费，这些操作仅包含交易类操作，像是转账或者调用、部署合约。

与Ethereum完全一样，TN使用了Gas的概念，这就是TN在执行期间资源使用情况的表现，TN上的操作表示为对区块链账本的写入。

在TN中，消息执行期间会计算并向用户收取费用。该费用是根据消息执行中消耗的Gas总和进行计算的，费用等于Gas乘以Gas单价。

## Matching EVM Gas consumption

TN是支持Ethereum [Web3](https://web3js.readthedocs.io/en/v1.7.5/) 工具的EVM兼容区块链系统。因此，gas消耗必须和其他EVM持平，特别是Ethereum。

EVM和Cosmos状态转换的主要区别在于EVM对于每个OPCODE使用gas表确定费用，而Cosmos是通过在GasConfig中的设置访问数据库确定每字节的成本来为每个CRUD操作收取Gas费用。

```golang
// GasConfig defines gas cost for each operation on KVStores
type GasConfig struct {
	HasCost          Gas
	DeleteCost       Gas
	ReadCostFlat     Gas
	ReadCostPerByte  Gas
	WriteCostFlat    Gas
	WriteCostPerByte Gas
	IterNextCostFlat Gas
}
```

为了匹配EVM消耗的gas，SDK中的gas消耗逻辑被忽略，而是通过从消息中定义的gas limit中减去状态转换剩余gas加上refund来计算消耗的gas。

为了忽略 SDK 的 gas 消耗，我们将交易GasMeter计数重置为 0，并手动将其设置为gasUsed执行结束时 EVM 模块计算的值。

### AnteHandler

Cosmos SDK [AnteHandler](https://docs.cosmos.network/main/basics/gas-fees.html#antehandler)在事务执行之前执行基本检查。这些检查通常是签名验证、交易字段验证、交易费用等。

关于 gas 消耗和费用，AnteHandler检查用户是否有足够的余额来支付 tx 成本（金额加费用），以及检查消息中定义的 gas 限制是否大于或等于消息的计算固有 gas。

## Gas Refunds

在 EVM 中，可以在执行之前指定 gas。指定的总gas在执行开始时（AnteHandler步骤期间）被消耗，如果在执行后剩余任何gas，剩余的gas将退还给用户。

