import { toaster } from '@/components/ui/toaster';
import { getExplorerUrl } from '@/features/contract';
import { useWallet } from '@/features/wallet';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    Menu,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    ChevronDown,
    Copy,
    ExternalLink,
    Settings,
    User,
    Wallet,
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
    const { account, chainId, isConnected, connectWallet, disconnectWallet } =
        useWallet();

    const getNetworkName = () => {
        const networks = {
            1: 'Mainnet',
            11155111: 'Sepolia',
            1337: 'Localhost',
        } as const;
        return networks[chainId as keyof typeof networks] || 'Unknown';
    };

    const copyAddressToClipboard = async () => {
        if (account) {
            try {
                await navigator.clipboard.writeText(account);
                toaster.create({
                    title: 'Address Copied',
                    description: 'Wallet address copied to clipboard',
                    type: 'success',
                    duration: 2000,
                    closable: true,
                });
            } catch {
                toaster.create({
                    title: 'Copy Failed',
                    description: 'Failed to copy address to clipboard',
                    type: 'error',
                    duration: 3000,
                    closable: true,
                });
            }
        }
    };

    const viewOnExplorer = () => {
        if (account) {
            const explorerUrl = getExplorerUrl(account);
            window.open(explorerUrl, '_blank', 'noopener,noreferrer');
        }
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
                                                        value="copy"
                                                        onClick={
                                                            copyAddressToClipboard
                                                        }
                                                    >
                                                        <Copy size={14} />
                                                        Copy Address
                                                    </Menu.Item>

                                                    <Menu.Item
                                                        value="explorer"
                                                        onClick={viewOnExplorer}
                                                    >
                                                        <ExternalLink
                                                            size={14}
                                                        />
                                                        View on Explorer
                                                    </Menu.Item>

                                                    <Menu.Separator />

                                                    <Menu.Item
                                                        value="profile"
                                                        disabled
                                                        color="gray.400"
                                                    >
                                                        <User size={14} />
                                                        Account Details
                                                        <Text
                                                            fontSize="xs"
                                                            ml="auto"
                                                        >
                                                            Soon
                                                        </Text>
                                                    </Menu.Item>

                                                    <Menu.Item
                                                        value="settings"
                                                        disabled
                                                        color="gray.400"
                                                    >
                                                        <Settings size={14} />
                                                        Settings
                                                        <Text
                                                            fontSize="xs"
                                                            ml="auto"
                                                        >
                                                            Soon
                                                        </Text>
                                                    </Menu.Item>

                                                    <Menu.Separator />

                                                    <Menu.Item
                                                        value="disconnect"
                                                        onClick={
                                                            disconnectWallet
                                                        }
                                                        color="red.600"
                                                    >
                                                        <Wallet size={14} />
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
