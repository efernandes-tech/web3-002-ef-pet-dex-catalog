import { useContract } from '@/hooks/useContract';
import type { TechWithId } from '@/types/contract.types';
import { Center, Container, Heading, Spinner, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TechList from './components/TechList';

const Tech = () => {
    const { removeTech, getAllTechs, isConnected } = useContract();
    const [techs, setTechs] = useState<TechWithId[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loadTechs = async () => {
        if (!isConnected) return;
        setLoading(true);
        try {
            const allTechs = await getAllTechs();
            setTechs(allTechs);
        } catch (error) {
            console.error('Failed to load techs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected) {
            loadTechs();
        }
    }, [isConnected]);

    const handleEdit = (tech: TechWithId) => {
        navigate(`/edit-tech/${tech.id}`, { state: { tech } });
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this technology?'))
            return;
        try {
            await removeTech(id);
            await loadTechs();
        } catch (error) {
            console.error('handleDelete ~ error:', error);
            alert('Failed to delete technology');
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
                <Heading size="xl">All Technologies</Heading>

                {loading ? (
                    <Center>
                        <Spinner size="lg" />
                    </Center>
                ) : (
                    <TechList
                        techs={techs}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </VStack>
        </Container>
    );
};

export default Tech;
