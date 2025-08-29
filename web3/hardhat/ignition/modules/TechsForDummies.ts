// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

const TechsForDummiesModule = buildModule('TechsForDummiesModule', m => {
    const techsForDummies = m.contract('TechsForDummies', [], {});

    return { techsForDummies };
});

export default TechsForDummiesModule;
