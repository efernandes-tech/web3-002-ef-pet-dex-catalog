import { toaster } from '@/components/ui/Toaster';
import { useContract } from '@/hooks/useContract';
import type { Tech, TechWithId } from '@/types/contract.types';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TechForm from '../components/TechForm';

const EditTech = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navigate = useNavigate();
    const { editTech, getTech, isConnected } = useContract();
    const [tech, setTech] = useState<TechWithId | null>(
        location.state?.tech || null,
    );

    useEffect(() => {
        if (!tech && id && isConnected) {
            const fetchTech = async () => {
                try {
                    const fetchedTech = await getTech(Number(id));
                    if (fetchedTech) {
                        setTech(fetchedTech);
                    } else {
                        toaster.create({
                            title: 'Error',
                            description: 'Technology not found',
                            type: 'error',
                            duration: 3000,
                            closable: true,
                        });
                        navigate('/technologies');
                    }
                } catch (error) {
                    console.error('Failed to fetch tech:', error);
                    navigate('/technologies');
                }
            };
            fetchTech();
        }
    }, [id, tech, isConnected]);

    const handleEditTech = async (updatedTech: Tech) => {
        if (!tech) return;

        try {
            await editTech(tech.id, updatedTech);
            toaster.create({
                title: 'Success!',
                description: 'Technology updated successfully',
                type: 'success',
                duration: 3000,
                closable: true,
            });
            navigate('/technologies');
        } catch (error) {
            console.error('handleEditTech ~ error:', error);
            toaster.create({
                title: 'Error',
                description: 'Failed to update technology',
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

    if (!tech) {
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
                <Heading size="xl">Edit Technology</Heading>
                <TechForm
                    onSubmit={handleEditTech}
                    initialTech={tech}
                    isEditing={true}
                />
            </VStack>
        </Container>
    );
};

export default EditTech;
