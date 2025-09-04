import { ethers } from 'ethers';

export interface WalletState {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    account: string;
    chainId: number | null;
    isConnected: boolean;
}

export interface WalletContextType extends WalletState {
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
}

export interface WalletError {
    code: number;
    message: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any;
}

export interface NetworkInfo {
    chainId: number;
    name: string;
    rpcUrl: string;
    explorerUrl: string;
}

export type WalletStatus =
    | 'disconnected'
    | 'connecting'
    | 'connected'
    | 'error';
