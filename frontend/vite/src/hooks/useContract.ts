import { useWallet } from '@/hooks/useWallet';
import type { Pet, PetWithId } from '@/types/contract.types';
import { CONTRACT_ADDRESS } from '@/utils/contract';
import { ethers } from 'ethers';
import { useCallback, useMemo } from 'react';
import { PetDexCatalogABI } from '../contracts/PetDexCatalogABI';

export const useContract = () => {
    const { signer, isConnected, ...walletProps } = useWallet();

    const contract = useMemo(
        () =>
            !signer || !isConnected
                ? null
                : new ethers.Contract(
                      CONTRACT_ADDRESS,
                      PetDexCatalogABI,
                      signer,
                  ),
        [signer, isConnected],
    );

    const addPet = useCallback(
        async (pet: Pet) => {
            if (!contract) return;
            try {
                const tx = await contract.addPet([
                    pet.name,
                    pet.description,
                    pet.yearBirth,
                ]);
                await tx.wait();
            } catch (error) {
                console.error('Failed to add pet:', error);
                throw error;
            }
        },
        [contract],
    );

    const editPet = useCallback(
        async (id: number, pet: Pet) => {
            if (!contract) return;
            try {
                const tx = await contract.editPet(id, [
                    pet.name,
                    pet.description,
                    pet.yearBirth,
                ]);
                await tx.wait();
            } catch (error) {
                console.error('Failed to edit pet:', error);
                throw error;
            }
        },
        [contract],
    );

    const removePet = useCallback(
        async (id: number) => {
            if (!contract) return;
            try {
                const tx = await contract.removePet(id);
                await tx.wait();
            } catch (error) {
                console.error('Failed to remove pet:', error);
                throw error;
            }
        },
        [contract],
    );

    const getPet = useCallback(
        async (id: number): Promise<PetWithId | null> => {
            if (!contract) return null;
            try {
                const [name, description, yearBirth] = await contract.pets(id, {
                    blockTag: 'latest',
                });
                if (!name) return null;
                return { id, name, description, yearBirth: Number(yearBirth) };
            } catch (error) {
                console.error('Failed to get pet:', error);
                return null;
            }
        },
        [contract],
    );

    const getAllPets = useCallback(async (): Promise<PetWithId[]> => {
        if (!contract) return [];
        try {
            const count = await contract.count();
            const pets: PetWithId[] = [];

            for (let i = 1; i <= Number(count); i++) {
                const pet = await getPet(i);
                if (pet) pets.push(pet);
            }

            return pets;
        } catch (error) {
            console.error('Failed to get all pets:', error);
            return [];
        }
    }, [contract, getPet]);

    return {
        ...walletProps,
        contract,
        addPet,
        editPet,
        removePet,
        getPet,
        getAllPets,
        isConnected,
    };
};
