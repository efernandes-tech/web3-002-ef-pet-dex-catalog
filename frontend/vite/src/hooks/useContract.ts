/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Tech, TechWithId } from '@/types/contract';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { TechsForDummiesABI } from '../contracts/TechsForDummiesABI';

// Replace with your contract address
const CONTRACT_ADDRESS = '0x98E675928B647F7d3059a442526ad5FA07f5cA9C';

export const useContract = () => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(
        null,
    );
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [account, setAccount] = useState<string>('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = await provider.getSigner();
                const contract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    TechsForDummiesABI,
                    signer,
                );

                setProvider(provider);
                setSigner(signer);
                setContract(contract);
                setAccount(await signer.getAddress());
            } catch (error) {
                console.error('Failed to connect wallet:', error);
            }
        }
    };

    const checkConnection = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();

                if (accounts.length > 0) {
                    const signer = await provider.getSigner();
                    const contract = new ethers.Contract(
                        CONTRACT_ADDRESS,
                        TechsForDummiesABI,
                        signer,
                    );

                    setProvider(provider);
                    setSigner(signer);
                    setContract(contract);
                    setAccount(await signer.getAddress());
                }
            } catch (error) {
                console.error('Failed to check connection:', error);
            }
        }
    };

    useEffect(() => {
        checkConnection();

        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts: string[]) => {
                if (accounts.length === 0) {
                    // Disconnected
                    setProvider(null);
                    setSigner(null);
                    setContract(null);
                    setAccount('');
                } else {
                    // Account changed, reconnect
                    checkConnection();
                }
            });
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeAllListeners('accountsChanged');
            }
        };
    }, []);

    const addTech = async (tech: Tech) => {
        if (!contract) return;
        try {
            const tx = await contract.addTech([
                tech.name,
                tech.description,
                tech.adopters,
            ]);
            await tx.wait();
        } catch (error) {
            console.error('Failed to add tech:', error);
            throw error;
        }
    };

    const editTech = async (id: number, tech: Tech) => {
        if (!contract) return;
        try {
            const tx = await contract.editTech(id, [
                tech.name,
                tech.description,
                tech.adopters,
            ]);
            await tx.wait();
        } catch (error) {
            console.error('Failed to edit tech:', error);
            throw error;
        }
    };

    const removeTech = async (id: number) => {
        if (!contract) return;
        try {
            const tx = await contract.removeTech(id);
            await tx.wait();
        } catch (error) {
            console.error('Failed to remove tech:', error);
            throw error;
        }
    };

    const getTech = async (id: number): Promise<TechWithId | null> => {
        if (!contract) return null;
        try {
            const [name, description, adopters] = await contract.techs(id);
            if (!name) return null;
            return { id, name, description, adopters: Number(adopters) };
        } catch (error) {
            console.error('Failed to get tech:', error);
            return null;
        }
    };

    const getAllTechs = async (): Promise<TechWithId[]> => {
        if (!contract) return [];
        try {
            const count = await contract.count();
            const techs: TechWithId[] = [];

            for (let i = 1; i <= Number(count); i++) {
                const tech = await getTech(i);
                if (tech) techs.push(tech);
            }

            return techs;
        } catch (error) {
            console.error('Failed to get all techs:', error);
            return [];
        }
    };

    return {
        connectWallet,
        addTech,
        editTech,
        removeTech,
        getTech,
        getAllTechs,
        account,
        isConnected: !!contract,
    };
};
