import { useContract } from '@/hooks/useContract';
import {
    Box,
    Button,
    Center,
    Container,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
    const { connectWallet, account, isConnected } = useContract();

    if (!isConnected) {
        return (
            <Box minH="100vh" bg="gray.50">
                <Center minH="100vh">
                    <VStack gap={6}>
                        <Heading size="2xl" color="gray.900">
                            Techs For Dummies
                        </Heading>
                        <Text color="gray.600" textAlign="center" maxW="md">
                            Discover and manage cutting-edge technologies with
                            our decentralized platform. Connect your wallet to
                            get started.
                        </Text>
                        <Button
                            onClick={connectWallet}
                            colorScheme="blue"
                            size="lg"
                        >
                            Connect Wallet
                        </Button>
                    </VStack>
                </Center>
            </Box>
        );
    }

    return (
        <Container maxW="7xl" py={12}>
            <VStack gap={8} align="center" textAlign="center">
                <Heading size="2xl" color="gray.900">
                    Welcome to Techs For Dummies
                </Heading>

                <Text fontSize="lg" color="gray.600" maxW="2xl">
                    Connected as: {account.slice(0, 6)}...{account.slice(-4)}
                </Text>

                <VStack gap={4}>
                    <Button asChild colorScheme="blue" size="lg">
                        <RouterLink to="/technologies">
                            Manage Technologies
                        </RouterLink>
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        colorScheme="blue"
                        size="lg"
                    >
                        <RouterLink to="/add-tech">
                            Add New Technology
                        </RouterLink>
                    </Button>
                </VStack>
            </VStack>
        </Container>
    );
};

export default Home;
