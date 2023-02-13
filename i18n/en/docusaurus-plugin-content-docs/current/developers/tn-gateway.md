---
sidebar_position: 3
---


# TN-Gateway


TN gateway 是TreasureNet 区块链公链中的一个重要的组成部分（组件）, 它为Treasurenet的其他周边工具、网站以及Dapp 通过Restful API接口提供数据支持, 通过交互认证(OAuth2), 确保服务调用方的身份可信. TN-Gateway 中的数据来源自 DataProvider Module . 这个模块通过事件监听、区块链查询操作、以及从其他周边服务(例如区块浏览器)发掘并整理数据, 最终存储于数据库集群服务器之中.TN Gateway 对外提供的数据,包括USTN Finance的相关交易记录、staking相关记录、生产商信息、矿产信息、产量数据、token的交易记录、用户信息等数据, 并提供常见的索引、统计、排序服务. 周边服务的开发者、Dapp的开发者可以在获得许可后, 根据API说明文档中指定的调用规则获取这些内容.


## 如何连接 TN-Gateway

:::caution
TN-Gateway 公开连接尚未开启。
:::

首先您需要获得client_id和client_secret,以供您通过TN-gateway的Oauth2认证，这是最开始的一步。

接下来您需要查阅[API](https://),寻找您拥有权限并想要获取的数据，并发起RestfulAPI请求。

系统会根据实际情况在data中返回您的结果


## 常见错误

|code|description|solution|
|--|--|--|
|-1|system error|Contact us via social media|
|-2|common error|Determining error conditions from error messages|
|-3|Params error|Incorrect parameters, you may need to check the API description to ensure that the number and type of parameters are correct.|
|-4|Permission error|Please check whether your account has permission for this interface.|
|-5|authorized error|Authentication failed, or authentication error. You need to check whether the access_token exists and whether it has expired. You can try to obtain the token again and initiate the query again.|
