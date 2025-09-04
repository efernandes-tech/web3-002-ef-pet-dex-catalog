import { useWallet } from '@/hooks/useWallet';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Wallet } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import AccountMenu from './components/AccountMenu';

const Navbar = () => {
    const { chainId, isConnected, connectWallet } = useWallet();

    const getNetworkName = () => {
        const networks = {
            1: 'Mainnet',
            11155111: 'Sepolia',
            1337: 'Localhost',
        } as const;
        return networks[chainId as keyof typeof networks] || 'Unknown';
    };

    return (
        <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Container maxW="7xl" py={4}>
                <VStack gap={0} align="stretch">
                    <HStack justify="space-between" align="center">
                        <Heading
                            asChild
                            size="lg"
                            color="primary"
                            _hover={{ color: 'secondary' }}
                        >
                            <RouterLink to="/">
                                <Flex align="center" gap={2}>
                                    <Image
                                        src="ef-pet-dex-catalog.svg"
                                        width="36px"
                                    />
                                    <Text>Pet Dex Catalog</Text>
                                </Flex>
                            </RouterLink>
                        </Heading>

                        <HStack gap={4}>
                            {isConnected && (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <RouterLink to="/pets">Pets</RouterLink>
                                    </Button>

                                    <Button asChild variant="ghost" size="sm">
                                        <RouterLink to="/add-pet">
                                            Add Pet
                                        </RouterLink>
                                    </Button>

                                    {chainId && (
                                        <Badge colorScheme="blue" size="sm">
                                            {getNetworkName()}
                                        </Badge>
                                    )}

                                    <AccountMenu />
                                </>
                            )}

                            {!isConnected && (
                                <Button
                                    onClick={connectWallet}
                                    colorScheme="blue"
                                    size="sm"
                                >
                                    <Wallet size={16} />
                                    Connect Wallet
                                </Button>
                            )}
                        </HStack>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );
};

export default Navbar;
