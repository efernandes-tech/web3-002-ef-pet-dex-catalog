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
> const contract = ethers.getContractAt("PetDexCatalog", "DEPLOY_ADDRESS")
> await contract.pets(1)
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
npx hardhat verify --network sepolia 0x825829bA0B52e53857d645090e040d20580f3493
```

```cmd

```

```cmd

```
