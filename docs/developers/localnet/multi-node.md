---
sidebar_position: 2
---

# Multi Node

## Automated Localnet with Docker

### Build & Start

build start 一个包含4个node的test net.

```shell
make localnet-start
```

每个节点的端口都在下表中找到：

|Node ID|P2P Port|REST/Ethereum JSON-RPC Port|Websocket Port|
|--|--|--|--|
|node0|26656|8545|8546|
|node1|26659|8547|8548|
|node2|26661|8549|8550|
|node3|26663|8551|8552|

若要更新二进制文件，需要rebuild并且重启节点

命令将会在背后通过Docker compose 启动容器，你讲通过command line看到网络被创建：

```shell
...
Creating network "treasurenet_localnet" with driver "bridge"
Creating node0 ... done
Creating node2 ... done
Creating node1 ... done
Creating node3 ... done
```

### Stop Localnet

```shell
make localnet-stop
```

### Logging

```shell
# node0:daemon logs
docker exec node0 tail treasurenetd.log
```

### Interact with the Localnet

#### Ethereum JSON-RPC 和 Websocket 接口

要通过Websocket或者RPC/API于testnet交互，您需要发送请求到相应的端口：

您可以尝试发送一个请求通过curl，像是

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' -H "Content-Type: application/json" 127.0.0.1:8545
```

### Key and Accounts

要与treasurenetd交互并开始查询状态或者创建交易，您可以使用任何给定节点的treasurenetd目录作为您的主目录，像是：

```shell
treasurenetd keys list --home ./build/node0/treasurenetd
```
