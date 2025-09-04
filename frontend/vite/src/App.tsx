import NetworkGuard from './components/common/NetworkGuard';
import { Provider } from './components/ui/Provider';
import { WalletProvider } from './context/WalletContext';
import Routes from './routes';

const App = () => {
    return (
        <Provider>
            <WalletProvider>
                <NetworkGuard>
                    <Routes />
                </NetworkGuard>
            </WalletProvider>
        </Provider>
    );
};

export default App;
