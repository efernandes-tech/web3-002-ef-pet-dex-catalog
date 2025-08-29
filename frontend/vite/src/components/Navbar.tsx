import { useContract } from '@/hooks/useContract';
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const { account, isConnected, connectWallet } = useContract();

    return (
        <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Container maxW="7xl" py={4}>
                <HStack justify="space-between" align="center">
                    <Heading
                        asChild
                        size="lg"
                        color="blue.600"
                        _hover={{ color: 'blue.700' }}
                    >
                        <RouterLink to="/">Techs For Dummies</RouterLink>
                    </Heading>

                    <HStack gap={4}>
                        {isConnected ? (
                            <>
                                <Button asChild variant="ghost" size="sm">
                                    <RouterLink to="/technologies">
                                        Technologies
                                    </RouterLink>
                                </Button>

                                <Button asChild variant="ghost" size="sm">
                                    <RouterLink to="/add-tech">
                                        Add Tech
                                    </RouterLink>
                                </Button>

                                <Text fontSize="sm" color="gray.600">
                                    {account.slice(0, 6)}...{account.slice(-4)}
                                </Text>
                            </>
                        ) : (
                            <Button
                                onClick={connectWallet}
                                colorScheme="blue"
                                size="sm"
                            >
                                Connect Wallet
                            </Button>
                        )}
                    </HStack>
                </HStack>
            </Container>
        </Box>
    );
};

export default Navbar;
