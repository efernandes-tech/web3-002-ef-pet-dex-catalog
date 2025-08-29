import { TechForm } from '@/components/TechForm';
import { toaster } from '@/components/ui/toaster';
import { useContract } from '@/hooks/useContract';
import type { Tech } from '@/types/contract';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AddTech = () => {
    const { addTech, isConnected } = useContract();
    const navigate = useNavigate();

    const handleAddTech = async (tech: Tech) => {
        try {
            await addTech(tech);
            toaster.create({
                title: 'Success!',
                description: 'Technology added successfully',
                type: 'success',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                },
            });
            navigate('/technologies');
        } catch (error) {
            console.error('handleAddTech ~ error:', error);
            toaster.create({
                title: 'Error',
                description: 'Failed to add technology',
                type: 'error',
                duration: 3000,
                action: {
                    label: 'Undo',
                    onClick: () => console.log('Undo'),
                },
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
                <Heading size="xl">Add New Technology</Heading>
                <TechForm onSubmit={handleAddTech} />
            </VStack>
        </Container>
    );
};

export default AddTech;
