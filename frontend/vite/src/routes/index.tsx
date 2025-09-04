import Layout from '@/components/common/Layout';
import Home from '@/pages/Home';
import Pet from '@/pages/Pets';
import AddPet from '@/pages/Pets/AddPet';
import EditPet from '@/pages/Pets/EditPet';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsService from '@/pages/TermsService';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="pets" element={<Pet />} />
                        <Route path="add-pet" element={<AddPet />} />
                        <Route path="edit-pet/:id" element={<EditPet />} />
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
