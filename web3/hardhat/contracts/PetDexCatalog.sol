// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract PetDexCatalog {
    struct Pet {
        string name;
        string description;
        uint32 yearBirth;
    }

    uint32 private nextId = 0;
    mapping(uint32 => Pet) public pets;

    address private immutable owner;

    uint256 public count;

    constructor() {
        owner = msg.sender;
    }

    function addPet(Pet memory newPet) public {
        nextId++;
        pets[nextId] = newPet;
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

    function editPet(uint32 id, Pet memory newPet) public {
        Pet memory oldPet = pets[id];

        if (!compare(oldPet.name, newPet.name) && !compare(newPet.name, ''))
            pets[id].name = newPet.name;

        if (
            !compare(oldPet.description, newPet.description) &&
            !compare(newPet.description, '')
        ) pets[id].description = newPet.description;

        if (oldPet.yearBirth != newPet.yearBirth && newPet.yearBirth > 0)
            pets[id].yearBirth = newPet.yearBirth;
    }

    function removePet(uint32 id) public restricted {
        if (pets[id].yearBirth > 0) {
            delete pets[id];
            count--;
        }
    }

    modifier restricted() {
        require(owner == msg.sender, "You don't have permission.");
        _;
    }
}
