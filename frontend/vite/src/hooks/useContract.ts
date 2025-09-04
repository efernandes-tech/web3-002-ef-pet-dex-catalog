import { useWallet } from '@/hooks/useWallet';
import type { Tech, TechWithId } from '@/types/contract.types';
import { CONTRACT_ADDRESS } from '@/utils/contract';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { TechsForDummiesABI } from '../contracts/TechsForDummiesABI';

export const useContract = () => {
    const { signer, isConnected, ...walletProps } = useWallet();

    const contract = useMemo(() => {
        if (!signer || !isConnected) return null;

        return new ethers.Contract(
            CONTRACT_ADDRESS,
            TechsForDummiesABI,
            signer,
        );
    }, [signer, isConnected]);

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
        ...walletProps,
        contract,
        addTech,
        editTech,
        removeTech,
        getTech,
        getAllTechs,
        isConnected,
    };
};
