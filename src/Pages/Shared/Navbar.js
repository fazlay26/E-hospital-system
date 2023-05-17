import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('accessToken')//signout korle localstorage theke token tao remove hoye jabe
    }

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/appoinment'>Appointment</Link></li>
        <li><Link to='/review'>Review</Link></li>
        <li><Link to='/contact'>Contact</Link></li>
        <li><Link to='/about'>About</Link></li>
        {
            user && <li><Link to='/dashboard'>Dashboard</Link></li>
        }
        <li>{user ? <button onClick={logOut} class="btn btn-link">logout({user?.displayName})</button> : <Link to='/login'>Login</Link>}</li>
    </>
    return (
        <div className="navbar bg-base-100">
            {/* for mobile device */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Doctor Portal</a>
            </div>
            {/* for large device */}
            <div className="navbar-end hidden lg:flex ">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div>
                <label tabIndex="0" for="my-drawer-2" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                {/* <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
            </div>
        </div>
    );
};

export default Navbar;