import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Tech from '@/pages/Tech';
import AddTech from '@/pages/Tech/AddTech';
import EditTech from '@/pages/Tech/EditTech';
import TermsService from '@/pages/TermsService';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="technologies" element={<Tech />} />
                        <Route path="add-tech" element={<AddTech />} />
                        <Route path="edit-tech/:id" element={<EditTech />} />
                        <Route
                            path="privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route
                            path="terms-service"
                            element={<TermsService />}
                        />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};
export default Routes;
