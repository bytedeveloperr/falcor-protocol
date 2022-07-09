//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./IOToken.sol";

interface IOMatic is IOToken {
    /*** User Interface ***/

    function mint() external payable;

    function redeem(uint256 redeemTokens) external returns (uint256);

    function redeemUnderlying(uint256 redeemAmount) external returns (uint256);

    function borrow(uint256 borrowAmount) external returns (uint256);

    function repayBorrow() external payable;

    function repayBorrowBehalf(address borrower) external payable;

    function liquidateBorrow(address borrower, IOToken oTokenCollateral)
        external
        payable;

    /*** Admin Functions ***/

    function _addReserves() external payable returns (uint256);
}
