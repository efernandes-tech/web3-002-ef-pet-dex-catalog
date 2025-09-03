import {
    Badge,
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Shield, Users, Zap } from 'lucide-react';

export const BannerSection = () => (
    <Box py={20} textAlign="center">
        <Container maxW="6xl">
            <VStack gap={8}>
                <Box>
                    <Heading size="4xl" color="gray.900" mb={6}>
                        Techs For Dummies
                    </Heading>
                    <Text
                        fontSize="xl"
                        color="gray.600"
                        maxW="2xl"
                        mx="auto"
                        lineHeight="tall"
                    >
                        Discover, manage, and track cutting-edge technologies on
                        the blockchain. A decentralized platform built for
                        technology enthusiasts.
                    </Text>
                </Box>

                <HStack gap={4} flexWrap="wrap" justify="center">
                    <Badge colorScheme="blue" px={3} py={1} rounded="full">
                        Decentralized
                    </Badge>
                    <Badge colorScheme="green" px={3} py={1} rounded="full">
                        Transparent
                    </Badge>
                    <Badge colorScheme="purple" px={3} py={1} rounded="full">
                        Community-Driven
                    </Badge>
                </HStack>

                <HStack gap={6} mt={8}>
                    <Flex align="center" gap={2}>
                        <Zap size={20} color="var(--chakra-colors-blue-500)" />
                        <Text color="gray.600">Fast & Secure</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Shield
                            size={20}
                            color="var(--chakra-colors-green-500)"
                        />
                        <Text color="gray.600">Blockchain Powered</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Users
                            size={20}
                            color="var(--chakra-colors-purple-500)"
                        />
                        <Text color="gray.600">Community Built</Text>
                    </Flex>
                </HStack>
            </VStack>
        </Container>
    </Box>
);
