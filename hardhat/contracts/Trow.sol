// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/0vix/IOErc20.sol";
import "./interfaces/0vix/IOMatic.sol";
import "./TrowStorage.sol";

contract Trow is TrowStorage, Context {
    using Counters for Counters.Counter;

    function createPool(address _token, string memory _ipfs) public {
        require(_tokens[_token].isListed, "Trow: Token is not listed");

        _poolCounter.increment();

        uint256 _id = _poolCounter.current();
        _pools[_id] = Pool(_id, _token, _msgSender(), _ipfs);
    }

    function poolDeposit(uint256 _poolId, uint256 _amount) public payable {
        Pool memory _pool = _pools[_poolId];
        require(_pool.id != 0, "Trow: Pool does not exist");

        _depositToken(_pool, _amount);

        _balances[_pool.id] += _amount;
        _deposits[_pool.id][_msgSender()] += _amount;
    }

    function poolWithdrawal(uint256 _poolId, uint256 _amount) public {
        Pool memory _pool = _pools[_poolId];
        require(_pool.id != 0, "Trow: Pool does not exist");

        require(
            _amount <= _balances[_poolId],
            "Trow: Not enough token in pool"
        );
        require(
            _amount <= _deposits[_poolId][_msgSender()],
            "Trow: Not enough token in user deposit"
        );

        _balances[_pool.id] -= _amount;
        _deposits[_pool.id][_msgSender()] -= _amount;

        _withdrawToken(_pool, _amount);
    }

    function addToken(
        address _address,
        address _oToken,
        bool _isErc20
    ) public {
        _tokens[_address] = Token(_isErc20, true, _oToken);
    }

    function getToken(address _address) public view returns (Token memory) {
        return _tokens[_address];
    }

    function getPoolBalance(uint256 _id) public view returns (uint256) {
        return _balances[_id];
    }

    function getUserBalance(uint256 _id) public view returns (uint256) {
        return _deposits[_id][_msgSender()];
    }

    function _depositToken(Pool memory _pool, uint256 _amount) internal {
        Token memory _token = _tokens[_pool.token];

        if (_token.isErc20) {
            require(
                _amount == msg.value,
                "Trow: Token sent is not equal to specified amount"
            );

            IOMatic _oMatic = IOMatic(_token.oToken);
            _oMatic.mint{value: msg.value}();
        } else {
            IERC20 _erc20 = IERC20(_pool.token);

            _erc20.transferFrom(_msgSender(), address(this), _amount);
            _erc20.approve(_token.oToken, _amount);

            IOErc20 _oErc20 = IOErc20(_token.oToken);
            _oErc20.mint(_amount);
        }
    }

    function _withdrawToken(Pool memory _pool, uint256 _amount) internal {
        Token memory _token = _tokens[_pool.token];

        if (_token.isErc20) {
            IOMatic _oMatic = IOMatic(_token.oToken);
            uint _status = _oMatic.redeemUnderlying(_amount);

            require(
                _status == 0,
                "Trow: An error occured while redeeming token"
            );

            payable(address(msg.sender)).transfer(_amount);
        } else {
            IERC20 _erc20 = IERC20(_pool.token);

            IOErc20 _oErc20 = IOErc20(_token.oToken);
            _oErc20.redeemUnderlying(_amount);

            _erc20.transfer(msg.sender, _amount);
        }
    }
}
