import { toaster } from '@/components/ui/toaster';
import { useWallet } from '@/hooks/useWallet';
import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Wallet } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    const { connectWallet, isConnected } = useWallet();
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

    if (!isConnected) {
        return (
            <Box minH="100vh" bg="gradient-to-br from-blue.50 to-purple.50">
                <Center minH="100vh" px={4}>
                    <Container maxW="md">
                        <VStack gap={8} textAlign="center">
                            <Box>
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    mb={4}
                                >
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
                        <Box display="flex" justifyContent="center" mb={4}>
                            <Wallet
                                size={64}
                                color="var(--chakra-colors-blue-500)"
                            />
                        </Box>
                        <Heading size="2xl" color="gray.900" mb={6}>
                            Welcome to Techs For Dummies
                        </Heading>
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
