// Sepolia testnet configuration
export const SEPOLIA_CHAIN_ID = 11155111;
export const SEPOLIA_EXPLORER_URL = 'https://sepolia.etherscan.io';
export const SEPOLIA_NETWORK_NAME = 'Sepolia Testnet';

export const getExplorerUrl = (address: string): string => {
    return `${SEPOLIA_EXPLORER_URL}/address/${address}`;
};

export const getTransactionUrl = (txHash: string): string => {
    return `${SEPOLIA_EXPLORER_URL}/tx/${txHash}`;
};

export const getNetworkName = (): string => {
    return SEPOLIA_NETWORK_NAME;
};

export const isCorrectNetwork = (chainId?: number): boolean => {
    return chainId === SEPOLIA_CHAIN_ID;
};
