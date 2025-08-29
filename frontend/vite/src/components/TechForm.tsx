import type { Tech } from '@/types/contract';
import {
    Box,
    Button,
    Field,
    Heading,
    Input,
    NumberInput,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface TechFormProps {
    onSubmit: (tech: Tech) => void;
    initialTech?: Tech;
    isEditing?: boolean;
}

export const TechForm = ({
    onSubmit,
    initialTech,
    isEditing = false,
}: TechFormProps) => {
    const [name, setName] = useState(initialTech?.name || '');
    const [description, setDescription] = useState(
        initialTech?.description || '',
    );
    const [adopters, setAdouters] = useState<number>(
        initialTech?.adopters || 0,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, adopters });
        if (!isEditing) {
            setName('');
            setDescription('');
            setAdouters(0);
        }
    };

    return (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={4}>
                {isEditing ? 'Edit Tech' : 'Add New Tech'}
            </Heading>

            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Field.Root required>
                        <Field.Label>Name</Field.Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Technology name"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Description</Field.Label>
                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Technology description"
                            rows={3}
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Adopters</Field.Label>
                        <NumberInput.Root
                            value={adopters.toString()}
                            min={0}
                            onValueChange={e =>
                                setAdouters(e.valueAsNumber || 0)
                            }
                        >
                            <NumberInput.Label />
                        </NumberInput.Root>
                    </Field.Root>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        width="full"
                    >
                        {isEditing ? 'Update Tech' : 'Add Tech'}
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};
