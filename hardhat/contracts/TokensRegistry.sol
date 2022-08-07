// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokensRegistry is Ownable {
    mapping(address => bool) internal _tokens;

    function addToken(address _token)
        external
        onlyOwner
        ensureTokenDoesNotExists(_token)
    {
        _addToken(_token);
    }

    function disableToken(address _token)
        external
        onlyOwner
        ensureTokenExists(_token)
    {
        _disableToken(_token);
    }

    function enableToken(address _token)
        external
        onlyOwner
        ensureTokenExists(_token)
    {
        _enableToken(_token);
    }

    function removeToken(address _token)
        external
        onlyOwner
        ensureTokenExists(_token)
    {
        delete _tokens[_token];
    }

    function isTokenEnabled(address _token) external view returns (bool) {
        return _tokens[_token];
    }

    function _addToken(address _token) internal {
        require(_token != address(0), "aToken cannot be zero the address");

        _tokens[_token] = true;
    }

    function _enableToken(address _token) internal {
        require(!_tokens[_token], "Token is already enabled");

        _tokens[_token] = true;
    }

    function _disableToken(address _token) internal {
        require(_tokens[_token], "Token is already disabled");

        _tokens[_token] = false;
    }

    modifier ensureTokenExists(address _token) {
        require(_tokens[_token], "Token does not exist");

        _;
    }

    modifier ensureTokenDoesNotExists(address _token) {
        require(!_tokens[_token], "Token already exists");

        _;
    }
}
