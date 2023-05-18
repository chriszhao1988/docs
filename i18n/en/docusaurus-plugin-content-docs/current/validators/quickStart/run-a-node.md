---
sidebar_position: 3
---

# Run a Node

## Automated deployment

在根目录执行init.sh来通过自动化脚本运行本地节点

```shell
    init.sh
```

:::caution
  ❗️自动化脚本将删除所有已安装的预先存在的二进制文件。如果要保留二进制文件和其他配置文件，请使用手动部署。
:::



## Manual deployment

### Start node

```shell
    treasurenetd start --json-rpc.enable=true --json-rpc.api="eth,web3,net"
```

### Key Management

运行一个节点每次使用相同的Key：替换 treasurenetd keys add $KEY 在 init.sh中。

```shell
    echo "your mnemonic here" | treasurenetd keys add $KEY --recover
```
:::caution
   treasurenet 现在只支持24个单词的助记词。
:::


你可以注册新的key/助记词：

```shell
    treasurenetd keys add $KEY
```
要将您的treasurenetd私钥导出为Ethereum私钥（例如和Metamask一起使用）

```shell
    treasurenetd keys unsafe-export-eth-key $KEY

```

有关key命令的更多信息，可以通过--help查询
```shell
    treasurenetd keys -h
```

### Clearing data from chain

#### Reset Data

您可以重置区块链数据，删除节点存储的地址（address book)，并重置priv_validator.json的创世状态。

:::caution
  ❗️如果您运行着一个validator节点，通常要十分小心的使用unsafe-reset-all命令。
   
  ❗️确保每个节点都有一个独立的priv_validator.json文件。不要尝试拷贝该文件从一个旧的节点到新的节点，使用相同的priv_validator.json文件在两个节点上将导致您的节点进行双重签名。
:::

首先， 删除所有过期文件并重置您的数据

```shell
    rm $HOME/.treasurenetd/config/addrbook.json $HOME/.treasurenetd/config/genesis.json
    treasurenetd tendermint unsafe-reset-all --home $HOME/.treasurenetd
```

您的节点现在在原始状态，同时保留原始的priv_validator.json和config.toml.如果您之前设置了任何，您的节点会尝试连接它们。

#### Delete Data

treasurenetd的二进制工具产生的数据默认存储在```~/.treasurenetd```中，使用如下命令可以删除存在的二进制文件和配置信息

```shell

    rm -rf ～/.treasurenetd

```
