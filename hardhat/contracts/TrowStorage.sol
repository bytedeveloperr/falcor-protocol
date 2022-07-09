// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract TrowStorage {
    Counters.Counter internal _poolCounter;

    mapping(uint256 => Pool) internal _pools;
    mapping(address => Token) internal _tokens;
    mapping(uint256 => uint256) internal _balances;
    mapping(uint256 => mapping(address => uint256)) internal _deposits;

    struct Pool {
        uint256 id;
        address token;
        address creator;
        string ipfs;
    }

    struct Token {
        bool isErc20;
        bool isListed;
        address oToken;
    }
}
