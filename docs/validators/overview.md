---
sidebar_position: 1
---

# Introduction

## 什么是Validator

TreasureNet 网络的关键特征是去中心化，换句话说，我们treasurenet区块链不是由中央服务器控制的，而是由一组节点服务器控制，为了确保所有网络交易都有效，节点的全球分布越多，攻击难度就越大。

如何就交易有效性达成一致?

最初的共识算法是比特币的工作量证明(pow)，随着区块链的发展pow共识算法已经无法满足日益增长的交易量，新的权益证明(pos)成为主要的共识算法，pos需要节点成为广为人知的validator，然后锁定或者抵押代币成为权重，然后通过pos共识算法依次选择validator来验证交易生成区块。

TreasureNet 依赖于一组负责在区块链中提交新区块的validator节点，这些Validator通过广播消息参与共识协议，其中包含由每个validator私钥签署的加密数字签名。

Validator候选人可以绑定它们的Unit token，并让token的其他持有者将token委托或者质押给它们。一开始，TN将由基金会负责的8个节点作为validator，随着越来越多的节点加入，validator将从众多候选人中抽选一部分成为ActiveValidator，参与共识。

Active Validator 及其委托人将通过执行共识协议获得区块奖励（Unit Token）。

如果Validator双重签名、经常离线或者其他违规行为，它们质押的Unit Token可能会被扣除，或者停止他的validator身份。处罚取决于违规的严重程度。

## Hardware

Validator候选人应该为期节点配备冗余电源、连接和数据存储备份等设备。像是冗余网络接入设备、冗余硬盘驱动器和故障转移小型服务器。

随着网络的不断的成长，带宽、CPU和内存的需求将会增加。强烈建议使用大型硬盘设备来存储区块链的全部账本数据

## 支持的操作系统

- linux/x86_64 
- linux/arm64

TN理论上支持更多的操作系统，但是它们尚未经过完整的测试，我们将在未来开放更多操作系统，像是常见的windows和macOS(darwin)

## 最低要求

要运行主网或测试网的validator节点，您需要一台具有以下硬件要求的服务器设备：

- 4 or more physical CPU cores
- At least 500GB of HDD disk storage
- At least 16GB of Memory(RAM)
- At least 100mbps network

随着区块链使用量的增长，对服务器的要求也可能会增加，因此您也应该制定更新服务器的计划。

## 公开信息

建立一个专门的Validator网站、社交账户（比如Twitter），在Discord上说明您打算成为Validator。这很重要，因为用户希望获得它们stake到TN的validator的实体信息。


