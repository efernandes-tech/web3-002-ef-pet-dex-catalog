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

    it('Should add tech', async function () {
        const { techsForDummies, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await techsForDummies.addTech({
            name: 'React',
            description:
                'React is a JavaScript library for building user interfaces with components.',
            adopters: 1000,
        });

        const count = await techsForDummies.count();

        expect(count).to.equal(1);
    });

    it('Should edit tech', async function () {
        const { techsForDummies, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await techsForDummies.addTech({
            name: 'React.js',
            description:
                'React is a JavaScript library for building user interfaces with components.',
            adopters: 1000,
        });

        await techsForDummies.editTech(1, {
            name: 'React',
            description:
                'React is a JavaScript library for building user interfaces with components.',
            adopters: 2100,
        });

        const tech = await techsForDummies.techs(1);

        expect(tech.name).to.equal('React');
    });

    it('Should remove tech', async function () {
        const { techsForDummies, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await techsForDummies.addTech({
            name: 'React.js',
            description:
                'React is a JavaScript library for building user interfaces with components.',
            adopters: 1000,
        });

        await techsForDummies.removeTech(1);

        const count = await techsForDummies.count();
        expect(count).to.equal(0);
    });

    it('Should NOT remove tech', async function () {
        const { techsForDummies, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = techsForDummies.connect(otherAccount);

        await expect(instance.removeTech(1)).to.be.revertedWith(
            "You don't have permission.",
        );
    });
});
