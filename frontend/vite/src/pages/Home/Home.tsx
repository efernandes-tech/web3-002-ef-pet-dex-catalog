import { toaster } from '@/components/ui/toaster';
import { useWallet } from '@/hooks/useWallet';
import {
    Badge,
    Box,
    Button,
    Center,
    Container,
    Flex,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Check, Wallet, X } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    const { connectWallet, account, isConnected, chainId, disconnectWallet } =
        useWallet();
    const [isConnecting, setIsConnecting] = useState(false);

    const handleConnectWallet = async () => {
        setIsConnecting(true);
        try {
            await connectWallet();
            toaster.create({
                title: 'Wallet Connected',
                description: 'Successfully connected to your wallet',
                type: 'success',
                duration: 3000,
                closable: true,
            });
        } catch {
            toaster.create({
                title: 'Connection Failed',
                description: 'Failed to connect wallet. Please try again.',
                type: 'error',
                duration: 5000,
                closable: true,
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnectWallet = () => {
        disconnectWallet();
        toaster.create({
            title: 'Wallet Disconnected',
            description: 'Your wallet has been disconnected',
            type: 'info',
            duration: 3000,
            closable: true,
        });
    };

    const getNetworkName = (chainId: number | null) => {
        switch (chainId) {
            case 1:
                return 'Mainnet';
            case 11155111:
                return 'Sepolia';
            case 1337:
                return 'Localhost';
            default:
                return 'Unknown Network';
        }
    };

    if (!isConnected) {
        return (
            <Box minH="100vh" bg="gradient-to-br from-blue.50 to-purple.50">
                <Center minH="100vh" px={4}>
                    <Container maxW="md">
                        <VStack gap={8} textAlign="center">
                            <Box>
                                <Box display="flex" justifyContent="center" mb={4}>
                                    <Wallet
                                        size={64}
                                        color="var(--chakra-colors-blue-500)"
                                    />
                                </Box>
                                <Heading size="2xl" color="gray.900" mb={4}>
                                    Techs For Dummies
                                </Heading>
                                <Text
                                    color="gray.600"
                                    fontSize="lg"
                                    lineHeight="tall"
                                    maxW="sm"
                                    mx="auto"
                                >
                                    Discover and manage cutting-edge
                                    technologies with our decentralized
                                    platform. Connect your wallet to get
                                    started.
                                </Text>
                            </Box>

                            <Box>
                                <Button
                                    onClick={handleConnectWallet}
                                    colorScheme="blue"
                                    size="lg"
                                    loading={isConnecting}
                                    loadingText="Connecting..."
                                    boxShadow="lg"
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                        boxShadow: 'xl',
                                    }}
                                    transition="all 0.2s"
                                >
                                    Connect Wallet
                                </Button>

                                <Text fontSize="sm" color="gray.500" mt={4}>
                                    Make sure you have MetaMask or another Web3
                                    wallet installed
                                </Text>
                            </Box>
                        </VStack>
                    </Container>
                </Center>
            </Box>
        );
    }

    return (
        <Box minH="100vh" bg="gradient-to-br from-blue.50 to-purple.50">
            <Container maxW="6xl" py={12}>
                <VStack gap={10} align="center" textAlign="center">
                    <Box>
                        <Heading size="2xl" color="gray.900" mb={6}>
                            Welcome to Techs For Dummies
                        </Heading>

                        <VStack gap={4}>
                            <HStack gap={4} flexWrap="wrap" justify="center">
                                <Flex
                                    align="center"
                                    gap={2}
                                    bg="white"
                                    px={4}
                                    py={2}
                                    rounded="full"
                                    boxShadow="sm"
                                    border="1px"
                                    borderColor="gray.200"
                                >
                                    <Check
                                        size={16}
                                        color="var(--chakra-colors-green-500)"
                                    />
                                    <Text fontSize="sm" fontWeight="medium">
                                        {account.slice(0, 6)}...
                                        {account.slice(-4)}
                                    </Text>
                                </Flex>

                                {chainId && (
                                    <Badge
                                        colorScheme={
                                            chainId === 1337
                                                ? 'yellow'
                                                : chainId === 1
                                                ? 'green'
                                                : 'blue'
                                        }
                                        px={3}
                                        py={1}
                                        rounded="full"
                                        fontSize="sm"
                                    >
                                        {getNetworkName(chainId)}
                                    </Badge>
                                )}
                            </HStack>

                            <Button
                                onClick={handleDisconnectWallet}
                                size="xs"
                                variant="ghost"
                                colorScheme="red"
                            >
                                <X
                                    size={12}
                                    style={{ marginRight: '0.25rem' }}
                                />
                                Disconnect
                            </Button>
                        </VStack>
                    </Box>

                    <Box
                        bg="white"
                        p={8}
                        rounded="2xl"
                        boxShadow="xl"
                        border="1px"
                        borderColor="gray.200"
                        maxW="md"
                        w="full"
                    >
                        <VStack gap={6}>
                            <Text
                                color="gray.600"
                                fontSize="lg"
                                lineHeight="tall"
                            >
                                Your wallet is connected! Start managing
                                cutting-edge technologies on the blockchain.
                            </Text>

                            <VStack gap={4} w="full">
                                <Button
                                    asChild
                                    colorScheme="blue"
                                    size="lg"
                                    w="full"
                                    boxShadow="lg"
                                    _hover={{
                                        transform: 'translateY(-1px)',
                                        boxShadow: 'xl',
                                    }}
                                    transition="all 0.2s"
                                >
                                    <RouterLink to="/technologies">
                                        View All Technologies
                                    </RouterLink>
                                </Button>

                                <Button
                                    asChild
                                    variant="outline"
                                    colorScheme="blue"
                                    size="lg"
                                    w="full"
                                    _hover={{
                                        bg: 'blue.50',
                                        transform: 'translateY(-1px)',
                                    }}
                                    transition="all 0.2s"
                                >
                                    <RouterLink to="/add-tech">
                                        Add New Technology
                                    </RouterLink>
                                </Button>
                            </VStack>
                        </VStack>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};

export default Home;
