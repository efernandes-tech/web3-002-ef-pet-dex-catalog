import type { Pet } from '@/types/contract.types';
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

interface PetFormProps {
    onSubmit: (pet: Pet) => void;
    initialPet?: Pet;
    isEditing?: boolean;
}

const PetForm = ({ onSubmit, initialPet, isEditing = false }: PetFormProps) => {
    const [name, setName] = useState(initialPet?.name || '');
    const [description, setDescription] = useState(
        initialPet?.description || '',
    );
    const [yearBirth, setAdouters] = useState<number>(
        initialPet?.yearBirth || 0,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description, yearBirth });
        if (!isEditing) {
            setName('');
            setDescription('');
            setAdouters(0);
        }
    };

    return (
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
            <Heading size="lg" mb={4}>
                {isEditing ? 'Edit Pet' : 'Add New Pet'}
            </Heading>

            <form onSubmit={handleSubmit}>
                <VStack gap={4} align="stretch">
                    <Field.Root required>
                        <Field.Label>Name</Field.Label>
                        <Input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Pet name"
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Description</Field.Label>
                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Pet description"
                            rows={3}
                        />
                    </Field.Root>

                    <Field.Root required>
                        <Field.Label>Adopters</Field.Label>
                        <NumberInput.Root
                            value={yearBirth.toString()}
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
                        {isEditing ? 'Update Pet' : 'Add Pet'}
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default PetForm;
