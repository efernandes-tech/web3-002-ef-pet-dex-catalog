import { toaster } from '@/components/ui/Toaster';
import { useContract } from '@/hooks/useContract';
import type { Pet } from '@/types/contract.types';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';

const AddPet = () => {
    const { addPet, isConnected } = useContract();
    const navigate = useNavigate();

    const handleAddPet = async (pet: Pet) => {
        try {
            await addPet(pet);
            toaster.create({
                title: 'Success!',
                description: 'Pet added successfully',
                type: 'success',
                duration: 3000,
                closable: true,
            });
            navigate('/pets');
        } catch (error) {
            console.error('handleAddPet ~ error:', error);
            toaster.create({
                title: 'Error',
                description: 'Failed to add pet',
                type: 'error',
                duration: 3000,
                closable: true,
            });
        }
    };

    if (!isConnected) {
        return (
            <Container maxW="7xl" py={12}>
                <Center>
                    <Heading size="md" color="red.500">
                        Please connect your wallet first
                    </Heading>
                </Center>
            </Container>
        );
    }

    return (
        <Container maxW="2xl" py={8}>
            <VStack gap={6} align="stretch">
                <Heading size="xl">Add New Pet</Heading>
                <PetForm onSubmit={handleAddPet} />
            </VStack>
        </Container>
    );
};

export default AddPet;
