// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GatekeeperTwo {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin);
        _;
    }

    modifier gateTwo() {
        uint x;
        assembly {
            x := extcodesize(caller())
        }
        require(x == 0);
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^
                uint64(_gateKey) ==
                type(uint64).max
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }

    function gateTwoTest() public view {
        uint x;
        assembly {
            x := extcodesize(caller())
        }
        require(x == 0);
    }

    function gateThreeTest(bytes8 _gateKey) public view {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^
                uint64(_gateKey) ==
                type(uint64).max
        );
    }
}

contract GatekeeperTwoAttacker {
    constructor(address _gatekeeperTwoAddress) {
        GatekeeperTwo gatekeeperTwoContract = GatekeeperTwo(
            _gatekeeperTwoAddress
        );
        bytes8 gateKey = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                type(uint64).max
        );
        gatekeeperTwoContract.enter(gateKey);
    }
}
