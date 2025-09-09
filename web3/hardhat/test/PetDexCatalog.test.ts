import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';
import { expect } from 'chai';
import hre from 'hardhat';

describe('PetDexCatalog', function () {
    async function deployFixture() {
        const [owner, otherAccount] = await hre.ethers.getSigners();

        const PetDexCatalog = await hre.ethers.getContractFactory(
            'PetDexCatalog',
        );

        const petDexCatalog = await PetDexCatalog.deploy();

        return { petDexCatalog, owner, otherAccount };
    }

    it('Should count = 0', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const count = await petDexCatalog.count();

        expect(count).to.equal(0);
    });

    it('Should add pet', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await petDexCatalog.addPet({
            name: 'Loki',
            description: 'Small black dog who acts like a tiger.',
            yearBirth: 2021,
        });

        const count = await petDexCatalog.count();

        expect(count).to.equal(1);
    });

    it('Should edit pet', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await petDexCatalog.addPet({
            name: 'Thor',
            description: 'Small yellow dog who acts like a lion.',
            yearBirth: 2021,
        });

        await petDexCatalog.editPet(1, {
            name: 'Loki',
            description: 'Small black dog who acts like a tiger.',
            yearBirth: 2021,
        });

        const pet = await petDexCatalog.pets(1);

        expect(pet.name).to.equal('Loki');
    });

    it('Should remove pet', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await petDexCatalog.addPet({
            name: 'Loki',
            description: 'Small black dog who acts like a tiger.',
            yearBirth: 2021,
        });

        await petDexCatalog.removePet(1);

        const count = await petDexCatalog.count();
        expect(count).to.equal(0);
    });

    it('Should NOT remove pet', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        const instance = petDexCatalog.connect(otherAccount);

        await expect(instance.removePet(1)).to.be.revertedWith(
            "You don't have permission.",
        );
    });

    it('Should edit same pet', async function () {
        const { petDexCatalog, owner, otherAccount } = await loadFixture(
            deployFixture,
        );

        await petDexCatalog.addPet({
            name: 'Loki',
            description: 'Small black dog who acts like a tiger.',
            yearBirth: 2021,
        });

        await petDexCatalog.editPet(1, {
            name: 'Thor',
            description: 'Small yellow dog who acts like a lion.',
            yearBirth: 2021,
        });

        const instance = petDexCatalog.connect(otherAccount);

        await instance.editPet(1, {
            name: 'Loki',
            description: 'Small black dog who acts like a tiger.',
            yearBirth: 2021,
        });

        const pet = await petDexCatalog.pets(1);
        const petOtherAccount = await instance.pets(1);

        expect(pet.name).to.equal('Loki');
        expect(petOtherAccount.name).to.equal('Loki');
    });
});
