import { toaster } from '@/components/ui/Toaster';
import { getExplorerUrl } from '@/utils/contract';
import { useWallet } from '@/hooks/useWallet';
import { Button, Menu, Portal, Text } from '@chakra-ui/react';
import {
    ChevronDown,
    Copy,
    ExternalLink,
    Settings,
    User,
    Wallet,
} from 'lucide-react';

const AccountMenu = () => {
    const { account, disconnectWallet } = useWallet();

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
                            onClick={copyAddressToClipboard}
                        >
                            <Copy size={14} />
                            Copy Address
                        </Menu.Item>

                        <Menu.Item value="explorer" onClick={viewOnExplorer}>
                            <ExternalLink size={14} />
                            View on Explorer
                        </Menu.Item>

                        <Menu.Separator />

                        <Menu.Item value="profile" disabled color="gray.400">
                            <User size={14} />
                            Account Details
                            <Text fontSize="xs" ml="auto">
                                Soon
                            </Text>
                        </Menu.Item>

                        <Menu.Item value="settings" disabled color="gray.400">
                            <Settings size={14} />
                            Settings
                            <Text fontSize="xs" ml="auto">
                                Soon
                            </Text>
                        </Menu.Item>

                        <Menu.Separator />

                        <Menu.Item
                            value="disconnect"
                            onClick={disconnectWallet}
                            color="red.600"
                        >
                            <Wallet size={14} />
                            Disconnect Wallet
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
};

export default AccountMenu;
