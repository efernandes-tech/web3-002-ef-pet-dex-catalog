import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Layout, NetworkGuard } from './components';
import { AddTech, EditTech, Technologies } from './features/technologies';
import { WalletProvider } from './features/wallet';
import Home from './pages/Home/Home';

const App = () => {
    return (
        <WalletProvider>
            <Router>
                <NetworkGuard>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route
                                path="technologies"
                                element={<Technologies />}
                            />
                            <Route path="add-tech" element={<AddTech />} />
                            <Route
                                path="edit-tech/:id"
                                element={<EditTech />}
                            />
                        </Route>
                    </Routes>
                </NetworkGuard>
            </Router>
        </WalletProvider>
    );
};

export default App;
