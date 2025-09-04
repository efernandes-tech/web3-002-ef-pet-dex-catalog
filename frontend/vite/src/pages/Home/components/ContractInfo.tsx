import { CONTRACT_ADDRESS, getExplorerUrl } from '@/utils/contract';
import {
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ExternalLink } from 'lucide-react';

const ContractInfo = () => {
    return (
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
                            <Text fontSize="sm" color="gray.600" mb={2}>
                                Deployed Contract Address:
                            </Text>
                            <Text
                                fontFamily="mono"
                                fontSize="sm"
                                color="primary"
                                fontWeight="medium"
                            >
                                {CONTRACT_ADDRESS.slice(0, 10)}
                                ...{CONTRACT_ADDRESS.slice(-8)}
                            </Text>
                        </Box>
                        <Link
                            href={getExplorerUrl(CONTRACT_ADDRESS)}
                            target="_blank"
                            rel="noopener noreferrer"
                            w="full"
                        >
                            <Button colorScheme="blue" size="md" w="full">
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
                            Verify contract source code, transactions, and
                            deployment details
                        </Text>
                    </VStack>
                </VStack>
            </CardBody>
        </Card.Root>
    );
};

export default ContractInfo;
