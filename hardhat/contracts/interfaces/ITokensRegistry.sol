// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ITokensRegistry {
    function addToken(address _token) external;

    function disableToken(address _token) external;

    function enableToken(address _token) external;

    function removeToken(address _token) external;

    function isTokenEnabled(address _token) external view returns (bool);
}
