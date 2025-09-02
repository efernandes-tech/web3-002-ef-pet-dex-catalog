import { ethers } from 'ethers';
import { createContext } from 'react';

export interface WalletContextType {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    account: string;
    chainId: number | null;
    isConnected: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(
    undefined,
);
