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
import CategoryPage from '../pages/CategoryPage';
import SubCategory from '../pages/SubCategory';
import UploadProduct from '../components/Product/UploadProduct';
import ProductAdmin from '../pages/ProductAdmin';
import ProductList from '../pages/ProductList';
import CheckoutPage from '../pages/CheckoutPage';
import Success from '../components/Layout/Success';
import Cancel from '../components/Layout/Cancel';
import ProductDisplay from '../pages/ProductDisplay';

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
                    },
                    {
                        path: 'category',
                        element: <CategoryPage/>
                    },
                    {
                        path: 'subcategory',
                        element: <SubCategory/>
                    },
                    {
                        path: 'upload-product',
                        element: <UploadProduct/>
                    },
                    {
                        path: 'product',
                        element: <ProductAdmin/>
                    }
                ]
            },
            {
                path : ":category",
                children : [
                    {
                        path : ":subCategory",
                        element : <ProductList/>
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplay/>
            },
            {
                path : "checkout",
                element : <CheckoutPage/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : 'cancel',
                element : <Cancel/>
            }
        ]
    }
])

export default router;