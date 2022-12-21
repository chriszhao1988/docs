# Remix: Deploying a Smart Contract

[Remix](http://remix.ethereum.org/) is an in-browser IDE for [Solidity](https://github.com/ethereum/solidity) smart contracts. In this guide, we will learn how to deploy a contract to a running Treasurenet network through Remix and interact with it.

## Connect to Remix

:::info
如果您尚未准备就绪，请参照Metamask guide相关文档中的步骤连接您的metamask到Treasurenet Blockchain network（最好是testnet，这将为您减少开销）. 并确保您的账户拥有一定的UNIT token。
:::

打开[Remix](http://remix.ethereum.org/)IDE 站点， 会有一些默认文件展示在窗口中。

![remix_1](/img/docs/remix_1.png)

在最左边的栏中，选择 Solidity Compiler 并编译合约。

接下来选择"Deploy and Run"选项。选择"Injected Provider - Metamask"作为Environment. 这会唤起您的metamask来验证连接。

完成之后 您可以在Account中看到您的账户地址，Token的余量等信息。

![remix_2](/img/docs/remix_2.png)

此时点击Deploy 即可完成部署操作。
