---
sidebar_position: 4
---

# Join main-net

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

## 初始化链

为节点选择一个自定义的名称并开始初始化。<font color=#A9A9A9>init</font>命令会默认在~下创建.treasurenetd文件，包含config和data,在config中最重要的配置文件为config.toml和app.toml
```shell
treasurenetd init <moniker-name>
```
:::caution
  Monikers 只能包含 ASCII 字符。不支持使用 Unicode 字符，这会导致节点无法访问。
:::

## genesis.json

节点初始化后，下载创世文件并移动到~/config/genesis.json
:::note
wget https://raw.githubusercontent.com/cosmos/mainnet/master/genesis/genesis.cosmoshub-4.json.gz  <br />
gzip -d genesis.json.gz  <br />
mv genesis.json ~/.treasurenetd/config/genesis.json
:::

## 配置对等节点
```shell
treasurenetd keys add <validator> --keyring-backend file --algo info 2>> /data/validator-phrases    #---添加秘钥来保护自己的账户 
treasurenetd keys add <orchestrator> --keyring-backend file --algo info 2>> /data/orchestrator-phrases #---添加秘钥来保护中继器上的账户
treasurenetd eth_keys add --keyring-backend test >> /data/validator-eth-keys    #---添加秘钥来保护以太坊的账户
treasurenetd init <Moniler_name> --chain-id tets_9000-1 #---初始化NODE会在$HOME目录下生产.treasurenetd文件，该文件下包含
treasurenetd gentx 10000000unit --moniker <Moniker_ame> --chain-id=test_9000-1 --ip <节点IP或者域名> my-key-name 158000000000000000000aunit eth_address orchestrator_address  #---创建gentx
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
persistent_peers = "e7bcaa83f89c76ca0337f73d767e35887d306f73@node1.treasurenet.io:26656,dbb1c31663f1b478e9a289d60bbf1f91709a2e87@node2.treasurenet.io:26656,a4ce8692ace5dc88daa4ad0f497cd5e0aaa3da5e@node3.treasurenet.io:26656,....."
```
:::note
启动时，节点将需要连接到对等节点。如果节点运营商有兴趣将特定节点设置为种子或持久对等节点，则可以在中进行配置  <br />
e7bcaa83f89c76ca0337f73d767e35887d306f73表示我们的node1节点的NodeID,26656表示节点的tcp端口
:::
:::caution
  种子节点(seeds)是中继他们知道的其他对等方地址的节点，这些节点不断地在网络上爬行以试图获得更多的对等点，种子节点的作用就是传递每个人的地址，且种子节点是不产于共识仅用来帮助将节点传播到网络中的节点 <br />
  注意：如果seeds和persistent_peers相交，用户将被警告种子可能会自动关闭连接，并且节点可能无法保持连接持
:::
:::info
  🚧 Documentation is in progress.
:::
