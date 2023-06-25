---
sidebar_position: 1
---

# TN-Gateway

## Introduction

TN-Gateway is an important component of the TreasureNet blockchain. It provides data support to other peripheral tools, websites, and Dapps in TreasureNet through a Restful API interface. It ensures the credibility of the service caller's identity through interactive authentication (OAuth2). The data in the TN-Gateway comes from the DataProvider Module. This module collects and organizes data through event listening, blockchain query operations, and from other peripheral services (like blockchain explorers), and ultimately stores it in a database cluster server. The data provided by the TN Gateway includes related transaction records of USTN Finance, staking records, producer information, mining information, production data, token transaction records, user information, etc. It also offers common index, statistics, and sorting services. Peripheral service developers and Dapp developers can obtain these contents in accordance with the calling rules specified in the API documentation after obtaining permission.

## Who can use it?

TN-Gateway will soon open applications for the use of its API interface. Through simple registration and review, anyone can use it.

## What can it be used for?

TN-Gateway can provide you with a one-stop solution for querying on-chain data and even data analysis. Of course, TN-Gateway is continuously upgrading to provide more query information and more convenient query methods.

You can try using TN-Gateway to:

- Verify the production change curve of an anonymous oil well
- Conduct research and analysis for mining
- Query transaction sizes to understand trends
- etc.

## How is TN-Gateway secured?

#### Encryption protection for sensitive data

We use irreversible algorithms to conceal key information, which is very necessary because not all information can be disclosed unconditionally.

#### Admission and access control

The system will control access rights according to your different uses. This will ensure the security of the information while satisfying different user needs, and also avoid attacks or extortion due to unrestricted data flow.

## Why is the data from TN-Gateway trustworthy?

#### Reliable data source

Most of the data from the TN-Gateway comes from the event listening module (DataProvider) of the TreasureNet blockchain network, which ensures the reliability of the data source to the maximum extent because events are only thrown when transactions are executed normally.

#### TN-Gateway is open-source

You can view all the code of the TN-Gateway on [github](https://github.com/treasurenetprotocol). It was originally initiated by the TreasureNet Foundation and later contributed by netizens, which leaves almost no possibility of cheating.

We welcome all developers interested in TreasureNet to contribute code for this.
