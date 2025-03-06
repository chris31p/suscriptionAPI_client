import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Layout/Loading";
import ProductCardAdmin from "../components/Layout/ProductCardAdmin";
import { GrSearch } from "react-icons/gr";

const ProductAdmin = () => {
  const [productData,setProductData] = useState([])
  const [loading,setLoading] = useState(false)
  const [search,setSearch] = useState("")
  
  const fetchProductData = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
           ...SummaryApi.getProduct,
           data : {
              limit : 12,
              search : search 
           }
        })

        const { data : responseData } = response 

        if(responseData.success){
          setProductData(responseData.data)
        }

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(()=>{
    fetchProductData()
  },[])

  const handleOnChange = (e)=>{
    const { value } = e.target
    setSearch(value)
  }

  useEffect(()=>{
    let flag = true 

    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    }, 300);

    return ()=>{
      clearTimeout(interval)
    }
  },[search]);

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">PRODUCTOS</h2>
        <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded  border focus-within:border-primary-200">
          <GrSearch size={25} />
          <input
            type="text"
            placeholder="Busca productos aquí..."
            className="h-full w-full  outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}

      <div className="p-4">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {productData.map((p, index) => {
              return (
                <ProductCardAdmin
                  data={p}
                  fetchProductData={fetchProductData}
                  key={index}
                />
              );
            })}
          </div>
        </div>        
      </div>
    </section>
  );
};

export default ProductAdmin;
