import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('TechsForDummies', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const TechsForDummies = await hre.ethers.getContractFactory(
            'TechsForDummies',
        );
        const techsForDummies = await TechsForDummies.deploy();

        return { techsForDummies, owner, otherAccount };
    }

    it('Should count = 0', async function () {
        const { techsForDummies, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const count = await techsForDummies.count();

        expect(count).to.equal(0);
    });
});
