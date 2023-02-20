---
sidebar_position: 4
---

# Init.sh

```shell
#!/bin/bash
set -eux
# your gaiad binary name
BIN=treasurenetd

ALLOCATION="100000000000000000000000000aunit,10000000000stake,10000000000footoken,10000000000footoken2,10000000000ibc/nometadatatoken"                  #---定义需要用到的代币

KEY1="validator"                  #---创建秘钥来保存自己的账户
KEY2="orchestrator"               #---创建orchestrator的账户用启动中继服务
CHAINID="treasurenet_9000-1"      #---TreasureNet链ID
MONIKER="localtestnet"            #---自定义节点名称
KEYRING="test"                    #---秘钥环的存储测试环境为test
KEYALGO="eth_secp256k1"           #---加密方式
LOGLEVEL="info"                   #---日志类型
# to trace evm
TRACE="--trace"

# validate dependencies are installed
command -v jq > /dev/null 2>&1 || { echo >&2 "jq not installed. More info: https://stedolan.github.io/jq/download/"; exit 1; }

# remove existing daemon and client
rm -rf ~/.treasurenet*

make install

$BIN config keyring-backend $KEYRING
$BIN config chain-id $CHAINID    #---创建或者查询应用程序CLI配置文件  

GAIA_HOME="--home /root/.treasurenetd"
ARGS="$GAIA_HOME --keyring-backend test"
# Generate a validator key, orchestrator key, and eth key for each validator
$BIN keys add $KEY1 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/validator-phrases    #---添加秘钥来保护自己的账户
$BIN keys add $KEY2 --keyring-backend $KEYRING --algo $KEYALGO 2>> /data/orchestrator-phrases #---添加秘钥来保护中继器上的账户
$BIN eth_keys add --keyring-backend $KEYRING >> /data/validator-eth-keys    #---添加秘钥来保护以太坊的账户
# if $KEY exists it should be deleted

# Set moniker and chain-id for Treasurenet (Moniker can be anything, chain-id must be an integer)
$BIN init $MONIKER --chain-id $CHAINID  #---初始化NODE会在$HOME目录下生产.treasurenetd文件，该文件下包含了链需要的文件，如:config.toml,genesis.json,data...等 

# Change parameter token denominations to aunit
cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["staking"]["params"]["bond_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["crisis"]["constant_fee"]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["gov"]["deposit_params"]["min_deposit"][0]["denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json
cat $HOME/.treasurenetd/config/genesis.json | jq '.app_state["mint"]["params"]["mint_denom"]="aunit"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json

# increase block time (?)
cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["time_iota_ms"]="1000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json

# Set gas limit in genesis
cat $HOME/.treasurenetd/config/genesis.json | jq '.consensus_params["block"]["max_gas"]="10000000"' > $HOME/.treasurenetd/config/tmp_genesis.json && mv $HOME/.treasurenetd/config/tmp_genesis.json $HOME/.treasurenetd/config/genesis.json

# disable produce empty block
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
  else
    sed -i 's/create_empty_blocks = true/create_empty_blocks = false/g' $HOME/.treasurenetd/config/config.toml
fi

# add in denom metadata for both native tokens
jq '.app_state.bank.denom_metadata += [{"name": "Foo Token", "symbol": "FOO", "base": "footoken", display: "mfootoken", "description": "A non-staking test token", "denom_units": [{"denom": "footoken", "exponent": 0}, {"denom": "mfootoken", "exponent": 6}]},{"name": "Stake Token", "symbol": "STEAK", "base": "aunit", display: "unit", "description": "A staking test token", "denom_units": [{"denom": "aunit", "exponent": 0}, {"denom": "unit", "exponent": 18}]}]' /root/.treasurenetd/config/genesis.json > /treasurenet-footoken2-genesis.json
jq '.app_state.bank.denom_metadata += [{"name": "Foo Token2", "symbol": "F20", "base": "footoken2", display: "mfootoken2", "description": "A second non-staking test token", "denom_units": [{"denom": "footoken2", "exponent": 0}, {"denom": "mfootoken2", "exponent": 6}]}]' /treasurenet-footoken2-genesis.json > /treasurenet-bech32ibc-genesis.json

# Set the chain's native bech32 prefix
jq '.app_state.bech32ibc.nativeHRP = "treasurenet"' /treasurenet-bech32ibc-genesis.json > /gov-genesis.json

# a 60 second voting period to allow us to pass governance proposals in the tests

mv /gov-genesis.json /root/.treasurenetd/config/genesis.json
VALIDATOR_KEY=$($BIN keys show validator -a $ARGS)
ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
$BIN add-genesis-account $ARGS $VALIDATOR_KEY $ALLOCATION  #---创建一个账户，并在链的创世文件中授予它一些币用于接下来的操作
$BIN add-genesis-account $ARGS $ORCHESTRATOR_KEY $ALLOCATION  #---创建一个中继器账户，并在链的创世文件中授予它一些币用于接下来的操作

ORCHESTRATOR_KEY=$($BIN keys show orchestrator -a $ARGS)
ETHEREUM_KEY=$(grep address /validator-eth-keys | sed -n "1"p | sed 's/.*://')
#---创建了一个gentx目的是为了1:将您创建的账户注册validator为验证器操作员的账户；2：自行委托提供unit质押的代币；3：将操作员账户与将用于签署区块的TreasureNet节点公钥链接
$BIN gentx $ARGS --moniker $MONIKER --chain-id=$CHAIN_ID validator 258000000000000000000aunit $ETHEREUM_KEY $ORCHESTRATOR_KEY
$BIN collect-gentxs  #---将gentx添加到genesis文件中
#---启动节点
$BIN start --pruning=nothing --log_level $LOGLEVEL --json-rpc.api eth,txpool,personal,net,debug,web3,miner --trace --json-rpc.address 0.0.0.0:8555 
```