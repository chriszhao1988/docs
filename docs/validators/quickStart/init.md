---
sidebar_position: 4
---

# 初始化

## 简介

- 定义启动 treasurenet 链时需要用到的参数
  - BIN=treasurenetd :your gaiad binary name
  - ALLOCATION="100000000000000000000000000aunit,10000000000stake,10000000000footoken,10000000000footoken2,10000000000ibc/nometadatatoken" : 定义需要用到的代币
  - KEY1="validator" : 创建秘钥来保存自己的账户
  - KEY2="orchestrator" : 创建 orchestrator 的秘钥用来保护中继账户
  - CHAINID="treasurenet_9000-1" : Treasurenet 链 ID
  - MONIKER="localtestnet" : 自定义节点名称
  - KEYRING="test" : 秘钥环的存储测试环境为 test
  - KEYALGO="eth_secp256k1" : 加密方式
  - LOGLEVEL="info" : 日志类型
  - TRACE="--trace" : to trace evm
  ```shell
  #!/bin/bash
  set -eux
  # your gaiad binary name
  BIN=treasurenetd
  ALLOCATION="100000000000000000000000000aunit,10000000000stake,10000000000footoken,10000000000footoken2,10000000000ibc/nometadatatoken"
  KEY1="validator"
  KEY2="orchestrator"
  CHAINID="treasurenet_9000-1"
  MONIKER="localtestnet"
  KEYRING="test"
  KEYALGO="eth_secp256k1"
  LOGLEVEL="info"
  TRACE="--trace"
  GAIA_HOME="--home /root/.treasurenetd"
  ARGS="$GAIA_HOME --keyring-backend test"
  ```
- validate dependencies are installed
  - `command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }`
- remove existing daemon and client
  - `rm -rf ~/.treasurenet*`
- make install

```shell
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }
rm -rf ~/.treasurenet*
make install
```

- 执行 treasurenetd

  - 创建或者查询应用程序 CLI 配置文件
    1. `$BIN config keyring-backend $KEYRING`
    2. `$BIN config chain-id $CHAINID`
  - Generate a validator key, orchestrator key, and eth key for each validator
    1. `$BIN keys add $KEY1 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/validator-phrases` : 添加秘钥来保护自己的账户
    2. `$BIN keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/orchestrator-phrases` : 添加秘钥来保护中继器上的账户
    3. `$BIN eth_keys add --keyring-backend $KEYRING >> /data/validator-eth-keys` : 添加秘钥来保护以太坊的账户
  - Set moniker and chain-id for Treasurenet (Moniker can be anything, chain-id must be an integer)
    - `$BIN init $MONIKER --chain-id $CHAINID` : 初始化 NODE 会在$HOME 目录下生产.treasurenetd 文件，该文件下包含了链需要的文件，如:config.toml,genesis.json,data...等

  ```shell
  $BIN config keyring-backend $KEYRING
  $BIN config chain-id $CHAINID
  GAIA_HOME="--home /root/.treasurenetd"
  ARGS="$GAIA_HOME --keyring-backend test"
  $BIN keys add $KEY1 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/validator-phrases
  $BIN keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/orchestrator-phrases
  $BIN eth_keys add --keyring-backend $KEYRING >> /data/validator-eth-keys

  $BIN init $MONIKER --chain-id $CHAINID
  ```

- Change parameter token denominations to aunit
  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```
- increase block time (?)

  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```

- Set gas limit in genesis

  ```shell
  cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
  ```

- disable produce empty block

  ```shell
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
  fi
  ```

- add in denom metadata for both native tokens

  ```shell
  jq '.app_state.bank.denom_metadata += [{"name": "Foo Token", "symbol": "FOO", "base": "footoken", display: "mfootoken", "description": "A non-staking test token", "denom_units": [{"denom": "footoken", "exponent": 0}, {"denom": "mfootoken", "exponent": 6}]},{"name": "Stake Token", "symbol": "STEAK", "base": "aunit", display: "unit", "description": "A staking test token", "denom_units": [{"denom": "aunit", "exponent": 0}, {"denom": "unit", "exponent": 18}]}]' /root/.treasurenetd/config/genesis.json > /treasurenet-footoken2-genesis.json
  jq '.app_state.bank.denom_metadata += [{"name": "Foo Token2", "symbol": "F20", "base": "footoken2", display: "mfootoken2", "description": "A second non-staking test token", "denom_units": [{"denom": "footoken2", "exponent": 0}, {"denom": "mfootoken2", "exponent": 6}]}]' /treasurenet-footoken2-genesis.json > /treasurenet-bech32ibc-genesis.json
  ```

- Set the chain's native bech32 prefix
  ```shell
  jq '.app_state.bech32ibc.nativeHRP = "treasurenet"' /treasurenet-bech32ibc-genesis.json > /gov-genesis.json
  mv /gov-genesis.json /root/.treasurenetd/config/genesis.json
  ```
- Allocate genesis accounts (treasurenet formatted addresses)

  - `VALIDATOR_KEY=$($BIN keys show validator -a $ARGS)`
  - `ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)`
  - `$BIN add-genesis-account $ARGS $VALIDATOR_KEY $ALLOCATION`
  - `$BIN add-genesis-account $ARGS $ORCHESTRATOR_KEY $ALLOCATION`

  ```shell
  VALIDATOR_KEY=$($BIN keys show validator -a $ARGS)
  ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
  $BIN add-genesis-account $ARGS $VALIDATOR_KEY $ALLOCATION
  $BIN add-genesis-account $ARGS $ORCHESTRATOR_KEY $ALLOCATION
  ```

- Sign genesis transaction
  - `ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)`
  - `ETHEREUM_KEY=$(grep address /validator-eth-keys | sed -n "1"p | sed 's/.*://')`
  - 创建了一个 gentx 目的是为了 1:将您创建的账户注册 validator 为验证器操作员的账户；2：自行委托提供 unit 质押的代币；3：将操作员账户与将用于签署区块的 Treasurenet 节点公钥链接
  * `$BIN gentx $ARGS --moniker $MONIKER --chain-id=$CHAIN_ID validator 258000000000000000000aunit $ETHEREUM_KEY $ORCHESTRATOR_KEY`
- Collect genesis tx
  - `$BIN collect-gentxs` : 将 gentx 添加到 genesis 文件中
- Run this to ensure everything worked and that the genesis file is setup correctly
  - `$BIN validate-genesis`
- Start the node (remove the --pruning=nothing flag if historical queries are not needed)
  - `$BIN start --pruning=nothing --log_level $LOGLEVEL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --trace --json-rpc.address 0.0.0.0:8555`

```shell
ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
ETHEREUM_KEY=$(grep address /validator-eth-keys | sed -n "1"p | sed 's/.*://')
$BIN gentx $ARGS --moniker $MONIKER --chain-id=$CHAIN_ID validator 258000000000000000000aunit $ETHEREUM_KEY $ORCHESTRATOR_KEY
$BIN collect-gentxs
$BIN start --pruning=nothing --log_level $LOGLEVEL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --trace --json-rpc.address 0.0.0.0:8555
```
