# web3-002-ef-techs-for-dummies:

## Commands:

```cmd
mkdir hardhat
cd hardhat
npm init -y
npm i -D hardhat@2
npx hardhat init
```

```cmd
cd hardhat
npx hardhat compile
npm test
```

```cmd
cd hardhat
npx hardhat node
<!-- or -->
npm start
```

```cmd
cd hardhat
npm run deploy
```

```cmd
cd hardhat
npx hardhat console
> const contract = ethers.getContractAt("TechsForDummies", "DEPLOY_ADDRESS")
> await contract.techs(1)
```

```cmd
cd hardhat
npm i dotenv
```

```cmd
cd hardhat
npm run deploy:prod
```

```cmd
cd hardhat
npm i -D @nomiclabs/hardhat-etherscan

npx hardhat verify --network sepolia 0x98E675928B647F7d3059a442526ad5FA07f5cA9C
```

```cmd

```

```cmd

```
