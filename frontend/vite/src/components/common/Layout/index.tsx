import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout = () => {
    return (
        <Box minH="100vh" bg="gray.50">
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    );
};

export default Layout;
