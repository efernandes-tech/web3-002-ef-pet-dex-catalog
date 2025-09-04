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
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const network = await provider.getNetwork();

                setProvider(provider);
                setSigner(signer);
                setAccount(await signer.getAddress());
                setChainId(Number(network.chainId));
            } catch (error) {
                console.error('Failed to connect wallet:', error);
                throw error;
            }
        } else {
            throw new Error('MetaMask is not installed');
        }
    };

    const disconnectWallet = () => {
        setProvider(null);
        setSigner(null);
        setAccount('');
        setChainId(null);
    };

    const checkConnection = async () => {
        if (window.ethereum) {
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
            }
        }
    };

    useEffect(() => {
        checkConnection();

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    disconnectWallet();
                } else {
                    checkConnection();
                }
            });

            window.ethereum.on('chainChanged', (chainId: string) => {
                setChainId(parseInt(chainId, 16));
                checkConnection();
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
                window.ethereum.removeAllListeners('chainChanged');
            }
        };
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
