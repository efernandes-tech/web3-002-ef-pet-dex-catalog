import type { PetWithId } from '@/types/contract.types';
import {
    Badge,
    Box,
    Button,
    Card,
    Center,
    Flex,
    Heading,
    HStack,
    IconButton,
    NativeSelect,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

interface PetListProps {
    pets: PetWithId[];
    onEdit: (pet: PetWithId) => void;
    onDelete: (id: number) => void;
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
}

const PetCard = ({
    pet,
    onEdit,
    onDelete,
}: {
    pet: PetWithId;
    onEdit: (pet: PetWithId) => void;
    onDelete: (id: number) => void;
}) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - pet.yearBirth;

    const gradientColors = [
        ['#667eea', '#764ba2'],
        ['#f093fb', '#f5576c'],
        ['#4facfe', '#00f2fe'],
        ['#43e97b', '#38f9d7'],
        ['#fa709a', '#fee140'],
        ['#a8edea', '#fed6e3'],
        ['#ff9a9e', '#fecfef'],
        ['#ffecd2', '#fcb69f'],
        ['#a8c0ff', '#3f2b96'],
        ['#ffa585', '#ffeda0'],
        ['#89f7fe', '#66a6ff'],
        ['#fdbb2d', '#22c1c3'],
        ['#e0c3fc', '#9bb5ff'],
        ['#f6d365', '#fda085'],
        ['#72ffb6', '#10d164'],
    ];

    const colorIndex = pet.id % gradientColors.length;
    const [color1, color2] = gradientColors[colorIndex];
    const gradientBg = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

    return (
        <Card.Root
            maxW="280px"
            bg="white"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="lg"
            transition="all 0.2s"
            _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '2xl',
            }}
            position="relative"
        >
            <Box
                bg={gradientBg}
                h="120px"
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Box
                    w="80px"
                    h="80px"
                    borderRadius="full"
                    bg="white"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="lg"
                >
                    <Text fontSize="2xl" fontWeight="bold" color="gray.600">
                        {pet.name.charAt(0).toUpperCase()}
                    </Text>
                </Box>
                <Box position="absolute" top="3" right="3">
                    <Badge
                        colorScheme="yellow"
                        variant="solid"
                        fontSize="xs"
                        px="2"
                        py="1"
                        borderRadius="full"
                    >
                        #{pet.id.toString().padStart(3, '0')}
                    </Badge>
                </Box>
            </Box>

            <VStack p="4" align="stretch" gap="3">
                <VStack align="stretch" gap="2">
                    <Heading size="md" color="gray.800" textAlign="center">
                        {pet.name}
                    </Heading>
                    <Text
                        color="gray.600"
                        fontSize="sm"
                        textAlign="center"
                        lineClamp={2}
                        minH="40px"
                    >
                        {pet.description}
                    </Text>
                </VStack>

                <HStack justify="space-between" align="center">
                    <VStack gap="1" align="start">
                        <Text
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="medium"
                        >
                            Born
                        </Text>
                        <Badge colorScheme="blue" variant="outline">
                            {pet.yearBirth}
                        </Badge>
                    </VStack>
                    <VStack gap="1" align="end">
                        <Text
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="medium"
                        >
                            Age
                        </Text>
                        <Badge colorScheme="green" variant="outline">
                            {age} years
                        </Badge>
                    </VStack>
                </HStack>

                <HStack gap="2" pt="2">
                    <Button
                        onClick={() => onEdit(pet)}
                        colorScheme="yellow"
                        size="sm"
                        flex="1"
                        fontSize="xs"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => onDelete(pet.id)}
                        colorScheme="red"
                        size="sm"
                        flex="1"
                        fontSize="xs"
                    >
                        Delete
                    </Button>
                </HStack>
            </VStack>
        </Card.Root>
    );
};

const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <VStack gap="4" align="stretch">
            <HStack
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap="4"
            >
                <HStack gap="2" align="center">
                    <Text fontSize="sm" color="gray.600">
                        Show
                    </Text>
                    <NativeSelect.Root size="sm" w="80px">
                        <NativeSelect.Field
                            value={itemsPerPage}
                            onChange={e =>
                                onItemsPerPageChange(Number(e.target.value))
                            }
                        >
                            <option value={6}>6</option>
                            <option value={12}>12</option>
                            <option value={18}>18</option>
                            <option value={24}>24</option>
                        </NativeSelect.Field>
                    </NativeSelect.Root>
                    <Text fontSize="sm" color="gray.600">
                        per page
                    </Text>
                </HStack>

                <Text fontSize="sm" color="gray.600">
                    {totalItems > 0
                        ? `${startItem}-${endItem} of ${totalItems}`
                        : '0 of 0'}{' '}
                    pets
                </Text>
            </HStack>

            {totalPages > 1 && (
                <HStack justify="center" gap="2">
                    <IconButton
                        aria-label="Previous page"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage <= 1}
                        size="sm"
                        variant="outline"
                    >
                        <ChevronLeft size={16} />
                    </IconButton>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        page => {
                            const isCurrentPage = page === currentPage;
                            const shouldShow =
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 &&
                                    page <= currentPage + 1);

                            if (!shouldShow) {
                                if (
                                    page === currentPage - 2 ||
                                    page === currentPage + 2
                                ) {
                                    return (
                                        <Text
                                            key={page}
                                            fontSize="sm"
                                            color="gray.400"
                                        >
                                            ...
                                        </Text>
                                    );
                                }
                                return null;
                            }

                            return (
                                <Button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    size="sm"
                                    variant={
                                        isCurrentPage ? 'solid' : 'outline'
                                    }
                                    colorScheme={
                                        isCurrentPage ? 'blue' : 'gray'
                                    }
                                    minW="40px"
                                >
                                    {page}
                                </Button>
                            );
                        },
                    )}

                    <IconButton
                        aria-label="Next page"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage >= totalPages}
                        size="sm"
                        variant="outline"
                    >
                        <ChevronRight size={16} />
                    </IconButton>
                </HStack>
            )}
        </VStack>
    );
};

const PetList = ({ pets, onEdit, onDelete }: PetListProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const totalItems = pets.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPets = pets.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <VStack gap={6} align="stretch" mb={24}>
            <Flex
                justify="space-between"
                align="center"
                flexWrap="wrap"
                gap={4}
            >
                <Heading size="lg" color="gray.800">
                    Pet Collection
                </Heading>
                {pets.length > 0 && (
                    <Badge
                        colorScheme="purple"
                        variant="solid"
                        fontSize="sm"
                        px={3}
                        py={1}
                        borderRadius="full"
                    >
                        {pets.length} Total
                    </Badge>
                )}
            </Flex>

            {pets.length === 0 ? (
                <Center py={12}>
                    <VStack gap={4}>
                        <Box
                            w={16}
                            h={16}
                            borderRadius="full"
                            bg="gray.100"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text fontSize="2xl" color="gray.400">
                                🐾
                            </Text>
                        </Box>
                        <VStack gap={2}>
                            <Heading size="md" color="gray.600">
                                No pets found
                            </Heading>
                            <Text color="gray.500" textAlign="center">
                                Start building your pet collection by adding
                                your first pet!
                            </Text>
                        </VStack>
                    </VStack>
                </Center>
            ) : (
                <VStack gap={6} align="stretch">
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                        gap={6}
                        justifyItems="center"
                    >
                        {currentPets.map(pet => (
                            <PetCard
                                key={pet.id}
                                pet={pet}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </SimpleGrid>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </VStack>
            )}
        </VStack>
    );
};

export default PetList;
