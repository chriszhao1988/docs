---
sidebar_position: 1
---

# Installation

:::caution
  ❗️ TreasureNet 构建需要安装[Go](https://golang.org/dl/) 版本1.18+
:::


## Install Binaries

### Github

克隆代码并build treasurenet

```shell
    git clone https://github.com/treasurenetprotocol/treasurenet.git
    cd treasurenet
    make install
    
```
检查是否正确安装

```shell
    treasurenetd version
```

### Docker

```shell
    make build-docker
```
```shell
    docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenet:latest treasurenetd version
    
    # To initialize
    # docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenetd:latest treasurenetd init test-chain --chain-id test_9000-2
    
    # To run
    # docker run -it -p 26657:26657 -p 26656:26656 -v ~/.treasurenetd/:/root/.treasurenetd tn/treasurenetd:latest treasurenetd start

```

