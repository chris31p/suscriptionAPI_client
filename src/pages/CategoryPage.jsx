import React, { useEffect, useState } from "react";
import UploadCategory from "../components/Category/UploadCategory";
import Loading from "../components/Layout/Loading";
import NoData from "../components/Layout/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiMessageSquareEdit } from "react-icons/bi";
import EditCategory from "../components/Category/EditCategory.jsx";
import ConfirmBox from "../components/Layout/ConfirmBox.jsx";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";
import { useSelector } from "react-redux";


const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: ""
  })
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false)
  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })

  const allCategory = useSelector(state=> state.product.allCategory)
  
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: respData } = response;

      if (respData.success) {
        setDataCategory(respData.data);
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Aquí no invocas la función directamente, solo la referencias
  const handleOpenUploadCategory = () => {
    setOpenUploadCategory(true);
  };

  const handleDeleteCategory = async()=>{
    try {
      const res = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const {data : resData}= res
      if(resData.success){
        toast.success(resData.msg)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Categorías</h2>
        <button
          onClick={handleOpenUploadCategory}
          className="text-sm border bg-orange-300 hover:bg-orange-500 px-3 py-1 rounded font-semibold"
        >
          Añadir categoría
        </button>
      </div>

      {
        !dataCategory[0] && !loading && (
            <NoData />
            )
            }
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {dataCategory.map((category, index) => {
        return (
          <div key={index} className="w-full max-w-[150px] md:max-w-[180px] lg:max-w-[200px] group rounded bg-slate-50 shadow-sm overflow-hidden flex flex-col items-center">
            <img
              alt={category.name}
              src={category.image}
              className="w-full h-32 object-cover"
            />
            <p className="font-semibold text-center my-2">
                {category.name}
            </p>  
            <div className="items-center h-9 hidden group-hover:flex gap-3">
            <button onClick={()=>{
              setOpenEdit(true)
              setEditData(category)
            }} className="flex-1"><BiMessageSquareEdit size={22}/></button>
              <button onClick={()=>{
                setOpenConfirmBoxDelete(true)
                setDeleteCategory(category)
              }} className="flex-1"><AiTwotoneDelete size={24}/></button>
            </div>          
          </div>
          
        );
      })}
      </div>
      {loading && <Loading />}
      {openUploadCategory && (
        <UploadCategory fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
      )}
      {
        openEdit && (
          <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
        )
      }
      {
        openConfirmBoxDelete && (
          <ConfirmBox close={()=> setOpenConfirmBoxDelete(false)} cancel={()=> setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
        )
        
      }
    </section>
  );
};

export default CategoryPage;
