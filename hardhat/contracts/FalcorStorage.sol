// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/aave/IWETHGateway.sol";
import "./interfaces/aave/IPool.sol";
import "./interfaces/ITokensRegistry.sol";

contract FalcorStorage {
    uint256 internal _distributioninterval;
    uint256 internal _lastDistributionTimestamp;
    Counters.Counter internal _donationPoolCounter;

    IPoolAddressesProvider internal _poolAddressProvider;
    ITokensRegistry internal _tokensRegistry;

    mapping(address => uint256) internal _totalBalances;
    mapping(uint256 => DonationPool) internal _donationPools;
    mapping(uint256 => uint256) internal _donationPoolDeposits;
    mapping(uint256 => mapping(address => uint256)) internal _userDeposits;

    struct DonationPool {
        uint256 id;
        address token;
        address creator;
        address beneficiary;
    }

    event CreateDonationPool(
        uint256 id,
        address indexed token,
        address indexed creator,
        address indexed beneficiary
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
