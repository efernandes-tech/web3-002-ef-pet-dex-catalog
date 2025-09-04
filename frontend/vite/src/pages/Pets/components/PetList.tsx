import type { PetWithId } from '@/types/contract.types';
import {
    Badge,
    Button,
    Card,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';

interface PetListProps {
    pets: PetWithId[];
    onEdit: (pet: PetWithId) => void;
    onDelete: (id: number) => void;
}

const PetList = ({ pets, onEdit, onDelete }: PetListProps) => {
    return (
        <VStack gap={4} align="stretch">
            <Heading size="lg">Pets</Heading>

            {pets.length === 0 ? (
                <Text color="gray.500">No pets found.</Text>
            ) : (
                <VStack gap={4}>
                    {pets.map(pet => (
                        <Card.Root key={pet.id} p={4} width="full">
                            <HStack justify="space-between" align="start">
                                <VStack align="start" flex={1} gap={2}>
                                    <Heading size="md" color="gray.900">
                                        {pet.name}
                                    </Heading>
                                    <Text color="gray.600">
                                        {pet.description}
                                    </Text>
                                    <Badge colorScheme="blue" variant="solid">
                                        {pet.yearBirth} yearBirth
                                    </Badge>
                                </VStack>

                                <HStack gap={2}>
                                    <Button
                                        onClick={() => onEdit(pet)}
                                        colorScheme="yellow"
                                        size="sm"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(pet.id)}
                                        colorScheme="red"
                                        size="sm"
                                    >
                                        Delete
                                    </Button>
                                </HStack>
                            </HStack>
                        </Card.Root>
                    ))}
                </VStack>
            )}
        </VStack>
    );
};

export default PetList;
