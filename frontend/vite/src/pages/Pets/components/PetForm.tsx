import type { Pet } from '@/types/contract.types';
import {
    Alert,
    Badge,
    Button,
    Card,
    Field,
    Flex,
    Heading,
    HStack,
    Icon,
    Input,
    NumberInput,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { ArrowLeft, Calendar, FileText, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PetFormProps {
    onSubmit: (pet: Pet) => Promise<void>;
    initialPet?: Pet;
    isEditing?: boolean;
    isLoading?: boolean;
}

interface FormErrors {
    name?: string;
    description?: string;
    yearBirth?: string;
}

const PetForm = ({
    onSubmit,
    initialPet,
    isEditing = false,
    isLoading = false,
}: PetFormProps) => {
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();

    const [name, setName] = useState(initialPet?.name || '');
    const [description, setDescription] = useState(
        initialPet?.description || '',
    );
    const [yearBirth, setYearBirth] = useState<number>(
        initialPet?.yearBirth || currentYear,
    );
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!name.trim()) {
            newErrors.name = 'Pet name is required';
        } else if (name.trim().length < 2) {
            newErrors.name = 'Pet name must be at least 2 characters';
        } else if (name.trim().length > 50) {
            newErrors.name = 'Pet name must be less than 50 characters';
        }

        if (!description.trim()) {
            newErrors.description = 'Pet description is required';
        } else if (description.trim().length < 10) {
            newErrors.description =
                'Description must be at least 10 characters';
        } else if (description.trim().length > 200) {
            newErrors.description =
                'Description must be less than 200 characters';
        }

        if (!yearBirth || yearBirth < 1900) {
            newErrors.yearBirth =
                'Please enter a valid birth year (1900 or later)';
        } else if (yearBirth > currentYear) {
            newErrors.yearBirth = 'Birth year cannot be in the future';
        }

        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                name: name.trim(),
                description: description.trim(),
                yearBirth,
            });

            if (!isEditing) {
                setName('');
                setDescription('');
                setYearBirth(currentYear);
                setErrors({});
            }
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/pets');
    };

    const age = currentYear - yearBirth;

    return (
        <Card.Root maxW="600px" mx="auto">
            <Card.Header>
                <Flex align="center" gap={4}>
                    <Button variant="ghost" size="sm" onClick={handleCancel}>
                        <ArrowLeft size={16} />
                        Back
                    </Button>
                    <VStack align="start" gap={1}>
                        <Heading size="lg" color="gray.800">
                            {isEditing
                                ? 'Edit Pet Details'
                                : 'Add New Pet to Collection'}
                        </Heading>
                        <Text fontSize="sm" color="gray.600">
                            {isEditing
                                ? "Update your pet's information below"
                                : 'Fill in the details to add a new pet to your collection'}
                        </Text>
                    </VStack>
                </Flex>
            </Card.Header>

            <Card.Body>
                <form onSubmit={handleSubmit}>
                    <VStack gap={6} align="stretch">
                        <Field.Root required invalid={!!errors.name}>
                            <Field.Label>
                                <HStack>
                                    <Icon color="blue.500">
                                        <User size={16} />
                                    </Icon>
                                    <Text>Pet Name</Text>
                                </HStack>
                            </Field.Label>
                            <Input
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                    if (errors.name) {
                                        setErrors(prev => ({
                                            ...prev,
                                            name: undefined,
                                        }));
                                    }
                                }}
                                placeholder="e.g., Loki, Shadow, Storm"
                                size="lg"
                                disabled={isSubmitting}
                            />
                            {errors.name && (
                                <Field.ErrorText>{errors.name}</Field.ErrorText>
                            )}
                            <Field.HelperText>
                                Choose a unique name for your pet (2-50
                                characters)
                            </Field.HelperText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.description}>
                            <Field.Label>
                                <HStack>
                                    <Icon color="green.500">
                                        <FileText size={16} />
                                    </Icon>
                                    <Text>Description</Text>
                                </HStack>
                            </Field.Label>
                            <Textarea
                                value={description}
                                onChange={e => {
                                    setDescription(e.target.value);
                                    if (errors.description) {
                                        setErrors(prev => ({
                                            ...prev,
                                            description: undefined,
                                        }));
                                    }
                                }}
                                placeholder="e.g., Small black dog who acts like a tiger"
                                rows={4}
                                resize="none"
                                size="lg"
                                disabled={isSubmitting}
                            />
                            {errors.description && (
                                <Field.ErrorText>
                                    {errors.description}
                                </Field.ErrorText>
                            )}
                            <Field.HelperText>
                                Describe your pet's personality and
                                characteristics (10-200 characters)
                                <Text
                                    as="span"
                                    color={
                                        description.length > 180
                                            ? 'red.500'
                                            : 'gray.500'
                                    }
                                    ml={2}
                                >
                                    {description.length}/200
                                </Text>
                            </Field.HelperText>
                        </Field.Root>

                        <Field.Root required invalid={!!errors.yearBirth}>
                            <Field.Label>
                                <HStack>
                                    <Icon color="purple.500">
                                        <Calendar size={16} />
                                    </Icon>
                                    <Text>Birth Year</Text>
                                </HStack>
                            </Field.Label>
                            <NumberInput.Root
                                value={yearBirth.toString()}
                                min={1900}
                                max={currentYear}
                                onValueChange={e => {
                                    const value =
                                        e.valueAsNumber || currentYear;
                                    setYearBirth(value);
                                    if (errors.yearBirth) {
                                        setErrors(prev => ({
                                            ...prev,
                                            yearBirth: undefined,
                                        }));
                                    }
                                }}
                                size="lg"
                                disabled={isSubmitting}
                            >
                                <NumberInput.Input />
                                <NumberInput.Control>
                                    <NumberInput.IncrementTrigger />
                                    <NumberInput.DecrementTrigger />
                                </NumberInput.Control>
                            </NumberInput.Root>
                            {errors.yearBirth && (
                                <Field.ErrorText>
                                    {errors.yearBirth}
                                </Field.ErrorText>
                            )}
                            <Field.HelperText>
                                <HStack justify="space-between">
                                    <Text>Year your pet was born</Text>
                                    {yearBirth >= 1900 &&
                                        yearBirth <= currentYear && (
                                            <Badge
                                                colorScheme="blue"
                                                variant="outline"
                                            >
                                                {age} year{age !== 1 ? 's' : ''}{' '}
                                                old
                                            </Badge>
                                        )}
                                </HStack>
                            </Field.HelperText>
                        </Field.Root>

                        {yearBirth && age > 50 && (
                            <Alert.Root status="info" size="sm">
                                <Alert.Indicator />
                                <Alert.Title>Senior Pet</Alert.Title>
                                <Alert.Description>
                                    This pet is quite mature! Make sure all
                                    details are correct.
                                </Alert.Description>
                            </Alert.Root>
                        )}
                    </VStack>
                </form>
            </Card.Body>

            <Card.Footer>
                <HStack w="full" gap={4}>
                    <Button
                        variant="outline"
                        size="lg"
                        flex={1}
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        colorScheme={isEditing ? 'yellow' : 'blue'}
                        size="lg"
                        flex={2}
                        loading={isSubmitting || isLoading}
                        disabled={
                            !name.trim() || !description.trim() || !yearBirth
                        }
                    >
                        {isEditing ? 'Update Pet' : 'Add Pet to Collection'}
                    </Button>
                </HStack>
            </Card.Footer>
        </Card.Root>
    );
};

export default PetForm;
