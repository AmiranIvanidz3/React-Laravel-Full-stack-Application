import { createBrowserRouter, Navigate } from 'react-router-dom';

import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import Login from "./views/Login.jsx";
import Notfound from './views/Notfound.jsx';
import DefaultLayout from './components/Defaultlayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Dashboard from './views/Dashboard.jsx';


const router = createBrowserRouter([

    {
        path: "/",
        element: <DefaultLayout/>,
        children: [
            {
                path:"/",
                element: <Navigate to="/users" />

            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
        ]
    }, 

    {
        path: "/",
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },

    {
        path: '*',
        element: <Notfound/>
    }
])

export default router;