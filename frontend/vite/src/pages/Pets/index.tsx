import { useContract } from '@/hooks/useContract';
import type { PetWithId } from '@/types/contract.types';
import { Center, Container, Heading, Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetList from './components/PetList';

const Pets = () => {
    const { removePet, getAllPets, isConnected } = useContract();
    const [pets, setPets] = useState<PetWithId[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadPets = async () => {
        if (!isConnected) return;
        setLoading(true);
        try {
            const allPets = await getAllPets();
            setPets(allPets);
        } catch (error) {
            console.error('Failed to load pets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected) {
            loadPets();
        }
    }, [isConnected]);

    const handleEdit = (pet: PetWithId) => {
        navigate(`/edit-pet/${pet.id}`, { state: { pet } });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this pet?')) return;
        try {
            await removePet(id);
            await loadPets();
        } catch (error) {
            console.error('handleDelete ~ error:', error);
            alert('Failed to delete pet');
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
        <Container maxW="7xl" py={8}>
            <VStack gap={6} align="stretch">
                <Heading size="xl">All Petnologies</Heading>

                {loading ? (
                    <Center>
                        <Spinner size="lg" />
                    </Center>
                ) : (
                    <PetList
                        pets={pets}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </VStack>
        </Container>
    );
};

export default Pets;
