---
sidebar_position: 4
---

# Mint

## Introduction

mint 模块在区块在区块开始执行之前负责创建代币，即铸币放生在本模块的BeginBlocker()中，用来奖励参与权益证明共识过程的验证者(参见[distribution模块](./distribution.md))

## 参数

* "blocks_per_year" - The expected number of blocks being produced per year;
* "goal_bonded" - Goal of bonded tokens in percentage;
* "inflation_max" - Maximum annual inflation rate;
* "inflation_min" - Minimum annual inflation rate;
* "inflation_rate_change" - Maximum annual change in inflation rate;
* "mint_denom" - 链上资产种类.
* "height_block" - Monitoring height.
* "perReward" - Basic rewards.

每个周期都会重新计算目标年通货膨胀率

## Queries

   > treasurenetd query mint params --home --output json | jq 查询铸币参数


```json
{
    "blocks_per_year":"6311520",
    "goal_bonded":"0.670000000000000000",
    "height_block":"0",  
    "inflation_max":"0.200000000000000000",
    "inflation_min":"0.070000000000000000",
    "inflation_rate_change":"0.130000000000000000",
    "mint_denom":"aunit",
    "per_reward":"0"
}
```

   > treasurenetd query mint annual-provisions 查询当前的铸币

   >5000000000000000000.000000000000000000





