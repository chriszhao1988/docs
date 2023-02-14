---
sidebar_position: 8
---

# Slashing

## Introduction

slashing 是惩罚模块分为主动作恶处罚和被动作恶处罚。验证者负责在每一轮共识中签署或提议一个区块。应该对验证者的不当行为施加惩罚以强化这一点

具体来说，slashing旨在抑制网络可观察行为（例如错误验证）的功能。处罚可能包括失去一定数量的股份、在一段时间内失去执行网络功能的能力、获得奖励等。

被动作恶是指活跃验证者节点的可用性差，具体来说是指在一定的时间窗口内，活跃验证者签署的区块个数低于某个阈值。
主动作恶则是指活跃验证者偏离共识协议规定，比如在同一个区块高度违反共识协议对不同的区块进行投票(签名)。

### 被动惩罚
Tendermint构建的区块中的Commit类型的指针包含对上一个区块的投票信息
```golang
type Commit struct {
	Height     int64       `json:"height"`     //去块高度
	Round      int32       `json:"round"`      //表示第几轮达成的共识
	BlockID    BlockID     `json:"block_id"`   //区块标识
	Signatures []CommitSig `json:"signatures"` //活跃验证者集合的投票信息包含在signatures
	hash     tmbytes.HexBytes
	bitArray *bits.BitArray
}
```
由于可能存在网络延时等问题，可能造成某个活跃验证者未能及时收到标识为BlockID的区块，或者构建该区块的提案者没有收集到针对该区块的所有投票，共识协议允许活跃验证者对空值而非对某个具体的区块投票，因此需要区分活跃验证者投票给真正的区块，投票给空值以及没有投票3中情况。

```golang
type CommitSig struct {
	BlockIDFlag      BlockIDFlag `json:"block_id_flag"`
	ValidatorAddress Address     `json:"validator_address"`
	Timestamp        time.Time   `json:"timestamp"`
	Signature        []byte      `json:"signature"`
}
```
CommitSig中通过BlockIDFlag字段对情况进行区分。
Commit结构体中的bitArray根据CommitSig中的BlockIDFlag的值，以bit的形式标记了有哪些活跃验证者在参与对上一个区块投票的过程中被打包到了区块中:只要Signature中包含一个活跃验证者的投票，bitArray中对应的位就被设置。

当前的TreasureNet网络中阈值设定为5%，也就是说再固定的时间窗口内只要错过的区块不超过95%就不会被slashing模块惩罚

在监狱禁闭时间结束以后，需要验证者主动申请释放易重新参与活跃验证者的竞争，这是因为当出现被动作恶可能是由于节点运营出现了问题，修复时间是不可知的，如果主动释放后节点运营没有得到解决会继续被动惩罚，导致因同样的问题遭受多次惩罚。

### 主动作恶

活跃验证者可以通过多种方式进行主动作恶，如恶意偏离共识协议约定并发送多种消息，双签作恶的监狱禁闭时间为永久，由于validator的信息不会在链上删除，因此关于该恶意验证者的永久监狱禁闭记录会一直留存在链上，所以该validator的地址会永久作废。所以运营方只能通过重新创建新的验证者(使用新的共识秘钥对和地址)才可以重新参与投票权重竞争。在此之前需要等待一个完整的解绑周期才能取回自己在作恶验证者处抵押的链上资产。主动惩罚比例由参数slash_fraction_double_sign指定，默认为5%。


3中主动作恶的情况
1. 执行BeginBlocker()时，发现验证者的可用性差，会罚掉一小部分的链上资产，将validator的jailed字段设置为true。
2. 执行BeginBlocker()时，发现验证者的有效双签举证信息，罚掉客观比例的链上资产，将validator的Jailed字段设置为true。
3. 验证者运营方发起的撤回委托或者重新委托操作导致自抵押链上资产数量不足。

## 网络参数
以下是用于配置验证者惩罚行为的所有网络参数。所有这些参数的详细信息及其对验证者惩罚行为的影响将在本文档后面讨论。

signed_blocks_window：为正常运行时间跟踪计算活跃度的块数；
min_signed_per_window：最后一个帐户允许的错误/错过验证的块的最大百分比；signed_blocks_window在停用之前阻塞；
downtime_jail_duration:监禁时间；
slash_fraction_double_sign：当验证者出现拜占庭错误时被削减的资金百分比;
slash_fraction_downtime：当验证者不活跃时被削减的资金百分比。

## Transactions and Queries

### Transactions

   > treasurenetd tx staking create-validator - Create new validator initialized with a self-delegation

```sh
$ treasurenetd tx staking create-validator \
--from=[name_of_your_key] \
--amount=[staking_amount] \
--pubkey=[treasurenetpub...]  \
--moniker="[moniker_id_of_your_node]" \
--security-contact="[security contact email/contact method]" \
--chain-id="[chain-id]" \
--commission-rate="[commission_rate]" \
--commission-max-rate="[maximum_commission_rate]" \
--commission-max-change-rate="[maximum_rate_of_change_of_commission]" \
--min-self-delegation="[min_self_delegation_amount]"
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgCreateValidator"...}
confirm transaction before signing and broadcasting [y/N]: y
```

   > treasurenetd tx staking delegate [validator-address] [amount] - Delegate liquid tokens to a validator

