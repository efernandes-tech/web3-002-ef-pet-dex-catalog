import type { WalletContextType } from '@/types/wallet.types';
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
    children: React.ReactNode;
}

const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
        null,
    );
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string>('');
    const [chainId, setChainId] = useState<number | null>(null);

    const connectWallet = async () => {
        // Check if window.ethereum exists
        if (typeof window === 'undefined') {
            const error = new Error('Please use a Web3 compatible browser.');
            error.name = 'BrowserNotSupported';
            throw error;
        }

        // Check if MetaMask or any Web3 wallet is installed
        if (!window.ethereum) {
            const error = new Error(
                'No Web3 wallet detected. Please install MetaMask or another Web3 wallet extension.',
            );
            error.name = 'WalletNotInstalled';
            throw error;
        }

        // Additional check to ensure the wallet is properly initialized
        if (!window.ethereum.request) {
            const error = new Error(
                'Web3 wallet is not properly initialized. Please refresh the page and try again.',
            );
            error.name = 'WalletNotInitialized';
            throw error;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);

            // Request account access
            const accounts = await provider.send('eth_requestAccounts', []);

            if (!accounts || accounts.length === 0) {
                const error = new Error(
                    'No accounts found. Please unlock your wallet and try again.',
                );
                error.name = 'NoAccountsFound';
                throw error;
            }

            const signer = await provider.getSigner();
            const network = await provider.getNetwork();

            setProvider(provider);
            setSigner(signer);
            setAccount(await signer.getAddress());
            setChainId(Number(network.chainId));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Failed to connect wallet:', error);

            // Handle specific MetaMask errors
            if (error.code === 4001) {
                const userRejectedError = new Error(
                    'Connection request was rejected. Please accept the connection request to continue.',
                );
                userRejectedError.name = 'UserRejected';
                throw userRejectedError;
            }

            if (error.code === -32002) {
                const pendingError = new Error(
                    'A connection request is already pending. Please check your wallet.',
                );
                pendingError.name = 'RequestPending';
                throw pendingError;
            }

            // Re-throw the error with better context
            if (error.name) {
                throw error;
            } else {
                const genericError = new Error(
                    `Failed to connect wallet: ${
                        error.message || 'Unknown error'
                    }`,
                );
                genericError.name = 'ConnectionFailed';
                throw genericError;
            }
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount('');
        setChainId(null);
    };

    const checkConnection = async () => {
        if (typeof window !== 'undefined' && window.ethereum?.request) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();

                if (accounts.length > 0) {
                    const signer = await provider.getSigner();
                    const network = await provider.getNetwork();

                    setProvider(provider);
                    setSigner(signer);
                    setAccount(await signer.getAddress());
                    setChainId(Number(network.chainId));
                }
            } catch (error) {
                console.error('Failed to check connection:', error);
                // Clear state on connection check failure
                disconnectWallet();
            }
        }
    };

    useEffect(() => {
        checkConnection();

        if (typeof window !== 'undefined' && window.ethereum?.on) {
            const handleAccountsChanged = (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    checkConnection();
                }
            };

            const handleChainChanged = (chainId: string) => {
                setChainId(parseInt(chainId, 16));
                checkConnection();
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);
            window.ethereum.on('chainChanged', handleChainChanged);

            return () => {
                if (window.ethereum?.removeAllListeners) {
                    window.ethereum.removeAllListeners('accountsChanged');
                    window.ethereum.removeAllListeners('chainChanged');
                }
            };
        }
    }, []);

    const value: WalletContextType = {
        provider,
        signer,
        account,
        chainId,
        isConnected: !!signer && !!account,
        connectWallet,
        disconnectWallet,
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export { WalletContext, WalletProvider };
