---
sidebar_position: 6
---

# Join main-net

:::caution
  ❗️ coming soon
:::

## Getting Started

* 选择合适的硬件和服务器配置。(参见[硬件指南](./overview.md))。
* 确保TreasureNetd正确安装。(参见[硬件指南](./quickStart/installation.md))。
* 下载创世文件，并设置持久对等节点或者启动种子节点。

## 硬件配置

|Node Type|RAM|Storage|
|--|--|--|
|validator|16G|500GB-2TB|
|完整节点|16G|2TB|
|default|16G|1TB|

## State Sync
To enable state sync, visit an [explorer](https://explorer.treasurenet.io/) (opens new window)to get a recent block height and corresponding hash. A node operator can choose any height/hash in the current bonding period, but as the recommended snapshot period is 1000 blocks, it is advised to choose something close to current height - 1000. Set these parameters in the code snippet below <BLOCK_HEIGHT> and <BLOCK_HASH>

作为参考，可以在[treasurenet hub chain-registry reporpc_servers](https://github.com/cosmos/chain-registry/blob/master/cosmoshub/chain.json)中找到peer的列表persistent 
```shell
# Build treasurenet binary and initialize chain
cd $HOME
git clone https://github.com/treasurenetprotocol/treasurenet.git
cd treasurenet
make install
treasurenetd init [moniker] --chain-id treasurenet_9000-1

#Set minimum gas price & peers
sed -i'' 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025aunit"/' $HOME/.treasurenetd/config/app.toml
sed -i'' 's/persistent_peers = ""/persistent_peers = '"\"$(curl -s https://github.com/treasurenetprotocol/chain-registry/master/cosmoshub/chain.json | jq -r '[foreach .peers.seeds[] as $item (""; "\($item.id)@\($item.address)")] | join(",")')\""'/' $HOME/.treasurenetd/config/config.toml

# Configure State sync
sed -i'' 's/enable = false/enable = true/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/trust_height = 0/trust_height = <BLOCK_HEIGHT>/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/trust_hash = ""/trust_hash = "<BLOCK_HASH>"/' $HOME/.treasurenetd/config/config.toml
sed -i'' 's/rpc_servers = ""/rpc_servers = "https://treasurenet-rpc.polkachu.com:443,https://rpc-treasurenet-ia.cosmosia.notional.ventures:443,https://rpc.treasurenet.network:443"/' $HOME/.treasurenetd/config/config.toml

#Start treasurenetd
treasurenetd start --x-crisis-skip-assert-invariants
```

## Quick Sync

:::caution
  ❗️ Note: Make sure to set the --home flag when initializing and starting gaiad if mounting quicksync data externally.
:::

### Create Gaia Home & Config

mkdir $HOME/.treasurenetd/config -p

### Start Quicksync Download

Node Operators can decide how much of historical state they want to preserve by choosing between Pruned, Default, and Archive. See the [Quicksync.io downloads](https://github.com/treasurenetprotocol/addrbook.json)  (opens new window)for up-to-date snapshot sizes.

下载最新版本的treasurenetd执行程序和addrbook.json

### Unzip

```shell
tar -zxvf ./treasurenetd.tar
```

### Copy Address Book Quicksync

```shell
curl https://quicksync.io/addrbook.treasurenetd.json > $HOME/.treasurenetd/config/addrbook.json
```
### Start Treasurenetd

treasurenetd start --x-crisis-skip-assert-invariants

## 持久对等节点和种子节点

### 初始化链

为节点选择一个自定义的名称并开始初始化。**init**命令会默认在~下创建.treasurenetd文件，包含config和data,在config中最重要的配置文件为config.toml和app.toml
```shell
treasurenetd init <moniker-name>
```
:::caution
  Monikers 只能包含 ASCII 字符。不支持使用 Unicode 字符，这会导致节点无法访问。
:::
### genesis.json

节点初始化后，下载创世文件并移动到~/config/genesis.json
:::note
wget https://github.com/treasurenetprotocol/mainnet/master/genesis/genesis.treasurenet.json.gz  <br />
gzip -d genesis.json.gz  <br />
mv genesis.json ~/.treasurenetd/config/genesis.json
:::


### 配置对等节点
```shell
treasurenetd keys add <validator> --keyring-backend file --algo info 2>> /data/validator-phrases  
treasurenetd keys add <orchestrator> --keyring-backend file --algo info 2>> /data/orchestrator-phrase
treasurenetd eth_keys add --keyring-backend test >> /data/validator-eth-keys 
treasurenetd init <Moniler_name> --chain-id tets_9000-1
#修改配置文件设置对等节点
~/.treasurenetd/config/config.toml

#######################################################
###           P2P Configuration Options             ###
#######################################################
[p2p]

# Address to listen for incoming connections
laddr = "tcp://0.0.0.0:26656"

# Address to advertise to peers for them to dial
# If empty, will use the same port as the laddr,
# and will introspect on the listener or use UPnP
# to figure out the address. ip and port are required
# example: 159.89.10.97:26656
external_address = ""

# Comma separated list of seed nodes to connect to
seeds = ""

# Comma separated list of nodes to keep persistent connections to
persistent_peers = "e7bcaa83f89c76ca0337f73d767e35887d306f73@<ip/address>:26656,....."
```
:::note
启动时，节点将需要连接到对等节点。如果节点运营商有兴趣将特定节点设置为种子或持久对等节点，则可以在中进行配置  <br />
e7bcaa83f89c76ca0337f73d767e35887d306f73表示我们的node1节点的NodeID,26656表示节点的tcp端口
:::
:::caution
  种子节点(seeds)是中继他们知道的其他对等方地址的节点，这些节点不断地在网络上爬行以试图获得更多的对等点，种子节点的作用就是传递每个人的地址，且种子节点是不产于共识仅用来帮助将节点传播到网络中的节点 <br />
  注意：如果seeds和persistent_peers相交，用户将被警告种子可能会自动关闭连接，并且节点可能无法保持连接持
:::

### REST API
:::caution
  Note: This is an optional configuration.
:::
By default, the REST API is disabled. To enable the REST API, edit the ~/.treasurenetd/config/app.toml file, and set enable to true in the [api] section
```shell
###############################################################################
###                           API Configuration                             ###
###############################################################################
[api]
# Enable defines if the API server should be enabled.
enable = true
# Swagger defines if swagger documentation should automatically be registered.
swagger = false
# Address defines the API server to listen on.
address = "tcp://0.0.0.0:1317"
```

### 同步运行验证器节点
在 TreasureNet 上同步节点有三种主要方式；block sync、state sync和quick sync;
如果需要同步运行验证器，请参考[run a validator](./setup/run-a-validator.md);

|Sync|Data Integrity|
|--|--|
|State Sync|Minimal Historical Data|
|Quick Sync|Moderate Historical Data|
|Blocksync|Full Historical Data|
如果节点运营商希望运行一个完整的节点，则可以从头开始，但需要花费大量时间才能赶上进度。

### Start Treasurenetd

treasurenetd start --x-crisis-skip-assert-invariants

:::info
  🚧 Documentation is in progress.
:::