```sh
treasurenetd tx staking delegate treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq 10unit
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg 
--home (defaule:"/root/.treasurenet/")  
--fees 1unit 
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgDelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

   >  treasurenetd tx staking unbond [validator-address] [amount] -  Unbond shares from a validator
这里需要注意的是，在解绑委托后，不会立即生效，因为我们有个参数unbonding_time(解绑时间)，资金只有在unbonding_time通过后才能生效

```sh
treasurenetd tx staking unbond treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq 10unit 
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_9000-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgUnDelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

   > treasurenetd tx staking redelegate [validator-address] [validator-address2] [amount] - 将代币从一个验证者重新委托给另一个验证者
重新绑定操作需要注意几个方面:
1. 当同意用户在解绑过程中，有重新进行了委托绑定，需要等该账户解绑结束后才能进行委托绑定
2. 重新授权期间没有unbonding time ,所以不会错过奖励，但是每个验证者只能重新委托一次，直到unbonding time 结束才能进行新的重新委托
3. Max_entries表示解除绑定委托活重新委托的最大条目，我们重新委托需要在这个参数范围内，如果请求量过大会报错 “too many unbonding delegation entries in this delegator/validator duo, please wait for some entries to mature”

```sh
treasurenetd tx staking redelegate treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq treasurenetvaloper2as78dmzhesjndy3v6wsdxjfqnmwnyy2gzs32qq 10unit 
--home (defaule:"/root/.treasurenet/")
--from treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg
--chain-id treasurenet_9000-1
--fees 1unit
--gas auto
--keyring-backend test

## Transactions payload##
{"body":{"messages":[{"@type":"/cosmos.staking.v1beta1.MsgBeginRedelegate","delegator_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","validator_src_address":"treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq","validator_dst_address":"treasurenetvaloper2as78dmzhesjndy3v6wsdxjfqnmwnyy2gzs32qq","amount":{"denom":"aunit","amount":"10000000000000000000"}}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"214201","payer":"","granter":""}},"signatures":[]}

confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

   > treasurenetd query staking validators --home --output json | jq - 查询所有验证者

```json
{
  "validators": [
    {
      "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
      "consensus_pubkey": {
        "@type": "/cosmos.crypto.ed25519.PubKey",
        "key": "dGvx6FL1zdjKsmzZ7R/2EBfCgJcsneP0rUpMkxs9Si8="
      },
      "jailed": false,
      "status": "BOND_STATUS_BONDED",
      "tokens": "268000000000000000000",
      "delegator_shares": "268000000000000000000.000000000000000000",
      "description": {
        "moniker": "localtestnet",
        "identity": "",
        "website": "",
        "security_contact": "",
        "details": ""
      },
      "unbonding_height": "0",
      "unbonding_time": "1970-01-01T00:00:00Z",
      "commission": {
        "commission_rates": {
          "rate": "0.100000000000000000",
          "max_rate": "0.200000000000000000",
          "max_change_rate": "0.010000000000000000"
        },
        "update_time": "2023-02-02T10:48:47.611931848Z"
      },
      "min_self_delegation": "158000000000000000000",
      "tat_tokens": "0",
      "new_tokens": "0",
      "tat_power": "0",
      "newunit_power": "0"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}

```

   > treasurenetd query staking validator [validator-address] --home --output json | jq - 查看质押validator的情况

```json
{
  "operator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
  "consensus_pubkey": {
    "@type": "/cosmos.crypto.ed25519.PubKey",
    "key": "dGvx6FL1zdjKsmzZ7R/2EBfCgJcsneP0rUpMkxs9Si8="
  },
  "jailed": false,
  "status": "BOND_STATUS_BONDED",
  "tokens": "268000000000000000000",
  "delegator_shares": "268000000000000000000.000000000000000000",
  "description": {
    "moniker": "localtestnet",
    "identity": "",
    "website": "",
    "security_contact": "",
    "details": ""
  },
  "unbonding_height": "0",
  "unbonding_time": "1970-01-01T00:00:00Z",
  "commission": {
    "commission_rates": {
      "rate": "0.100000000000000000",
      "max_rate": "0.200000000000000000",
      "max_change_rate": "0.010000000000000000"
    },
    "update_time": "2023-02-02T10:48:47.611931848Z"
  },
  "min_self_delegation": "158000000000000000000",
  "tat_tokens": "0",
  "new_tokens": "0",
  "tat_power": "0",
  "newunit_power": "0"
}

```

   > treasurenetd query staking delegations [delegator-address] --home --output json | jq - 根据地址查询委托详情

```json
{
  "delegation_responses": [
    {
      "delegation": {
        "delegator_address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "validator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
        "shares": "268000000000000000000.000000000000000000",
        "tat_shares": "0"
      },
      "balance": {
        "denom": "aunit",
        "amount": "268000000000000000000"
      }
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}

```

   > treasurenetd query staking delegations-to [validator-address] --home --output json | jq - 查询一个验证者的所有委托

```json
{
  "delegation_responses": [
    {
      "delegation": {
        "delegator_address": "treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg",
        "validator_address": "treasurenetvaloper1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2gzs46zq",
        "shares": "268000000000000000000.000000000000000000",
        "tat_shares": "0"
      },
      "balance": {
        "denom": "aunit",
        "amount": "268000000000000000000"
      }
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}
```