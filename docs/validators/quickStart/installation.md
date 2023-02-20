---
sidebar_position: 1
---

## Install Binaries

TreasureNet是一款非常快速的POS区块链，并且整体兼容以太坊。TreasureNet集成看Tendermint和ethereum实现了POS+BFT的共识机制。

## 单节点部署

1. 确保您按照了go环境和git
:::caution
  ❗️ TreasureNet 构建需要安装[Go](https://golang.org/dl/) 版本1.18+
  Golang官网下载地址: https://golang.org/dl/
:::

2. 打开官网下载地址选择对应系统版本。

3. 进入安装包存放路径，在 ~ 下创建go文件夹，并进入go文件夹。
:::note
mkdir ~/go && cd ~/go
wget https://go.dev/dl/go1.18.linux-amd64.tar.gz
:::

4. 添加/usr/local/go/bin 目录到PATH变量中(linux中GOPATH环境变量配置)
:::note
在etc/profile或者vi .bashrc中写入并保存
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/BIN
更新一下配置文件
source etc/profile 或者 source .bashrc
查看环境变量
go env
:::

### Github

克隆代码并build treasurenet

```shell
    git clone https://github.com/treasurenetprotocol/treasurenet.git
    go env -w GO111MODULE=on
    cd treasurenet
    go mod tidy
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

