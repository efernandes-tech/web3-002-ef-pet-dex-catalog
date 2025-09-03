import { useWallet } from '@/features/wallet';
import {
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChevronRight, Shield, Wallet } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

interface WalletSectionProps {
    onConnectWallet: () => Promise<void>;
    isConnecting: boolean;
}

export const WalletSection = ({
    onConnectWallet,
    isConnecting,
}: WalletSectionProps) => {
    const { isConnected, account } = useWallet();

    return (
        <Box py={16} bg="gray.50">
            <Container maxW="4xl" textAlign="center">
                <VStack gap={8}>
                    <Box>
                        <Heading size="2xl" color="gray.900" mb={4}>
                            Connect Your Wallet
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="2xl">
                            Start your journey by connecting your Web3 wallet to
                            interact with our smart contract and manage
                            technologies on the blockchain.
                        </Text>
                    </Box>

                    {!isConnected ? (
                        <Card.Root maxW="md" w="full" boxShadow="xl">
                            <CardBody p={8}>
                                <VStack gap={6}>
                                    <Box>
                                        <Wallet
                                            size={48}
                                            color="var(--chakra-colors-blue-500)"
                                        />
                                    </Box>
                                    <Text color="gray.600">
                                        Connect your wallet to access all
                                        features and start managing
                                        technologies.
                                    </Text>
                                    <Button
                                        onClick={onConnectWallet}
                                        colorScheme="blue"
                                        size="lg"
                                        loading={isConnecting}
                                        loadingText="Connecting..."
                                        boxShadow="lg"
                                        w="full"
                                    >
                                        Connect Wallet
                                    </Button>
                                    <Text fontSize="sm" color="gray.500">
                                        Supports MetaMask and other Web3 wallets
                                    </Text>
                                </VStack>
                            </CardBody>
                        </Card.Root>
                    ) : (
                        <Card.Root
                            maxW="md"
                            w="full"
                            boxShadow="xl"
                            bg="green.50"
                            borderColor="green.200"
                        >
                            <CardBody p={8}>
                                <VStack gap={6}>
                                    <Box>
                                        <Shield
                                            size={48}
                                            color="var(--chakra-colors-green-500)"
                                        />
                                    </Box>
                                    <Box textAlign="center">
                                        <Text
                                            color="green.600"
                                            fontWeight="semibold"
                                            mb={2}
                                        >
                                            Wallet Connected Successfully!
                                        </Text>
                                        <Text fontSize="sm" color="gray.600">
                                            {account
                                                ? `${account.slice(
                                                      0,
                                                      6,
                                                  )}...${account.slice(-4)}`
                                                : 'Connected'}
                                        </Text>
                                    </Box>
                                    <VStack gap={3} w="full">
                                        <Button
                                            asChild
                                            colorScheme="blue"
                                            size="lg"
                                            w="full"
                                        >
                                            <RouterLink to="/technologies">
                                                View Technologies{' '}
                                                <ChevronRight size={16} />
                                            </RouterLink>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            colorScheme="blue"
                                            size="md"
                                            w="full"
                                        >
                                            <RouterLink to="/add-tech">
                                                Add New Technology
                                            </RouterLink>
                                        </Button>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card.Root>
                    )}
                </VStack>
            </Container>
        </Box>
    );
};
