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

    function createStash(address _token) public {
        require(_tokens[_token].isListed, "Sling: Token is not listed");

        _stashCounter.increment();

        uint256 stashId = _stashCounter.current();
        _stashes[stashId] = Stash(stashId, _token, _msgSender());
    }

    function deposit(uint256 _stashId, uint256 _amount) public payable {
        Stash memory stash = getStash(_stashId);
        Token memory stashToken = getToken(stash.token);

        IPool pool = IPool(getPoolAddress());

        if (stashToken.isErc20) {
            IERC20 token = IERC20(stash.token);

            require(
                token.allowance(_msgSender(), address(this)) >= _amount,
                "Sling: Insufficient token allowance"
            );

            token.transferFrom(_msgSender(), address(this), _amount);
            token.approve(address(pool), _amount);

            pool.supply(stash.token, _amount, address(this), 0);
        } else {
            _WETHGateway.depositETH{value: msg.value}(
                getPoolAddress(),
                msg.sender,
                0
            );
        }

        _balances[stash.token] += _amount;
        _stashBalances[stash.id] += _amount;
        _accountDeposits[stash.id][_msgSender()] += _amount;
    }

    function withdraw(uint256 _stashId, uint256 _amount) public payable {
        Stash memory stash = getStash(_stashId);
        Token memory stashToken = getToken(stash.token);

        IPool pool = IPool(getPoolAddress());

        require(
            _amount <= getAccountStashDeposit(_stashId, _msgSender()),
            "Sling: Insufficient deposit balance"
        );
        require(
            _amount <= getStashBalance(_stashId),
            "Sling: Insufficient stash balance"
        );

        if (stashToken.isErc20) {
            IERC20 token = IERC20(stash.token);

            pool.withdraw(stash.token, _amount, address(this));
            token.transfer(_msgSender(), _amount);
        } else {
            _WETHGateway.withdrawETH(getPoolAddress(), _amount, address(this));
            payable(_msgSender()).transfer(_amount);
        }

        _balances[stash.token] -= _amount;
        _stashBalances[stash.id] -= _amount;
        _accountDeposits[stash.id][_msgSender()] -= _amount;
    }

    function getPoolAddress() public view returns (address) {
        return _poolAddressProvider.getPool();
    }

    function getStashYieldBalance(uint256 _stashId)
        public
        view
        returns (uint256)
    {
        Stash memory stash = getStash(_stashId);
        uint256 stashBalance = getStashBalance(_stashId);
        uint256 poolBalance = _balances[stash.token];

        IPool pool = IPool(getPoolAddress());
        DataTypes.ReserveData memory reserveData = pool.getReserveData(
            stash.token
        );

        IAToken aToken = IAToken(reserveData.aTokenAddress);
        uint256 aTokenBalance = aToken.balanceOf(address(this));

        uint256 balanceIncrease = aTokenBalance - poolBalance;
        return (stashBalance / poolBalance) * balanceIncrease;
    }

    function getStash(uint256 _stashId) public view returns (Stash memory) {
        return _stashes[_stashId];
    }

    function getStashBalance(uint256 _stashId) public view returns (uint256) {
        return _stashBalances[_stashId];
    }

    function getAccountStashDeposit(uint256 _stashId, address _account)
        public
        view
        returns (uint256)
    {
        return _accountDeposits[_stashId][_account];
    }

    function getToken(address _address) public view returns (Token memory) {
        return _tokens[_address];
    }

    function addToken(address _address, bool isEr20) public {
        _tokens[_address] = Token(_address, isEr20, true);
    }
}
