import { Alert, Badge, Box, HStack, Link, Text } from '@chakra-ui/react';
import { MoveUpRight } from 'lucide-react';
import { useContract } from '../hooks/useContract';
import {
    getExplorerUrl,
    getNetworkName,
    isCorrectNetwork,
} from '../utils/contract';

// Replace with your actual contract address
export const CONTRACT_ADDRESS = '0x98E675928B647F7d3059a442526ad5FA07f5cA9C';

const ContractInfo = () => {
    const { chainId, isConnected } = useContract();

    if (!isConnected) {
        return null;
    }

    const explorerUrl = getExplorerUrl(CONTRACT_ADDRESS);
    const networkName = getNetworkName();
    const correctNetwork = isCorrectNetwork(chainId || 0);

    if (!correctNetwork) {
        return (
            <Alert.Root status="warning">
                <Alert.Indicator />
                Please switch to Sepolia testnet to use this dApp
            </Alert.Root>
        );
    }

    return (
        <Box
            bg="blue.50"
            p={4}
            borderRadius="md"
            border="1px"
            borderColor="blue.200"
        >
            <HStack justify="space-between" align="center" wrap="wrap" gap={4}>
                <HStack gap={3}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                        Contract:
                    </Text>
                    <Text fontSize="sm" fontFamily="mono" color="blue.700">
                        {CONTRACT_ADDRESS.slice(0, 6)}...
                        {CONTRACT_ADDRESS.slice(-4)}
                    </Text>
                    <Badge colorScheme="green" size="sm">
                        {networkName}
                    </Badge>
                </HStack>

                <Link
                    href={explorerUrl}
                    color="blue.600"
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ color: 'blue.700' }}
                >
                    View on Sepolia Etherscan
                    <MoveUpRight style={{ marginLeft: 1 }} />
                </Link>
            </HStack>
        </Box>
    );
};

export default ContractInfo;
