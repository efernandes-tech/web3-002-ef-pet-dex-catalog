import { WalletContext } from '@/context/WalletContext';
import type { WalletContextType } from '@/types/wallet.types';
import { useContext } from 'react';

const useWallet = (): WalletContextType => {
    const context = useContext(WalletContext);

    if (context === undefined)
        throw new Error('useWallet must be used within a WalletProvider');

    return context;
};

export { useWallet };
