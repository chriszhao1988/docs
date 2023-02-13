---
sidebar_position: 5
---

# Bank

## Introduction

auth 模块定义了账户和交易，而交易中可以包含由多个模块定义的消息，其中基本的转账消息由bank模块定义

The bank module maintains the state of two primary objects:

* Account balances by address;
* Total supply of tokens of the chain

bank module tracks and provides query support for the total supply of all assets used in the application. It also supports token transfer functionalities. Specifically, the total supply is updated whenever a token is:

* Minted ，例如mint模块创建的 Token.(参见[mint模块](./mint.md))
* Burned，例如被slashing模块惩罚的 Token.(参见[slashing模块](./slashing.md))

不同模块的处理逻辑都可能导致账户链上资产的变动，为了支持这些处理逻辑的实现，bank模块将资产的读写权限通过bank.Keeper暴露给其他模块.

* ViewKeeper 拥有账户中的资产只读权限
  - GetCoin()返回账户中的资产总量.
  - HasCoin()检查账户中是否包含足够的资产.

* SendKeeper 在ViewKeeper的基础上增加了资产转移的相关方法
  - SendCoin()用于发送者向接收者转账.
  - AddCoin(),SubtractCoin()增减账户中的资产.
  - SetCoin()设置某个地址的资产总量.

* Keeper接口则在SendKeeper的基础上提供了资产抵押和取回的方法
  - DelegateCoins()将账户中用作抵押的链上资产转移到staking模块账户.
  - UndelegateCoins()取回抵押的链上资产.  

基于Keeper提供的功能，容易实现bank模块对两种转账交易的处理逻辑，需要注意的是虽然模块账户与普通账户没有本质区别，但是模块账户不能作为转账消息中的接受者

## Transactions and Queries

### Transactions

   > treasurenetd tx bank send [from_address] [to_address] [amount] --chain-id testid --fees [^fees] --gas auto [^gas] --keyring-backend test    --发送资金
   [^fees]: Fees to pay along with transaction.
   [^gas]: gas limit to set per-transaction; set to "auto" to calculate sufficient gas automatically (default 200000).

```sh
   treasurenetd tx bank send treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse 100unit --keyring-backend test --fees 1unit --gas auto

   {"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"treasurenet1wf78qmzhfsjndy3v6wsdxjfqnmwnyy2grwxmrg","to_address":"treasurenet1dfucynntu99huh9n39f85qs5py66wmx4r8mmse","amount":[{"denom":"aunit","amount":"100000000000000000000"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[],"fee":{"amount":[{"denom":"aunit","amount":"1000000000000000000"}],"gas_limit":"112369","payer":"","granter":""}},"signatures":[]}

   confirm transaction before signing and broadcasting [y/N]: y
```

### Queries

   > treasurenetd query bank balances [address] --output json | jq --查询指定账户下的token

```json
{
  "balances": [
    {
      "denom": "aunit",
      "amount": "99899539999968499999853000"
    },
    {
      "denom": "footoken",
      "amount": "10000000000"
    },
    {
      "denom": "footoken2",
      "amount": "10000000000"
    },
    {
      "denom": "ibc/nometadatatoken",
      "amount": "10000000000"
    },
    {
      "denom": "stake",
      "amount": "10000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "0"
  }
}

```

   > treasurenetd query bank total --home /data/mytestnet/.treasurenetd/ --output json | jq --检查token的总供应量

```json
{
  "supply": [
    {
      "denom": "aunit",
      "amount": "200758710000000000000000000"
    },
    {
      "denom": "footoken",
      "amount": "20000000000"
    },
    {
      "denom": "footoken2",
      "amount": "20000000000"
    },
    {
      "denom": "ibc/nometadatatoken",
      "amount": "20000000000"
    },
    {
      "denom": "stake",
      "amount": "20000000000"
    }
  ],
  "pagination": {
    "next_key": null,
    "total": "5"
  }
}

```