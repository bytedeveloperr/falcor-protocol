// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/aave/IWETHGateway.sol";
import "./interfaces/aave/IPool.sol";

contract SlingStorage {
    Counters.Counter internal _donationPoolCounter;

    IWETHGateway internal _WETHGateway;
    IPoolAddressesProvider internal _poolAddressProvider;

    mapping(address => Token) internal _tokens;
    mapping(uint256 => DonationPool) internal _donationPools;
    mapping(address => uint256) internal _balances;
    mapping(uint256 => uint256) internal _donationPoolBalances;
    mapping(uint256 => mapping(address => uint256)) internal _accountDeposits;

    struct DonationPool {
        uint256 id;
        address token;
        address creator;
    }

    struct Token {
        address addr;
        bool isErc20;
        bool isListed;
    }

    event CreateDonationPool(
        uint256 id,
        address indexed token,
        address indexed creator
    );
    event DonationPoolDeposit(
        uint256 poolId,
        uint256 amount,
        address indexed account
    );
    event DonationPoolWithdrawal(
        uint256 poolId,
        uint256 amount,
        address indexed account
    );
}
