# Commands:

```cmd
mkdir ./web3/hardhat
cd ./web3/hardhat
npm init -y
npm i -D hardhat@2
npx hardhat init
```

```cmd
cd ./web3/hardhat
npx hardhat compile
npm test
```

```cmd
cd ./web3/hardhat
npx hardhat node
<!-- or -->
npm start
```

```cmd
cd ./web3/hardhat
npm run deploy
```

```cmd
cd ./web3/hardhat
npx hardhat console
> const contract = ethers.getContractAt("TechsForDummies", "DEPLOY_ADDRESS")
> await contract.techs(1)
```

```cmd
cd ./web3/hardhat
npm i dotenv
```

```cmd
cd ./web3/hardhat
npm run deploy:prod
```

```cmd
cd ./web3/hardhat
npm i -D @nomiclabs/hardhat-etherscan
npx hardhat verify --network sepolia 0x98E675928B647F7d3059a442526ad5FA07f5cA9C
```

```cmd

```

```cmd

```
