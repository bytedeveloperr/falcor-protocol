// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/aave/IAToken.sol";
import "./SlingStorage.sol";

contract Sling is SlingStorage, Context {
    using Counters for Counters.Counter;

    constructor(
        address _poolAddressesProviderAddress,
        address _WETHGatewayAddress
    ) {
        _poolAddressProvider = IPoolAddressesProvider(
            _poolAddressesProviderAddress
        );
        _WETHGateway = IWETHGateway(_WETHGatewayAddress);
    }

    function createDonationPool(address _token) public {
        require(_tokens[_token].isListed, "Sling: Token is not listed");

        _donationPoolCounter.increment();

        uint256 donationPoolId = _donationPoolCounter.current();
        _donationPools[donationPoolId] = DonationPool(
            donationPoolId,
            _token,
            _msgSender()
        );

        emit CreateDonationPool(donationPoolId, _token, _msgSender());
    }

    function deposit(uint256 _donationPoolId, uint256 _amount) public payable {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);
        Token memory donationPoolToken = getToken(donationPool.token);

        IPool pool = IPool(getPoolAddress());

        if (donationPoolToken.isErc20) {
            IERC20 token = IERC20(donationPool.token);

            require(
                token.allowance(_msgSender(), address(this)) >= _amount,
                "Sling: Insufficient token allowance"
            );

            token.transferFrom(_msgSender(), address(this), _amount);
            token.approve(address(pool), _amount);

            pool.supply(donationPool.token, _amount, address(this), 0);
        } else {
            _WETHGateway.depositETH{value: msg.value}(
                getPoolAddress(),
                msg.sender,
                0
            );
        }

        _balances[donationPool.token] += _amount;
        _donationPoolBalances[donationPool.id] += _amount;
        _accountDeposits[donationPool.id][_msgSender()] += _amount;

        emit DonationPoolDeposit(donationPool.id, _amount, _msgSender());
    }

    function withdraw(uint256 _donationPoolId, uint256 _amount) public payable {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);
        Token memory donationPoolToken = getToken(donationPool.token);

        IPool pool = IPool(getPoolAddress());

        require(
            _amount <=
                getAccountDonationPoolDeposit(_donationPoolId, _msgSender()),
            "Sling: Insufficient deposit balance"
        );
        require(
            _amount <= getDonationPoolBalance(_donationPoolId),
            "Sling: Insufficient donationPool balance"
        );

        if (donationPoolToken.isErc20) {
            IERC20 token = IERC20(donationPool.token);

            pool.withdraw(donationPool.token, _amount, address(this));
            token.transfer(_msgSender(), _amount);
        } else {
            _WETHGateway.withdrawETH(getPoolAddress(), _amount, address(this));
            payable(_msgSender()).transfer(_amount);
        }

        _balances[donationPool.token] -= _amount;
        _donationPoolBalances[donationPool.id] -= _amount;
        _accountDeposits[donationPool.id][_msgSender()] -= _amount;

        emit DonationPoolWithdrawal(donationPool.id, _amount, _msgSender());
    }

    function getPoolAddress() public view returns (address) {
        return _poolAddressProvider.getPool();
    }

    function getDonationPoolYieldBalance(uint256 _donationPoolId)
        public
        view
        returns (uint256)
    {
        DonationPool memory donationPool = getDonationPool(_donationPoolId);
        uint256 donationPoolBalance = getDonationPoolBalance(_donationPoolId);
        uint256 poolBalance = _balances[donationPool.token];

        IPool pool = IPool(getPoolAddress());
        DataTypes.ReserveData memory reserveData = pool.getReserveData(
            donationPool.token
        );

        IAToken aToken = IAToken(reserveData.aTokenAddress);
        uint256 aTokenBalance = aToken.balanceOf(address(this));

        uint256 balanceIncrease = aTokenBalance - poolBalance;
        return (donationPoolBalance / poolBalance) * balanceIncrease;
    }

    function getDonationPool(uint256 _donationPoolId)
        public
        view
        returns (DonationPool memory)
    {
        return _donationPools[_donationPoolId];
    }

    function getDonationPoolBalance(uint256 _donationPoolId)
        public
        view
        returns (uint256)
    {
        return _donationPoolBalances[_donationPoolId];
    }

    function getAccountDonationPoolDeposit(
        uint256 _donationPoolId,
        address _account
    ) public view returns (uint256) {
        return _accountDeposits[_donationPoolId][_account];
    }

    function getToken(address _address) public view returns (Token memory) {
        return _tokens[_address];
    }

    function addToken(address _address, bool isEr20) public {
        _tokens[_address] = Token(_address, isEr20, true);
    }
}
