// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const PetDexCatalogModule = buildModule('PetDexCatalogModule', m => {
    const PetDexCatalog = m.contract('PetDexCatalog', [], {});

    return { PetDexCatalog };
});

export default PetDexCatalogModule;
