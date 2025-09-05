import { CONTRACT_ADDRESS, getExplorerUrl } from '@/utils/contract';
import {
    Box,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Link,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { EarthIcon, Github, Mail } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => (
    <Box py={16} bg="gray.900" color="white">
        <Container maxW="6xl">
            <VStack gap={12}>
                <Grid
                    templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                    gap={8}
                    w="full"
                    divideX="2px"
                    divideColor="gray.700"
                >
                    <VStack align="start" gap={4}>
                        <Heading size="md">Pet Dex Catalog</Heading>
                        <Text fontSize="sm" color="gray.400">
                            A decentralized pet registry providing secure,
                            verifiable records for pet ownership and
                            information.
                        </Text>
                    </VStack>

                    <VStack align="start" gap={3} pl={4}>
                        <Heading size="sm" color="gray.300">
                            Platform
                        </Heading>
                        <Stack gap={2}>
                            <Link
                                asChild
                                fontSize="sm"
                                color="gray.400"
                                _hover={{ color: 'white' }}
                            >
                                <RouterLink to="/pets">
                                    Browse Catalog
                                </RouterLink>
                            </Link>
                            <Link
                                asChild
                                fontSize="sm"
                                color="gray.400"
                                _hover={{ color: 'white' }}
                            >
                                <RouterLink to="/add-pet">
                                    Register Pet
                                </RouterLink>
                            </Link>
                        </Stack>
                    </VStack>

                    <VStack align="start" gap={3} pl={4}>
                        <Heading size="sm" color="gray.300">
                            Resources
                        </Heading>
                        <Stack gap={2}>
                            <Link
                                href={getExplorerUrl(CONTRACT_ADDRESS)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Text
                                    fontSize="sm"
                                    color="gray.400"
                                    _hover={{ color: 'white' }}
                                >
                                    Smart Contract
                                </Text>
                            </Link>
                        </Stack>
                    </VStack>

                    <VStack align="start" gap={3} pl={4}>
                        <Heading size="sm" color="gray.300">
                            Connect
                        </Heading>
                        <HStack gap={3}>
                            <Link
                                href="https://github.com/efernandes-tech/web3-002-ef-pet-dex-catalog"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                            </Link>
                            <Link
                                href="mailto:efernandes.tech@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Mail
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                            </Link>
                            <Link
                                href="https://edersonfernandes.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <EarthIcon
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                            </Link>
                        </HStack>
                    </VStack>
                </Grid>

                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="center"
                    gap={4}
                    w="full"
                >
                    <Text fontSize="sm" color="gray.400">
                        © 2024 Pet Dex Catalog. Built on blockchain technology.
                    </Text>
                    <HStack gap={6}>
                        <Link
                            asChild
                            fontSize="sm"
                            color="gray.400"
                            _hover={{ color: 'white' }}
                        >
                            <RouterLink to="/privacy-policy">
                                Privacy Policy
                            </RouterLink>
                        </Link>
                        <Link
                            asChild
                            fontSize="sm"
                            color="gray.400"
                            _hover={{ color: 'white' }}
                        >
                            <RouterLink to="/terms-service">
                                Terms of Service
                            </RouterLink>
                        </Link>
                        <Text fontSize="sm" color="gray.400"></Text>
                    </HStack>
                </Flex>
            </VStack>
        </Container>
    </Box>
);

export default Footer;
