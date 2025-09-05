import { toaster } from '@/components/ui/Toaster';
import { useContract } from '@/hooks/useContract';
import type { Pet, PetWithId } from '@/types/contract.types';
import {
    Alert,
    Box,
    Button,
    Center,
    Container,
    Heading,
    HStack,
    Icon,
    Skeleton,
    Text,
    VStack,
} from '@chakra-ui/react';
import { AlertCircle, ArrowLeft, Edit, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PetForm from '../components/PetForm';

const EditPet = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { editPet, getPet, isConnected } = useContract();
    const [pet, setPet] = useState<PetWithId | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(!!id);

    useEffect(() => {
        if (id && isConnected) {
            const fetchPet = async () => {
                setIsFetching(true);
                try {
                    const fetchedPet = await getPet(Number(id));
                    if (fetchedPet) {
                        setPet(fetchedPet);
                    } else {
                        toaster.create({
                            title: 'Pet Not Found',
                            description:
                                'The requested pet could not be found in your collection.',
                            type: 'error',
                            duration: 4000,
                            closable: true,
                        });
                        navigate('/pets');
                    }
                } catch (error) {
                    console.error('Failed to fetch pet:', error);
                    toaster.create({
                        title: 'Loading Error',
                        description:
                            'Failed to load pet information. Please try again.',
                        type: 'error',
                        duration: 4000,
                        closable: true,
                    });
                    navigate('/pets');
                } finally {
                    setIsFetching(false);
                }
            };
            fetchPet();
        }
    }, [id, isConnected, getPet, navigate]);

    const handleEditPet = async (updatedPet: Pet) => {
        if (!pet) return;

        setIsLoading(true);
        try {
            await editPet(pet.id, updatedPet);
            toaster.create({
                title: 'Updated Successfully!',
                description: `${updatedPet.name}'s information has been updated!`,
                type: 'success',
                duration: 4000,
                closable: true,
            });
            navigate('/pets');
        } catch (error) {
            console.error('handleEditPet ~ error:', error);
            toaster.create({
                title: 'Update Failed',
                description:
                    'Failed to update pet information. Please check your connection and try again.',
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
                                To edit your pet, you need to connect your Web3
                                wallet first. This ensures you have permission
                                to modify the pet's information.
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

    if (isFetching) {
        return (
            <Container maxW="4xl" py={8}>
                <VStack gap={8} align="stretch">
                    <HStack>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate('/pets')}
                        >
                            leftIcon={<ArrowLeft size={16} />}
                            Back to Collection
                        </Button>
                    </HStack>

                    <VStack gap={4} textAlign="center">
                        <Box
                            p={4}
                            borderRadius="full"
                            bg="blue.50"
                            color="blue.500"
                        >
                            <Icon boxSize={8}>
                                <Edit />
                            </Icon>
                        </Box>
                        <VStack gap={2}>
                            <Skeleton height="32px" width="300px" />
                            <Skeleton height="20px" width="200px" />
                        </VStack>
                    </VStack>

                    <VStack gap={4} align="stretch">
                        <Skeleton height="400px" borderRadius="lg" />
                    </VStack>
                </VStack>
            </Container>
        );
    }

    if (!pet) {
        return (
            <Container maxW="4xl" py={12}>
                <Center>
                    <VStack gap={6} textAlign="center">
                        <Box
                            p={6}
                            borderRadius="full"
                            bg="yellow.50"
                            color="yellow.500"
                        >
                            <Icon boxSize={12}>
                                <AlertCircle />
                            </Icon>
                        </Box>
                        <VStack gap={3}>
                            <Heading size="lg" color="gray.700">
                                Pet Not Found
                            </Heading>
                            <Text color="gray.600" maxW="md">
                                The pet you're trying to edit doesn't exist or
                                couldn't be loaded. It may have been deleted or
                                there might be a connection issue.
                            </Text>
                        </VStack>
                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => navigate('/pets')}
                        >
                            <ArrowLeft size={20} />
                            Back to Collection
                        </Button>
                    </VStack>
                </Center>
            </Container>
        );
    }

    const currentYear = new Date().getFullYear();
    const petAge = currentYear - pet.yearBirth;

    return (
        <Container maxW="4xl" py={8}>
            <VStack gap={8} align="stretch">
                <VStack gap={4} textAlign="center">
                    <Box
                        p={4}
                        borderRadius="full"
                        bg="yellow.50"
                        color="yellow.600"
                    >
                        <Icon boxSize={8}>
                            <Edit />
                        </Icon>
                    </Box>
                    <VStack gap={2}>
                        <Heading size="xl" color="gray.800">
                            Edit {pet.name}'s Profile
                        </Heading>
                        <Text color="gray.600" maxW="md">
                            Update your pet's information. All changes will be
                            saved to the blockchain and become part of your
                            pet's permanent record.
                        </Text>
                    </VStack>
                </VStack>

                <Alert.Root status="info">
                    <Alert.Indicator />
                    <Box>
                        <Alert.Title>Editing Pet #{pet.id}</Alert.Title>
                        <Alert.Description>
                            <VStack align="start" gap={1} mt={2}>
                                <Text>
                                    <strong>Current Name:</strong> {pet.name}
                                </Text>
                                <Text>
                                    <strong>Current Age:</strong> {petAge} years
                                    old (born {pet.yearBirth})
                                </Text>
                                <Text>
                                    <strong>Description:</strong>{' '}
                                    {pet.description}
                                </Text>
                            </VStack>
                        </Alert.Description>
                    </Box>
                </Alert.Root>

                <PetForm
                    onSubmit={handleEditPet}
                    initialPet={pet}
                    isEditing={true}
                    isLoading={isLoading}
                />
            </VStack>
        </Container>
    );
};

export default EditPet;
