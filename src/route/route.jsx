import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ForgotPsw from '../pages/ForgotPsw';
import OtpVerificate from '../pages/OtpVerificate';
import ResetPsw from '../pages/ResetPsw';
import Dashboard from '../components/Layout/Dashboard';
import Profile from '../pages/Profile';
import MyOrders from '../pages/MyOrders';
import Address from '../pages/Address';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPsw/>
            },
            {
                path: 'verification-otp',
                element: <OtpVerificate/>
            },
            {
                path: 'reset-password',
                element: <ResetPsw/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>,
                children: [
                    {
                        path: 'profile',
                        element: <Profile/>
                    },
                    {
                        path: 'myorders',
                        element: <MyOrders/>
                    },
                    {
                        path: 'address',
                        element: <Address/>
                    }
                ]
            }
        ]
    }
])

export default router;