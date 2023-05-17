//admin na hole all users button ta dekhabe na kintu url e jodi /dashboard/users likhi tahole thiki shb users er list diye dicche.eta off korar way:
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user); //nijeder banano hook,admin er data ta load hoye ashar jonne ekta loader lagbe tai adminLoading ke useAdmin hook theke pathai disi
    const location = useLocation();

    if (loading || adminLoading) {
        return <button className="btn loading">loading</button>
    }

    if (!user || !admin) { //login e niye jabe jodi user  na thake or admin nahoy ami
        signOut(auth);
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
};

export default RequireAdmin;
//shbkisu korar por app.js e <Route path="users" element={<RequireAdmin><Users></Users></RequireAdmin>}></Route> eta kore dite hobe