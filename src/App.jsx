import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Layout/Header.jsx";
import Footer from "./components/Layout/Footer.jsx";
import { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails.js';
import { useEffect } from "react";
import {setUserDetails} from './store/userSlice.js';
import { useDispatch } from "react-redux";
import SummaryApi from "./common/SummaryApi.js";
import Axios from "./utils/Axios.js";
import {setAllCategory} from './store/productSlice.js'

function App() {

  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: respData } = response;

      if (respData.success) {
        dispatch(setAllCategory(respData.data))
        //setDataCategory(respData.data);
      }
    } catch (error) {
      return error;
    } finally {
      //
    }
  };

  useEffect(() => {
    fetchUser()
    fetchCategory()
  }, [])
  
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
    </>
  );
}

export default App;
