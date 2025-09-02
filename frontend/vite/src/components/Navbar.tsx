import { useWallet } from '@/hooks/useWallet';
import { getExplorerUrl, isCorrectNetwork } from '@/utils/contract';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Link,
    Menu,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChevronDown, ExternalLink, Wallet } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { CONTRACT_ADDRESS } from './ContractInfo';

const Navbar = () => {
    const { account, chainId, isConnected, connectWallet, disconnectWallet } =
        useWallet();

    const explorerUrl = getExplorerUrl(CONTRACT_ADDRESS);
    const correctNetwork = isCorrectNetwork(chainId || 0);

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
                        {/* Logo */}
                        <Heading
                            asChild
                            size="lg"
                            color="blue.600"
                            _hover={{ color: 'blue.700' }}
                        >
                            <RouterLink to="/">
                                <Flex align="center" gap={2}>
                                    <Wallet size={24} />
                                    <Text>Techs For Dummies</Text>
                                </Flex>
                            </RouterLink>
                        </Heading>

                        {/* Navigation */}
                        <HStack gap={4}>
                            {isConnected && (
                                <>
                                    <Button asChild variant="ghost" size="sm">
                                        <RouterLink to="/technologies">
                                            Technologies
                                        </RouterLink>
                                    </Button>

                                    <Button asChild variant="ghost" size="sm">
                                        <RouterLink to="/add-tech">
                                            Add Technology
                                        </RouterLink>
                                    </Button>

                                    {correctNetwork && (
                                        <Link
                                            href={explorerUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                            color="gray.600"
                                            fontSize="sm"
                                            fontWeight="medium"
                                            _hover={{ color: 'blue.600' }}
                                        >
                                            Contract Scan
                                            <ExternalLink size={12} />
                                        </Link>
                                    )}

                                    {chainId && (
                                        <Badge colorScheme="blue" size="sm">
                                            {getNetworkName()}
                                        </Badge>
                                    )}

                                    <Menu.Root>
                                        <Menu.Trigger asChild>
                                            <Button variant="outline" size="sm">
                                                <Wallet size={14} />
                                                {account.slice(0, 6)}...
                                                {account.slice(-4)}
                                                <ChevronDown size={14} />
                                            </Button>
                                        </Menu.Trigger>
                                        <Portal>
                                            <Menu.Positioner>
                                                <Menu.Content>
                                                    <Menu.Item
                                                        value="disconnect"
                                                        onClick={
                                                            disconnectWallet
                                                        }
                                                        color="red.600"
                                                    >
                                                        Disconnect Wallet
                                                    </Menu.Item>
                                                </Menu.Content>
                                            </Menu.Positioner>
                                        </Portal>
                                    </Menu.Root>
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
