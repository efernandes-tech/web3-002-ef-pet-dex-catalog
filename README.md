<h1 align="center">
    <a href="#" alt="Pet Dex Catalog">Pet Dex Catalog</a>
</h1>

<h3 align="center">
    A decentralized pet catalog application built with React and Ethereum smart contracts
</h3>

<p align="center">
    <a href="https://github.com/efernandes-tech/web3-002-ef-pet-dex-catalog/commits/main">
        <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/efernandes-tech/web3-002-ef-pet-dex-catalog">
    </a>
    <img alt="Repository size" src="https://img.shields.io/github/repo-size/efernandes-tech/web3-002-ef-pet-dex-catalog">
    <a href="https://edersonfernandes.com.br">
        <img alt="made by @efernandes-tech" src="https://img.shields.io/badge/Made_by-@efernandes%E2%80%93tech-blue">
    </a>
</p>

<h4 align="center">
    Status: In progress
</h4>

<p align="center">
    <a href="#about">About</a> •
    <a href="#features">Features</a> •
    <a href="#how-it-works">How it works</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#author">Author</a>
</p>

## About

Pet Dex Catalog is a decentralized application (DApp) that allows users to create, manage, and explore a catalog of pets on the Ethereum blockchain. Built with React and TypeScript frontend and Solidity smart contracts, this application demonstrates the integration of modern web technologies with blockchain functionality.

The application provides a user-friendly interface for pet enthusiasts to register their pets, view existing pets in the catalog, and interact with the blockchain directly through their wallet.

---

## Features

-   [x] Add pets to the blockchain catalog with name, description, and birth year
-   [x] View all registered pets in an interactive catalog
-   [x] Edit pet information (restricted functionality)
-   [x] Connect to MetaMask wallet for blockchain interactions
-   [x] Mobile-responsive design with dark/light theme support
-   [x] Smart contract deployment on local and testnet networks
-   [ ] Remove pets from catalog (owner-only functionality)
-   [ ] Enhanced pet attributes and media support

---

## How it works

### Pre-requisites

Before you begin, you will need to have the following tools installed:

-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org/en/) (v18+ recommended)
-   [MetaMask](https://metamask.io/) browser extension
-   A code editor like [Visual Studio Code](https://code.visualstudio.com/)

#### Running the project

```bash
# Clone this repository
git clone <repository-url>

# Access the project folder
cd web3-002-ef-pet-dex-catalog

# Install and start the local blockchain (Hardhat node)
cd web3/hardhat
npm install
npm run start

# In a new terminal, deploy the smart contract to local network
npm run deploy:dev

# In another terminal, start the frontend application
cd ../../frontend/vite
npm install
npm run dev

# The application will start at: http://localhost:5173
```

#### Additional Commands

```bash
# Compile smart contracts
cd web3/hardhat
npm run compile

# Run smart contract tests
npm run test

# Deploy to Sepolia testnet
npm run deploy:prod

# Build frontend for production
cd ../../frontend/vite
npm run build
```

---

## Tech Stack

**Frontend:**

-   [React](https://reactjs.org/) - UI library
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
-   [Vite](https://vitejs.dev/) - Build tool and development server
-   [Chakra UI](https://chakra-ui.com/) - Component library
-   [Ethers.js](https://ethers.org/) - Ethereum library for blockchain interaction
-   [React Router](https://reactrouter.com/) - Client-side routing

**Blockchain:**

-   [Solidity](https://soliditylang.org/) - Smart contract programming language
-   [Hardhat](https://hardhat.org/) - Ethereum development environment
-   [Ethereum](https://ethereum.org/) - Blockchain platform

**Tools:**

-   [Visual Studio Code](https://code.visualstudio.com/) - Code editor
-   [MetaMask](https://metamask.io/) - Ethereum wallet
-   [ESLint](https://eslint.org/) - Code linting
-   [Git](https://git-scm.com/) - Version control

---

## Author

<a href="https://github.com/efernandes-tech">
    <img style="border-radius: 50%;" src="https://github.com/efernandes-tech.png" width="100px;" alt="Ederson Fernandes" />
    <br />
    <sub><b>Ederson Fernandes</b></sub>
</a>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/efernandes-tech)
[![Email](https://img.shields.io/badge/Email-Contact-red?logo=gmail)](mailto:efernandes.tech@gmail.com)
