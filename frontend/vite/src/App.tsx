import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import AddTech from './pages/AddTech/AddTech';
import EditTech from './pages/EditTech/EditTech';
import Home from './pages/Home/Home';
import Technologies from './pages/Technologies/Technologies';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="technologies" element={<Technologies />} />
                    <Route path="add-tech" element={<AddTech />} />
                    <Route path="edit-tech/:id" element={<EditTech />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
