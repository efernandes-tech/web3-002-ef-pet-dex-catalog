import { toaster } from '@/components/ui/toaster';
import { CONTRACT_ADDRESS, getExplorerUrl } from '@/features/contract';
import { useWallet } from '@/features/wallet';
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
    Link,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    ChevronRight,
    Code,
    ExternalLink,
    Github,
    Mail,
    Shield,
    Twitter,
    Users,
    Wallet,
    Zap,
} from 'lucide-react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

    const BannerSection = () => (
        <Box py={20} textAlign="center">
            <Container maxW="6xl">
                <VStack gap={8}>
                    <Box>
                        <Heading size="4xl" color="gray.900" mb={6}>
                            Techs For Dummies
                        </Heading>
                        <Text
                            fontSize="xl"
                            color="gray.600"
                            maxW="2xl"
                            mx="auto"
                            lineHeight="tall"
                        >
                            Discover, manage, and track cutting-edge
                            technologies on the blockchain. A decentralized
                            platform built for technology enthusiasts.
                        </Text>
                    </Box>

                    <HStack gap={4} flexWrap="wrap" justify="center">
                        <Badge colorScheme="blue" px={3} py={1} rounded="full">
                            Decentralized
                        </Badge>
                        <Badge colorScheme="green" px={3} py={1} rounded="full">
                            Transparent
                        </Badge>
                        <Badge
                            colorScheme="purple"
                            px={3}
                            py={1}
                            rounded="full"
                        >
                            Community-Driven
                        </Badge>
                    </HStack>

                    <HStack gap={6} mt={8}>
                        <Flex align="center" gap={2}>
                            <Zap
                                size={20}
                                color="var(--chakra-colors-blue-500)"
                            />
                            <Text color="gray.600">Fast & Secure</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Shield
                                size={20}
                                color="var(--chakra-colors-green-500)"
                            />
                            <Text color="gray.600">Blockchain Powered</Text>
                        </Flex>
                        <Flex align="center" gap={2}>
                            <Users
                                size={20}
                                color="var(--chakra-colors-purple-500)"
                            />
                            <Text color="gray.600">Community Built</Text>
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

    const ContractSection = () => (
        <Box py={16}>
            <Container maxW="6xl">
                <VStack gap={12}>
                    <Box textAlign="center">
                        <Heading size="2xl" color="gray.900" mb={4}>
                            Understanding Our Smart Contract
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="3xl">
                            Learn how our TechsForDummies.sol contract works and
                            what makes it secure and efficient.
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
                                                addTech()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Adds new technology entries with
                                                name, description, and adopter
                                                count
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                editTech()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Updates existing technology
                                                information with validation
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Text
                                                fontWeight="semibold"
                                                color="gray.700"
                                            >
                                                removeTech()
                                            </Text>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                            >
                                                Owner-only function to remove
                                                technologies (restricted access)
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
                                            The contract uses a simple but
                                            effective data structure:
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
                                                struct Tech &#123;
                                                <br />
                                                &nbsp;&nbsp;string name;
                                                <br />
                                                &nbsp;&nbsp;string description;
                                                <br />
                                                &nbsp;&nbsp;uint32 adopters;
                                                <br />
                                                &#125;
                                            </Text>
                                        </Box>
                                    </Box>
                                </VStack>
                            </CardBody>
                        </Card.Root>

                        <Card.Root bg="blue.50" borderColor="blue.200">
                            <CardBody p={6}>
                                <VStack gap={4} align="start">
                                    <Flex align="center" gap={2}>
                                        <ExternalLink
                                            size={24}
                                            color="var(--chakra-colors-blue-500)"
                                        />
                                        <Heading size="md" color="gray.900">
                                            Contract Scanner
                                        </Heading>
                                    </Flex>
                                    <VStack align="start" gap={3} w="full">
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.600"
                                                mb={2}
                                            >
                                                Deployed Contract Address:
                                            </Text>
                                            <Text
                                                fontFamily="mono"
                                                fontSize="sm"
                                                color="blue.700"
                                                fontWeight="medium"
                                            >
                                                {CONTRACT_ADDRESS.slice(0, 10)}
                                                ...{CONTRACT_ADDRESS.slice(-8)}
                                            </Text>
                                        </Box>
                                        <Link
                                            href={getExplorerUrl(
                                                CONTRACT_ADDRESS,
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            w="full"
                                        >
                                            <Button
                                                colorScheme="blue"
                                                size="md"
                                                w="full"
                                            >
                                                View on Blockchain Explorer
                                                <ExternalLink size={16} />
                                            </Button>
                                        </Link>
                                        <Text
                                            fontSize="xs"
                                            color="gray.500"
                                            textAlign="center"
                                            w="full"
                                        >
                                            Verify contract source code,
                                            transactions, and deployment details
                                        </Text>
                                    </VStack>
                                </VStack>
                            </CardBody>
                        </Card.Root>
                    </Grid>
                </VStack>
            </Container>
        </Box>
    );

    const FAQSection = () => {
        const faqs = [
            {
                id: 'a',
                question: 'What is Techs For Dummies?',
                answer: 'Techs For Dummies is a decentralized platform built on blockchain technology that allows users to discover, manage, and track cutting-edge technologies. It uses smart contracts to ensure transparency and community governance.',
            },
            {
                id: 'b',
                question: 'How do I connect my wallet?',
                answer: "You can connect your wallet by clicking the 'Connect Wallet' button. We support MetaMask and other Web3-compatible wallets. Make sure you have a wallet installed and are connected to the correct network.",
            },
            {
                id: 'c',
                question: 'What can I do with my connected wallet?',
                answer: 'Once connected, you can add new technologies to the platform, view existing technologies, edit technology information, and interact with our smart contract. Your wallet serves as your identity and authorization method.',
            },
            {
                id: 'd',
                question: 'Is my data secure on the blockchain?',
                answer: 'Yes! All data is stored on the blockchain, making it transparent, immutable, and secure. Our smart contract includes security measures like owner restrictions and input validation to protect the integrity of the platform.',
            },
            {
                id: 'e',
                question: 'Can anyone add or modify technologies?',
                answer: 'Any connected user can add new technologies and edit existing ones. However, only the contract owner can remove technologies. This balance ensures community participation while preventing abuse.',
            },
            {
                id: 'f',
                question: 'What blockchain network do you use?',
                answer: 'Our platform is built on Ethereum-compatible networks. Make sure your wallet is connected to the correct network to interact with our smart contract properly.',
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
                                Got questions? We have answers. Learn more about
                                our platform and how it works.
                            </Text>
                        </Box>

                        <Accordion.Root multiple defaultValue={['a']} w="full">
                            {faqs.map((faq, index) => (
                                <Accordion.Item
                                    key={index}
                                    value={faq.id}
                                    // border="1px"
                                    // borderColor="gray.200"
                                    // rounded="md"
                                    // mb={2}
                                >
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

    const Footer = () => (
        <Box py={16} bg="gray.900" color="white">
            <Container maxW="6xl">
                <VStack gap={12}>
                    <Grid
                        templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }}
                        gap={8}
                        w="full"
                        divideX="2px"
                        divideColor="gray.700"
                    >
                        <VStack align="start" gap={4}>
                            <Heading size="md">Techs For Dummies</Heading>
                            <Text fontSize="sm" color="gray.400">
                                A decentralized platform for discovering and
                                managing cutting-edge technologies on the
                                blockchain.
                            </Text>
                        </VStack>

                        <VStack align="start" gap={3} pl={4}>
                            <Heading size="sm" color="gray.300">
                                Platform
                            </Heading>
                            <Stack gap={2}>
                                <Link
                                    asChild
                                    fontSize="sm"
                                    color="gray.400"
                                    _hover={{ color: 'white' }}
                                >
                                    <RouterLink to="/technologies">
                                        View Technologies
                                    </RouterLink>
                                </Link>
                                <Link
                                    asChild
                                    fontSize="sm"
                                    color="gray.400"
                                    _hover={{ color: 'white' }}
                                >
                                    <RouterLink to="/add-tech">
                                        Add Technology
                                    </RouterLink>
                                </Link>
                            </Stack>
                        </VStack>

                        <VStack align="start" gap={3} pl={4}>
                            <Heading size="sm" color="gray.300">
                                Resources
                            </Heading>
                            <Stack gap={2}>
                                <Text fontSize="sm" color="gray.400">
                                    Smart Contract
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    Documentation
                                </Text>
                                <Text fontSize="sm" color="gray.400">
                                    Community
                                </Text>
                            </Stack>
                        </VStack>

                        <VStack align="start" gap={3} pl={4}>
                            <Heading size="sm" color="gray.300">
                                Connect
                            </Heading>
                            <HStack gap={3}>
                                <Github
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                                <Twitter
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                                <Mail
                                    size={20}
                                    color="var(--chakra-colors-gray-400)"
                                />
                            </HStack>
                        </VStack>
                    </Grid>

                    <Flex
                        direction={{ base: 'column', md: 'row' }}
                        justify="space-between"
                        align="center"
                        gap={4}
                        w="full"
                    >
                        <Text fontSize="sm" color="gray.400">
                            © 2024 Techs For Dummies. Built on blockchain
                            technology.
                        </Text>
                        <HStack gap={6}>
                            <Text fontSize="sm" color="gray.400">
                                Privacy Policy
                            </Text>
                            <Text fontSize="sm" color="gray.400">
                                Terms of Service
                            </Text>
                        </HStack>
                    </Flex>
                </VStack>
            </Container>
        </Box>
    );

    return (
        <Box minH="100vh" bg="white">
            <BannerSection />
            <WalletSection />
            <ContractSection />
            <FAQSection />
            <Footer />
        </Box>
    );
};

export default Home;
