import { toaster } from '@/components/ui/Toaster';
import { useWallet } from '@/hooks/useWallet';
import {
    Accordion,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Container,
    Flex,
    Grid,
    Heading,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ChevronRight, Code, Shield, Users, Wallet, Zap } from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ContractInfo from './components/ContractInfo';

const Home = () => {
    const { connectWallet, isConnected, account } = useWallet();
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Wallet connection error:', error);

            // Provide specific error messages based on error type
            let title = 'Connection Failed';
            let description = 'Failed to connect wallet. Please try again.';

            switch (error.name) {
                case 'BrowserNotSupported':
                    title = 'Browser Not Supported';
                    description =
                        'Please use a Web3 compatible browser to continue.';
                    break;
                case 'WalletNotInstalled':
                    title = 'Wallet Not Found';
                    description =
                        'Please install MetaMask or another Web3 wallet to continue.';
                    break;
                case 'UserRejected':
                    title = 'Connection Rejected';
                    description =
                        'Please accept the connection request in your wallet.';
                    break;
                case 'RequestPending':
                    title = 'Request Pending';
                    description =
                        'Please check your wallet for a pending connection request.';
                    break;
                case 'NoAccountsFound':
                    title = 'No Accounts';
                    description =
                        'Please unlock your wallet and ensure you have at least one account.';
                    break;
                case 'WalletNotInitialized':
                    title = 'Wallet Error';
                    description = 'Please refresh the page and try again.';
                    break;
                default:
                    description =
                        error.message ||
                        'Failed to connect wallet. Please try again.';
            }

            toaster.create({
                title,
                description,
                type: 'error',
                duration: 5000,
                closable: true,
            });
        } finally {
            setIsConnecting(false);
        }
    };

    const BannerSection = () => (
        <Box py={20} textAlign="center">
            <Container maxW="7xl">
                <VStack gap={8}>
                    <Box>
                        <Heading size="4xl" color="gray.900" mb={6}>
                            Pet Dex Catalog
                        </Heading>
                        <Text
                            fontSize="xl"
                            color="gray.600"
                            maxW="2xl"
                            mx="auto"
                            lineHeight="tall"
                        >
                            Your comprehensive digital pet registry on the
                            blockchain. Catalog, manage, and explore pets with
                            complete transparency and ownership verification.
                        </Text>
                    </Box>

                    <HStack gap={4} flexWrap="wrap" justify="center">
                        <Badge colorScheme="blue" px={3} py={1} rounded="full">
                            Pet Registry
                        </Badge>
                        <Badge colorScheme="green" px={3} py={1} rounded="full">
                            Ownership Verified
                        </Badge>
                        <Badge
                            colorScheme="purple"
                            px={3}
                            py={1}
                            rounded="full"
                        >
                            Immutable Records
                        </Badge>
                    </HStack>

                    <HStack gap={6} mt={8}>
                        <Flex align="center" gap={2}>
                            <Zap
                                size={20}
                                color="var(--chakra-colors-blue-500)"
                            />
                            <Text color="gray.600">Digital Catalog</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Shield
                                size={20}
                                color="var(--chakra-colors-green-500)"
                            />
                            <Text color="gray.600">Verified Records</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Users
                                size={20}
                                color="var(--chakra-colors-purple-500)"
                            />
                            <Text color="gray.600">Pet Community</Text>
                        </Flex>
                    </HStack>
                </VStack>
            </Container>
        </Box>
    );

    const WalletSection = () => (
        <Box py={16} bg="gray.50">
            <Container maxW="4xl" textAlign="center">
                <VStack gap={8}>
                    <Box>
                        <Heading size="2xl" color="gray.900" mb={4}>
                            Connect Your Wallet
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="2xl">
                            Connect your Web3 wallet to access the Pet Dex
                            Catalog. Register new pets, update pet information,
                            and explore the complete digital pet registry.
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
                                        Connect your wallet to access the pet
                                        catalog and start registering your pets.
                                    </Text>
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
                                            <RouterLink to="/pets">
                                                Browse Pet Catalog{' '}
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
                                            <RouterLink to="/add-pet">
                                                Register Pet
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

    const ContractSection = () => (
        <Box py={16}>
            <Container maxW="7xl">
                <VStack gap={12}>
                    <Box textAlign="center">
                        <Heading size="2xl" color="gray.900" mb={4}>
                            Pet Dex Catalog Smart Contract
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="3xl">
                            Our PetDexCatalog smart contract provides a secure,
                            decentralized registry for pet information with full
                            ownership verification and data integrity.
                        </Text>
                    </Box>

                    <Grid
                        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                        gap={8}
                    >
                        <Card.Root boxShadow="lg">
                            <CardBody p={6}>
                                <VStack align="start" gap={4}>
                                    <Flex align="center" gap={2}>
                                        <Code
                                            size={24}
                                            color="var(--chakra-colors-blue-500)"
                                        />
                                        <Heading size="md" color="gray.900">
                                            Core Functions
                                        </Heading>
                                    </Flex>
                                    <VStack align="start" gap={3}>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                addPet()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Registers new pets with name,
                                                description, and birth year
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                editPet()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Modifies pet catalog entries
                                                with data validation
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                removePet()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Removes pets from catalog
                                                (contract owner only)
                                            </Text>
                                        </Box>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card.Root>

                        <Card.Root boxShadow="lg">
                            <CardBody p={6}>
                                <VStack align="start" gap={4}>
                                    <Flex align="center" gap={2}>
                                        <Shield
                                            size={24}
                                            color="var(--chakra-colors-green-500)"
                                        />
                                        <Heading size="md" color="gray.900">
                                            Security Features
                                        </Heading>
                                    </Flex>
                                    <VStack align="start" gap={3}>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                Owner Restrictions
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Critical functions are
                                                restricted to contract owner
                                                only
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                Input Validation
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                String comparison and non-zero
                                                validation for data integrity
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                Immutable Owner
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Contract owner is set at
                                                deployment and cannot be changed
                                            </Text>
                                        </Box>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card.Root>
                    </Grid>

                    <Grid
                        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                        gap={8}
                    >
                        <Card.Root bg="gray.50">
                            <CardBody p={6}>
                                <VStack gap={4}>
                                    <Heading size="md" color="gray.900">
                                        Contract Structure
                                    </Heading>
                                    <Box textAlign="left" w="full">
                                        <Text
                                            fontSize="sm"
                                            color="gray.600"
                                            mb={3}
                                        >
                                            Each pet in the catalog contains:
                                        </Text>
                                        <Box
                                            bg="white"
                                            p={4}
                                            rounded="md"
                                            border="1px"
                                            borderColor="gray.200"
                                        >
                                            <Text
                                                fontFamily="mono"
                                                fontSize="sm"
                                                color="gray.700"
                                            >
                                                struct Pet &#123;
                                                <br />
                                                &nbsp;&nbsp;string name;
                                                <br />
                                                &nbsp;&nbsp;string description;
                                                <br />
                                                &nbsp;&nbsp;uint32 yearBirth;
                                                <br />
                                                &#125;
                                            </Text>
                                        </Box>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card.Root>

                        <ContractInfo />
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );

    const FAQSection = () => {
        const faqs = [
            {
                id: 'a',
                question: 'What is Pet Dex Catalog?',
                answer: 'Pet Dex Catalog is a decentralized pet registry built on blockchain technology. It allows pet owners to create permanent, verifiable records of their pets with complete ownership history and detailed information stored securely on-chain.',
            },
            {
                id: 'b',
                question: 'How do I connect my wallet?',
                answer: "You can connect your wallet by clicking the 'Connect Wallet' button. We support MetaMask and other Web3-compatible wallets. Make sure you have a wallet installed and are connected to the correct network.",
            },
            {
                id: 'c',
                question: 'What can I do with my connected wallet?',
                answer: 'With a connected wallet, you can register new pets in the catalog, browse existing pet records, update pet information, and maintain a permanent digital registry. Your wallet proves ownership and authorizes all transactions.',
            },
            {
                id: 'd',
                question: 'Is my pet data secure on the blockchain?',
                answer: 'Absolutely! Pet records are stored permanently on the blockchain with cryptographic security. The data is immutable, publicly verifiable, and includes built-in validation to ensure data integrity and prevent unauthorized modifications.',
            },
            {
                id: 'e',
                question: 'Who can register pets in the catalog?',
                answer: 'Any user with a connected wallet can register new pets and update existing pet information. Only the contract owner has permission to remove pets from the catalog, ensuring data integrity and preventing misuse.',
            },
            {
                id: 'f',
                question: 'What information is stored for each pet?',
                answer: "Each pet record includes the pet's name, detailed description, and birth year. All information is permanently stored on-chain and can be updated by users while maintaining a complete history of changes.",
            },
        ];

        return (
            <Box py={16} bg="gray.50">
                <Container maxW="4xl">
                    <VStack gap={8}>
                        <Box textAlign="center">
                            <Heading size="2xl" color="gray.900" mb={4}>
                                Frequently Asked Questions
                            </Heading>
                            <Text fontSize="lg" color="gray.600">
                                Got questions about pet registration? Learn how
                                our decentralized catalog works and keeps your
                                pet data secure.
                            </Text>
                        </Box>

                        <Accordion.Root multiple defaultValue={['a']} w="full">
                            {faqs.map((faq, index) => (
                                <Accordion.Item key={index} value={faq.id}>
                                    <Accordion.ItemTrigger
                                        bg="white"
                                        _hover={{ bg: 'gray.50' }}
                                        p={4}
                                    >
                                        <Box flex="1" textAlign="left">
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.900"
                                            >
                                                {faq.question}
                                            </Text>
                                        </Box>
                                        <Accordion.ItemIndicator />
                                    </Accordion.ItemTrigger>
                                    <Accordion.ItemContent
                                        bg="white"
                                        p={4}
                                        pt={0}
                                    >
                                        <Accordion.ItemBody>
                                            <Text
                                                color="gray.600"
                                                lineHeight="tall"
                                            >
                                                {faq.answer}
                                            </Text>
                                        </Accordion.ItemBody>
                                    </Accordion.ItemContent>
                                </Accordion.Item>
                            ))}
                        </Accordion.Root>
                    </VStack>
                </Container>
            </Box>
        );
    };

    return (
        <Box minH="100vh" bg="white">
            <BannerSection />
            <WalletSection />
            <ContractSection />
            <FAQSection />
        </Box>
    );
};

export default Home;
