// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract TechsForDummies {
    struct Tech {
        string name;
        string description;
        uint32 adopters;
    }

    uint32 private nextId = 0;
    mapping(uint32 => Tech) public techs;

    address private immutable owner;

    uint256 public count;

    constructor() {
        owner = msg.sender;
    }

    function addTech(Tech memory newTech) public {
        nextId++;
        techs[nextId] = newTech;
        count++;
    }

    function compare(
        string memory str1,
        string memory str2
    ) private pure returns (bool) {
        bytes memory arrA = bytes(str1);
        bytes memory arrB = bytes(str2);
        return arrA.length == arrB.length && keccak256(arrA) == keccak256(arrB);
    }

    function editTech(uint32 id, Tech memory newTech) public {
        Tech memory oldTech = techs[id];

        if (!compare(oldTech.name, newTech.name) && !compare(newTech.name, ''))
            techs[id].name = newTech.name;

        if (
            !compare(oldTech.description, newTech.description) &&
            !compare(newTech.description, '')
        ) techs[id].description = newTech.description;

        if (oldTech.adopters != newTech.adopters && newTech.adopters > 0)
            techs[id].adopters = newTech.adopters;
    }

    function removeTech(uint32 id) public restricted {
        if (techs[id].adopters > 0) {
            delete techs[id];
            count--;
        }
    }

    modifier restricted() {
        require(owner == msg.sender, "You don't have permission.");
        _;
    }
}
