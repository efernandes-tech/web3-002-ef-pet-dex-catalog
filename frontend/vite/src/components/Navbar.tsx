import { useContract } from '@/hooks/useContract';
import { getExplorerUrl, isCorrectNetwork } from '@/utils/contract';
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    Link,
    Menu,
    Portal,
    VStack,
} from '@chakra-ui/react';
import { MoveUpRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import ContractInfo, { CONTRACT_ADDRESS } from './ContractInfo';

const Navbar = () => {
    const { account, chainId, isConnected, connectWallet, disconnectWallet } =
        useContract();

    const explorerUrl = getExplorerUrl(CONTRACT_ADDRESS);
    const correctNetwork = isCorrectNetwork(chainId || 0);

    return (
        <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
            <Container maxW="7xl" py={4}>
                <VStack gap={0} align="stretch">
                    <HStack justify="space-between" align="center" py={4}>
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

                                    {correctNetwork && (
                                        <Link
                                            href={explorerUrl}
                                            color="gray.600"
                                            fontSize="sm"
                                            fontWeight="medium"
                                            _hover={{ color: 'blue.600' }}
                                        >
                                            Contract Scan
                                            <MoveUpRight
                                                style={{ marginLeft: 1 }}
                                            />
                                        </Link>
                                    )}

                                    <Menu.Root>
                                        <Menu.Trigger asChild>
                                            <Button
                                                as={Button}
                                                // variant="outline"
                                                size="sm"
                                                // icon={<ChevronDownIcon />}
                                            >
                                                {account.slice(0, 6)}...
                                                {account.slice(-4)}
                                            </Button>
                                        </Menu.Trigger>
                                        <Portal>
                                            <Menu.Positioner>
                                                <Menu.Content>
                                                    <Menu.Item
                                                        value=""
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

                    {isConnected && (
                        <Box pb={3}>
                            <ContractInfo />
                        </Box>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};

export default Navbar;
