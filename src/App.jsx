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
import {setAllCategory, setAllSubCategory, setLoadingCategory} from './store/productSlice.js'
import { GlobalProvider } from "./provider/GlobalProvider.jsx";

function App() {

  const dispatch = useDispatch()

  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const res = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : resData } = res

        if(resData.success){
           dispatch(setAllCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        return error 
    }finally{
      dispatch(setLoadingCategory(false))
    }
  };

  const fetchSubCategory = async()=>{
    try {
        const res = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : resData } = res

        if(resData.success){
           dispatch(setAllSubCategory(resData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
        return error
    }finally{
      //
    }
  }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  }, [])
  
  return (
    <GlobalProvider>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster/>
      </GlobalProvider>   
  );
}

export default App;
