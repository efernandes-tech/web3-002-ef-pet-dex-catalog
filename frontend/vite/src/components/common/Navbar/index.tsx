import { useWallet } from '@/hooks/useWallet';
import {
    Badge,
    Box,
    Button,
    Container,
    Flex,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Menu as MenuIcon, Wallet, X } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AccountMenu from './components/AccountMenu';

interface Props {
    children: React.ReactNode;
}

interface NavLinkData {
    name: string;
    path: string;
    requiresConnection?: boolean;
}

const Links: NavLinkData[] = [
    { name: 'Home', path: '/' },
    { name: 'Pets', path: '/pets', requiresConnection: true },
    { name: 'Add Pet', path: '/add-pet', requiresConnection: true },
];

const NavLink = ({
    children,
    path,
    onClick,
}: Props & { path: string; onClick?: () => void }) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <Box
            asChild
            px={3}
            py={2}
            rounded="md"
            fontWeight={isActive ? 'semibold' : 'medium'}
            color={isActive ? 'blue.600' : 'gray.700'}
            bg={isActive ? 'blue.50' : 'transparent'}
            _hover={{
                textDecoration: 'none',
                bg: isActive ? 'blue.100' : 'gray.100',
                color: isActive ? 'blue.700' : 'gray.900',
            }}
            transition="all 0.2s"
            onClick={onClick}
        >
            <RouterLink to={path}>{children}</RouterLink>
        </Box>
    );
};

export default function Navbar() {
    const { chainId, isConnected, connectWallet } = useWallet();
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => setIsOpen(!isOpen);
    const onClose = () => setIsOpen(false);

    const getNetworkName = () => {
        const networks = {
            1: 'Mainnet',
            11155111: 'Sepolia',
            1337: 'Localhost',
        } as const;
        return networks[chainId as keyof typeof networks] || 'Unknown';
    };

    const visibleLinks = Links.filter(
        link => !link.requiresConnection || isConnected,
    );

    return (
        <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Box px={4}>
                <Container maxW="7xl">
                    <Flex
                        h={16}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <IconButton
                            size="md"
                            aria-label="Toggle Menu"
                            display={{ md: 'none' }}
                            onClick={onToggle}
                            variant="ghost"
                        >
                            {isOpen ? <X size={18} /> : <MenuIcon size={18} />}
                        </IconButton>

                        <HStack gap={10} alignItems="center">
                            <Box>
                                <RouterLink to="/">
                                    <Flex align="center" gap={2}>
                                        <Image
                                            src="/ef-pet-dex-catalog.svg"
                                            width="32px"
                                            alt="Pet Dex Logo"
                                        />
                                        <Text
                                            fontSize="lg"
                                            fontWeight="bold"
                                            color="gray.800"
                                        >
                                            Pet Dex Catalog
                                        </Text>
                                    </Flex>
                                </RouterLink>
                            </Box>

                            <HStack
                                as="nav"
                                gap={1}
                                display={{ base: 'none', md: 'flex' }}
                            >
                                {visibleLinks.map(link => (
                                    <NavLink key={link.name} path={link.path}>
                                        {link.name}
                                    </NavLink>
                                ))}
                            </HStack>
                        </HStack>

                        <Flex alignItems="center" gap={3}>
                            {isConnected && chainId && (
                                <Badge
                                    colorScheme="blue"
                                    size="sm"
                                    px={2}
                                    py={1}
                                    borderRadius="md"
                                    fontSize="xs"
                                    display={{ base: 'none', sm: 'block' }}
                                >
                                    {getNetworkName()}
                                </Badge>
                            )}

                            {isConnected ? (
                                <AccountMenu />
                            ) : (
                                <Button
                                    onClick={connectWallet}
                                    colorScheme="blue"
                                    size="sm"
                                >
                                    <Wallet size={16} />
                                    <Text
                                        display={{ base: 'none', sm: 'block' }}
                                    >
                                        Connect Wallet
                                    </Text>
                                    <Text
                                        display={{ base: 'block', sm: 'none' }}
                                    >
                                        Connect
                                    </Text>
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Container>

                {isOpen && (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as="nav" gap={2}>
                            {visibleLinks.map(link => (
                                <NavLink
                                    key={link.name}
                                    path={link.path}
                                    onClick={onClose}
                                >
                                    {link.name}
                                </NavLink>
                            ))}

                            {isConnected && chainId && (
                                <Box pt={2}>
                                    <Badge
                                        colorScheme="blue"
                                        size="sm"
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                        fontSize="xs"
                                    >
                                        Network: {getNetworkName()}
                                    </Badge>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
