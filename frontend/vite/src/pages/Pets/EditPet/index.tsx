import { toaster } from '@/components/ui/Toaster';
import { useContract } from '@/hooks/useContract';
import type { Pet, PetWithId } from '@/types/contract.types';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PetForm from '../components/PetForm';

const EditPet = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { editPet, getPet, isConnected } = useContract();
    const [pet, setPet] = useState<PetWithId | null>(
        location.state?.pet || null,
    );

    useEffect(() => {
        if (!pet && id && isConnected) {
            const fetchPet = async () => {
                try {
                    const fetchedPet = await getPet(Number(id));
                    if (fetchedPet) {
                        setPet(fetchedPet);
                    } else {
                        toaster.create({
                            title: 'Error',
                            description: 'Pet not found',
                            type: 'error',
                            duration: 3000,
                            closable: true,
                        });
                        navigate('/pets');
                    }
                } catch (error) {
                    console.error('Failed to fetch pet:', error);
                    navigate('/pets');
                }
            };
            fetchPet();
        }
    }, [id, pet, isConnected]);

    const handleEditPet = async (updatedPet: Pet) => {
        if (!pet) return;

        try {
            await editPet(pet.id, updatedPet);
            toaster.create({
                title: 'Success!',
                description: 'Pet updated successfully',
                type: 'success',
                duration: 3000,
                closable: true,
            });
            navigate('/pets');
        } catch (error) {
            console.error('handleEditPet ~ error:', error);
            toaster.create({
                title: 'Error',
                description: 'Failed to update pet',
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

    if (!pet) {
        return (
            <Container maxW="7xl" py={12}>
                <Center>
                    <Heading size="md">Loading...</Heading>
                </Center>
            </Container>
        );
    }

    return (
        <Container maxW="2xl" py={8}>
            <VStack gap={6} align="stretch">
                <Heading size="xl">Edit Pet</Heading>
                <PetForm
                    onSubmit={handleEditPet}
                    initialPet={pet}
                    isEditing={true}
                />
            </VStack>
        </Container>
    );
};

export default EditPet;
