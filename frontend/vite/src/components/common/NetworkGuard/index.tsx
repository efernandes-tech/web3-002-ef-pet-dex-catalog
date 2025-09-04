/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContract } from '@/hooks/useContract';
import { isCorrectNetwork, SEPOLIA_CHAIN_ID } from '@/utils/contract';
import {
    Alert,
    AlertDescription,
    AlertIndicator,
    AlertTitle,
    Button,
    Container,
    VStack,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface NetworkGuardProps {
    children: ReactNode;
}

const NetworkGuard = ({ children }: NetworkGuardProps) => {
    const { chainId, isConnected } = useContract();

    const switchToSepolia = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: `0x${SEPOLIA_CHAIN_ID.toString(16)}` }],
                });
            } catch (error: any) {
                if (error.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: `0x${SEPOLIA_CHAIN_ID.toString(
                                        16,
                                    )}`,
                                    chainName: 'Sepolia Testnet',
                                    nativeCurrency: {
                                        name: 'Sepolia ETH',
                                        symbol: 'ETH',
                                        decimals: 18,
                                    },
                                    rpcUrls: ['https://sepolia.infura.io/v3/'],
                                    blockExplorerUrls: [
                                        'https://sepolia.etherscan.io',
                                    ],
                                },
                            ],
                        });
                    } catch (addError) {
                        console.error(
                            'Failed to add Sepolia network:',
                            addError,
                        );
                    }
                }
            }
        }
    };

    if (!isConnected) {
        return <>{children}</>;
    }

    if (!isCorrectNetwork(chainId || 0)) {
        return (
            <Container maxW="2xl" py={12}>
                <Alert.Root
                    status="warning"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                >
                    <AlertIndicator boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                        Wrong Network!
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">
                        <VStack gap={4}>
                            <span>
                                This dApp only works on Sepolia testnet. Please
                                switch your network to continue.
                            </span>
                            <Button
                                colorScheme="orange"
                                onClick={switchToSepolia}
                            >
                                Switch to Sepolia Testnet
                            </Button>
                        </VStack>
                    </AlertDescription>
                </Alert.Root>
            </Container>
        );
    }

    return <>{children}</>;
};

export default NetworkGuard;
