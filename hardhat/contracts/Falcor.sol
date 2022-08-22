// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "./interfaces/chainlink/KeeperCompatibleInterface.sol";
import "./interfaces/aave/IAToken.sol";
import "./interfaces/ITokensRegistry.sol";
import "./FalcorStorage.sol";

contract Falcor is FalcorStorage, KeeperCompatibleInterface, Context {
    using Counters for Counters.Counter;

    constructor(
        address poolAddressesProvider_,
        address tokensRegistry_,
        uint256 distributioninterval_
    ) {
        _poolAddressProvider = IPoolAddressesProvider(poolAddressesProvider_);
        _tokensRegistry = ITokensRegistry(tokensRegistry_);
        _distributioninterval = distributioninterval_;
    }

    function createDonationPool(address _token, address _beneficiary)
        public
        ensureTokenIsEnabled(_token)
    {
        _donationPoolCounter.increment();
        uint256 donationPoolId = _donationPoolCounter.current();

        _donationPools[donationPoolId] = DonationPool(
            donationPoolId,
            _token,
            _msgSender(),
            _beneficiary
        );

        emit CreateDonationPool(
            donationPoolId,
            _token,
            _msgSender(),
            _beneficiary
        );
    }

    function deposit(uint256 _donationPoolId, uint256 _amount) public {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);

        _depositToken(donationPool, _amount);
        _recordDepositData(donationPool, _amount);

        emit DonationPoolDeposit(donationPool.id, _amount, _msgSender());
    }

    function withdraw(uint256 _donationPoolId, uint256 _amount) public {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);

        require(
            _amount <= _getUserDeposit(donationPool.id, _msgSender()),
            "Falcor: Insufficient deposit balance"
        );
        require(
            _amount <= _getDonationPoolDeposit(donationPool.id),
            "Falcor: Insufficient donation balance"
        );

        _withdrawToken(donationPool, _amount);
        _recordWithdrawData(donationPool, _amount);

        emit DonationPoolWithdrawal(donationPool.id, _amount, _msgSender());
    }

    function getPoolAddress() public view returns (address) {
        return _poolAddressProvider.getPool();
    }

    function getDonationPoolYield(uint256 _donationPoolId)
        public
        view
        returns (uint256)
    {
        return _calculateDonationPoolYield(_donationPoolId);
    }

    function getDonationPool(uint256 _donationPoolId)
        public
        view
        returns (DonationPool memory)
    {
        return _donationPools[_donationPoolId];
    }

    function getDonationPoolDeposit(uint256 _donationPoolId)
        public
        view
        returns (uint256)
    {
        return _getDonationPoolDeposit(_donationPoolId);
    }

    function getTokenTotalYield(address _token) public view returns (uint256) {
        return _getTokenTotalYield(_token);
    }

    function getTokenTotalBalance(address _token)
        public
        view
        returns (uint256)
    {
        return _getTokenTotalBalance(_token);
    }

    function getUserDonationPoolDeposit(uint256 _donationPoolId, address _user)
        public
        view
        returns (uint256)
    {
        return _getUserDeposit(_donationPoolId, _user);
    }

    function getDonationPoolsCount() public view returns (uint256) {
        return _donationPoolCounter.current();
    }

    function checkUpkeep(bytes calldata)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 totalDonationPools = _donationPoolCounter.current();

        uint256[] memory amounts = new uint256[](totalDonationPools);
        DonationPool[] memory donationPools = new DonationPool[](
            totalDonationPools
        );

        if (
            block.timestamp - _lastDistributionTimestamp >=
            _distributioninterval
        ) {
            upkeepNeeded = true;

            for (uint256 i = 0; i < totalDonationPools; i++) {
                uint256 poolId = i + 1;

                DonationPool memory donationPool = _donationPools[poolId];

                uint256 yieldAmount = _calculateDonationPoolYield(poolId);
                IERC20Metadata token = IERC20Metadata(donationPool.token);

                if (yieldAmount > 0) {
                    amounts[i] = yieldAmount / (10**token.decimals());
                    donationPools[i] = donationPool;
                }
            }
        } else {
            upkeepNeeded = false;
        }

        performData = abi.encode(donationPools, amounts);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        (DonationPool[] memory donationPools, uint256[] memory amounts) = abi
            .decode(performData, (DonationPool[], uint256[]));

        require(
            donationPools.length == amounts.length,
            "Donation pools and Amounts array length must be the same"
        );

        for (uint256 i = 0; i < donationPools.length; i++) {
            _withdrawToken(donationPools[i], amounts[i]);
        }

        _lastDistributionTimestamp = block.timestamp;
    }

    function _depositToken(DonationPool memory _pool, uint256 _amount)
        internal
    {
        IPool pool = IPool(getPoolAddress());

        IERC20Metadata token = IERC20Metadata(_pool.token);

        require(
            token.allowance(_msgSender(), address(this)) >= _amount,
            "Falcor: Insufficient token allowance"
        );

        token.transferFrom(_msgSender(), address(this), _amount);

        token.approve(address(pool), _amount);
        pool.supply(_pool.token, _amount, address(this), 0);
    }

    function _recordDepositData(DonationPool memory _pool, uint256 _amount)
        internal
    {
        _totalBalances[_pool.token] += _amount;
        _donationPoolDeposits[_pool.id] += _amount;
        _userDeposits[_pool.id][_msgSender()] += _amount;
    }

    function _withdrawToken(DonationPool memory _pool, uint256 _amount)
        internal
    {
        IPool pool = IPool(getPoolAddress());
        pool.withdraw(_pool.token, _amount, _msgSender());
    }

    function _recordWithdrawData(DonationPool memory _pool, uint256 _amount)
        internal
    {
        _totalBalances[_pool.token] -= _amount;
        _donationPoolDeposits[_pool.id] -= _amount;
        _userDeposits[_pool.id][_msgSender()] -= _amount;
    }

    function _getUserDeposit(uint256 _donationPoolId, address _user)
        internal
        view
        returns (uint256)
    {
        return _userDeposits[_donationPoolId][_user];
    }

    function _getDonationPoolDeposit(uint256 _donationPoolId)
        internal
        view
        returns (uint256)
    {
        return _donationPoolDeposits[_donationPoolId];
    }

    function _getTokenTotalBalance(address _token)
        internal
        view
        returns (uint256)
    {
        return _totalBalances[_token];
    }

    function _getTokenTotalYield(address _token)
        internal
        view
        returns (uint256)
    {
        IPool pool = IPool(getPoolAddress());

        uint256 totalTokenBalance = _getTokenTotalBalance(_token);
        DataTypes.ReserveData memory reserveData = pool.getReserveData(_token);

        IAToken aToken = IAToken(reserveData.aTokenAddress);
        uint256 aTokenBalance = aToken.balanceOf(address(this));

        return aTokenBalance - totalTokenBalance;
    }

    function _calculateDonationPoolYield(uint256 _donationPoolId)
        internal
        view
        returns (uint256)
    {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);
        uint256 poolDeposit = _getDonationPoolDeposit(_donationPoolId);

        if (poolDeposit == 0) {
            return 0;
        }

        IERC20Metadata token = IERC20Metadata(donationPool.token);
        uint256 tokenBalance = _getTokenTotalBalance(donationPool.token);
        uint256 tokenYield = _getTokenTotalYield(donationPool.token);

        return
            ((poolDeposit * 10**token.decimals()) / tokenBalance) * tokenYield;
    }

    modifier ensureTokenIsEnabled(address _token) {
        bool token = _tokensRegistry.isTokenEnabled(_token);
        require(token, "Falcor: Token is not enabled");

        _;
    }
}
