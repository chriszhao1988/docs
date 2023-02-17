---
sidebar_position: 2
---

# Auth

## Introduction

auth 模块负责链上账户管理，支持账户的创建、更新、删除等操作。由于交易结构与账户结构密切相关，auth模块也定义了标准交易,所以auth模块负责制定基本交易和账户类型。

## Gas & Fees

Fees serve two purposes for an operator of the network.

Fees limit the growth of the state stored by every full node and allow for general purpose censorship of transactions of little economic value. Fees are best suited as an anti-spam mechanism where validators are disinterested in the use of the network and identities of users.

Fees are determined by the gas limits and gas prices transactions provide, where fees = ceil(gasLimit * gasPrices). Txs incur gas costs for all state reads/writes, signature verification, as well as costs proportional to the tx size. Operators should set minimum gas prices when starting their nodes. They must set the unit costs of gas in each token denomination they wish to support:

 > treasurenetd start ... --minimum-gas-prices=1000000aunit

When adding transactions to mempool or gossipping transactions, validators check if the transaction's gas prices, which are determined by the provided fees, meet any of the validator's minimum gas prices. In other words, a transaction must provide a fee of at least one denomination that matches a validator's minimum gas price.

Tendermint does not currently provide fee based mempool prioritization, and fee based mempool filtering is local to node and not part of consensus. But with minimum gas prices set, such a mechanism could be implemented by node operators.

Because the market value for tokens will fluctuate, validators are expected to dynamically adjust their minimum gas prices to a level that would encourage the use of the network.

## Accounts

Account接口类型是auth模块的数据类型
```golang
type AccountI interface {
	proto.Message

	GetAddress() sdk.AccAddress        //获取账户地址
	SetAddress(sdk.AccAddress) error   //设置账户地址

	GetPubKey() cryptotypes.PubKey     //获取账户公钥
	SetPubKey(cryptotypes.PubKey) error//设置账户公钥

	GetAccountNumber() uint64          //获取账户号
	SetAccountNumber(uint64) error     //设置账户号

	GetSequence() uint64               //获取账户序列号
	SetSequence(uint64) error          //设置账户序列号

	// Ensure that account implements stringer
	String() string
}
```
BaseAccount是基本账户，是最简单最常见的Account类型，它包含基本帐户功能所需的所有字段
```golang
type BaseAccount struct {
	Address       string     //账户地址
	PubKey        *types.Any //账户公钥
	AccountNumber uint64     //账户号
	Sequence      uint64     //账户序列号
}
```
## 标准交易

```golang
type StdTx struct {
	Msgs          []sdk.Msg      
	Fee           StdFee         
	Signatures    []StdSignature 
	Memo          string         
	TimeoutHeight uint64         
}
// StdFee includes the amount of coins paid in fees and the maximum
// gas to be used by the transaction. The ratio yields an effective "gasprice",
// which must be above some miminum to be accepted into the mempool.
type StdFee struct {
	Amount sdk.Coins 
	Gas    uint64    
}
```
交易的签名采用的是定义在secp256k1椭圆曲线上的ECDSA，一笔合法的交易要求其中所有的签名都合法，且交易的执行具有原子性:
1. 交易中任何一个消息执行失败，整笔交易就执行失败
2. 交易中又其他消息改变的状态会被重置,Memo字段可以记录一些交易附加消息和交易的备注

为了防止重放攻击，生成待签名数据时需要包含链ID chain_id、账户的sequenceNumber、accountNumber，账户发起一笔交易后，SequenceNumber会递增

一笔交易的交易费等信息包含在StdFee中，其中Amount字段表示交易发起者愿意为本次交易支付的手续费，Gas字段表示本次交易允许消耗的Gas上限。Amount/Gas就得到了这笔交易的GasPrice,GasPrice可以看作单位Gas的价值，更高的GasPrice有助于交易被区块链及时处理。交易费的收取由auth模块负责，auth模块定义了FeeCollector模块账户，用来暂时存放交易的交易费。

auth模块定义了标准交易类型StdTx,代表的一笔交易可以包含多个消息sdk.Msg,每个Msg对应一个链上操作，所有的消息存储在Msgs中，且每个签名都需要有签名授权，签名保存在Signatures字段中。

Note that the AnteHandler is called on both CheckTx and DeliverTx, as Tendermint proposers presently have the ability to include in their proposed block transactions which fail CheckTx.

Decorators
The auth module provides AnteDecorators that are recursively chained together into a single AnteHandler in the following order:

* SetUpContextDecorator: Sets the GasMeter in the Context and wraps the next AnteHandler with a defer clause to recover from any downstream OutOfGas panics in the AnteHandler chain to return an error with information on gas provided and gas used.

* RejectExtensionOptionsDecorator: Rejects all extension options which can optionally be included in protobuf transactions.

* MempoolFeeDecorator: Checks if the tx fee is above local mempool minFee parameter during CheckTx.

* ValidateBasicDecorator: Calls tx.ValidateBasic and returns any non-nil error.

* TxTimeoutHeightDecorator: Check for a tx height timeout.

* ValidateMemoDecorator: Validates tx memo with application parameters and returns any non-nil error.

* ConsumeGasTxSizeDecorator: Consumes gas proportional to the tx size based on application parameters.

* DeductFeeDecorator: Deducts the FeeAmount from first signer of the tx. If the x/feegrant module is enabled and a fee granter is set, it deducts fees from the fee granter account.

* SetPubKeyDecorator: Sets the pubkey from a tx's signers that does not already have its corresponding pubkey saved in the state machine and in the current context.

* ValidateSigCountDecorator: Validates the number of signatures in tx based on app-parameters.

* SigGasConsumeDecorator: Consumes parameter-defined amount of gas for each signature. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

* SigVerificationDecorator: Verifies all signatures are valid. This requires pubkeys to be set in context for all signers as part of SetPubKeyDecorator.

* IncrementSequenceDecorator: Increments the account sequence for each signer to prevent replay attacks.

## Transactions and Queries

### Queries

   > treasurenetd query auth accounts --home -o json | jq - Query all the accounts

```json
{
  "accounts": [
    {
      "@type": "/ethermint.types.v1.EthAccount",
      "base_account": {
        "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "pub_key": null,
        "account_number": "0",
        "sequence": "13"
      },
      "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
    },
    {
     "......"
    }
  ],
  "pagination": {
    "next_key": "SRG3Xw8wlFpEhR17ZtI1nuICFdM=",
    "total": "0"
  }
}
```

   > treasurenetd query auth account [address] --home --output json | jq - Query for account by address

```json
{
  "@type": "/ethermint.types.v1.EthAccount",
  "base_account": {
    "address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
    "pub_key": {
      "@type": "/ethermint.crypto.v1.ethsecp256k1.PubKey",
      "key": "AzaTWMVN4SlZq9C+fsI0aQzQuQ+HV5+I1mHW7LwjjWhO"
    },
    "account_number": "0",
    "sequence": "13"
  },
  "code_hash": "0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470"
}
```

   > treasurenetd query auth params --home  -o json | jq - auth模块的参数

```json 
{
  "max_memo_characters": "256",
  "tx_sig_limit": "7",
  "tx_size_cost_per_byte": "10",
  "sig_verify_cost_ed25519": "590",
  "sig_verify_cost_secp256k1": "1000"
}
```