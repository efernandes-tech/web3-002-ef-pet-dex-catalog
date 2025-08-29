import type { TechWithId } from '@/types/contract';
import {
    Badge,
    Button,
    Card,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';

interface TechListProps {
    techs: TechWithId[];
    onEdit: (tech: TechWithId) => void;
    onDelete: (id: number) => void;
}

export const TechList = ({ techs, onEdit, onDelete }: TechListProps) => {
    return (
        <VStack gap={4} align="stretch">
            <Heading size="lg">Technologies</Heading>

            {techs.length === 0 ? (
                <Text color="gray.500">No technologies found.</Text>
            ) : (
                <VStack gap={4}>
                    {techs.map(tech => (
                        <Card.Root key={tech.id} p={4} width="full">
                            <HStack justify="space-between" align="start">
                                <VStack align="start" flex={1} gap={2}>
                                    <Heading size="md" color="gray.900">
                                        {tech.name}
                                    </Heading>
                                    <Text color="gray.600">
                                        {tech.description}
                                    </Text>
                                    <Badge colorScheme="blue" variant="solid">
                                        {tech.adopters} adopters
                                    </Badge>
                                </VStack>

                                <HStack gap={2}>
                                    <Button
                                        onClick={() => onEdit(tech)}
                                        colorScheme="yellow"
                                        size="sm"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(tech.id)}
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
