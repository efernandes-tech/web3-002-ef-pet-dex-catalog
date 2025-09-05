import { toaster } from '@/components/ui/Toaster';
import { useContract } from '@/hooks/useContract';
import type { Pet } from '@/types/contract.types';
import {
    Alert,
    Box,
    Button,
    Center,
    Container,
    Heading,
    Icon,
    Text,
    VStack,
} from '@chakra-ui/react';
import { AlertCircle, Plus, Wallet } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PetForm from '../components/PetForm';

const AddPet = () => {
    const { addPet, isConnected } = useContract();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddPet = async (pet: Pet) => {
        setIsLoading(true);
        try {
            await addPet(pet);
            toaster.create({
                title: 'Success!',
                description: `${pet.name} has been added to your collection!`,
                type: 'success',
                duration: 4000,
                closable: true,
            });
            navigate('/pets');
        } catch (error) {
            console.error('handleAddPet ~ error:', error);
            toaster.create({
                title: 'Error',
                description:
                    'Failed to add pet. Please check your wallet connection and try again.',
                type: 'error',
                duration: 5000,
                closable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!isConnected) {
        return (
            <Container maxW="4xl" py={12}>
                <Center>
                    <VStack gap={6} textAlign="center">
                        <Box
                            p={6}
                            borderRadius="full"
                            bg="red.50"
                            color="red.500"
                        >
                            <Icon boxSize={12}>
                                <Wallet />
                            </Icon>
                        </Box>
                        <VStack gap={3}>
                            <Heading size="lg" color="gray.700">
                                Wallet Connection Required
                            </Heading>
                            <Text color="gray.600" maxW="md">
                                To add a pet to your collection, you need to
                                connect your Web3 wallet first. This ensures
                                your pets are securely stored on the blockchain.
                            </Text>
                        </VStack>
                        <Alert.Root status="info" maxW="md">
                            <Alert.Indicator />
                            <Alert.Title>Need Help?</Alert.Title>
                            <Alert.Description>
                                Click the "Connect Wallet" button in the
                                navigation bar to get started.
                            </Alert.Description>
                        </Alert.Root>
                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => navigate('/pets')}
                        >
                            <AlertCircle size={20} />
                            Go to Pet Collection
                        </Button>
                    </VStack>
                </Center>
            </Container>
        );
    }

    return (
        <Container maxW="4xl" py={8}>
            <VStack gap={8} align="stretch">
                <VStack gap={4} textAlign="center">
                    <Box
                        p={4}
                        borderRadius="full"
                        bg="blue.50"
                        color="blue.500"
                    >
                        <Icon boxSize={8}>
                            <Plus />
                        </Icon>
                    </Box>
                    <VStack gap={2}>
                        <Heading size="xl" color="gray.800">
                            Add New Pet to Your Collection
                        </Heading>
                        <Text color="gray.600" maxW="md">
                            Create a unique profile for your pet and add it to
                            your blockchain-powered collection. Each pet will
                            have its own NFT-like record stored permanently.
                        </Text>
                    </VStack>
                </VStack>

                <Alert.Root status="info">
                    <Alert.Indicator />
                    <Box>
                        <Alert.Title>Pro Tips</Alert.Title>
                        <Alert.Description>
                            <VStack align="start" gap={1} mt={2}>
                                <Text>
                                    • Choose a unique name that represents your
                                    pet's personality
                                </Text>
                                <Text>
                                    • Write a detailed description - it makes
                                    your pet special!
                                </Text>
                                <Text>
                                    • Double-check the birth year for accuracy
                                </Text>
                            </VStack>
                        </Alert.Description>
                    </Box>
                </Alert.Root>

                <PetForm onSubmit={handleAddPet} isLoading={isLoading} />
            </VStack>
        </Container>
    );
};

export default AddPet;
