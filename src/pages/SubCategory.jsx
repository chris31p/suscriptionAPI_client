import React, { useEffect, useState } from "react";
import UploadSubCategory from "../components/SubCategory/UploadSubCategory.jsx";
import Axios from "../utils/Axios.js";
import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import ViewImage from "../components/Layout/ViewImage.jsx";
import { createColumnHelper } from '@tanstack/react-table'
import DisplayTable from "../components/Layout/DisplayTable.jsx";
import { HiPencil } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import EditSubCategory from "../components/SubCategory/EditSubCategory.jsx";
import ConfirmBox from "../components/Layout/ConfirmBox.jsx";
import toast from "react-hot-toast";

const SubCategory = () => {
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [ImageURL,setImageURL] = useState("")
  const [openEdit,setOpenEdit] = useState(false)
  const [editData,setEditData] = useState({
    _id : ""
  })
  const [deleteSubCategory,setDeleteSubCategory] = useState({
      _id : ""
  })
  const [openDeleteConfirmBox,setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async()=>{
    try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
          setData(responseData.data)
        }
    } catch (error) {
       AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchSubCategory()
  },[])

  const column = [
    columnHelper.accessor('name',{
      header : "Nombre"
    }),
    columnHelper.accessor('image',{
      header : "Imagen",
      cell : ({row})=>{
        console.log("row",)
        return <div className='flex justify-center items-center'>
        <img 
            src={row.original.image}
            alt={row.original.name}
            className='w-20 h-14 cursor-pointer'
            onClick={()=>{
              setImageURL(row.original.image)
            }}      
        />
    </div>
  }
}),
columnHelper.accessor("category",{
   header : "Categoría",
   cell : ({row})=>{
    return(
      <>
        {
          row.original.category.map((c,index)=>{
            return(
              <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
            )
          })
        }
      </>
    )
   }
}),
columnHelper.accessor("_id",{
  header : "Opciones",
  cell : ({row})=>{
    return(
      <div className='flex items-center justify-center gap-3'>
          <button onClick={()=>{
              setOpenEdit(true)
              setEditData(row.original)
          }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
              <HiPencil size={20}/>
          </button>
          <button onClick={()=>{
            setOpenDeleteConfirmBox(true)
            setDeleteSubCategory(row.original)
          }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
              <MdDelete  size={20}/>
          </button>
      </div>
    )
  }
})
]

const handleDeleteSubCategory = async()=>{
  try {
      const response = await Axios({
          ...SummaryApi.deleteSubCategory,
          data : deleteSubCategory
      })

      const { data : responseData } = response

      if(responseData.success){
         toast.success(responseData.msg)
         fetchSubCategory()
         setOpenDeleteConfirmBox(false)
         setDeleteSubCategory({_id : ""})
      }
  } catch (error) {
    AxiosToastError(error)
  }
}

  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>SUB CATEGORIAS</h2>
            <button onClick={()=>setOpenSubCategory(true)} className='text-sm border bg-orange-300 hover:bg-orange-500 px-3 py-1 rounded font-semibold'>Agregar Subcategoría</button>
        </div>

        <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
                data={data}
                column={column}
            />
        </div>


        {
          openSubCategory && (
            <UploadSubCategory 
              close={()=>setOpenSubCategory(false)}
              fetchData={fetchSubCategory}
            />
          )
        }

        {
          ImageURL &&
          <ViewImage url={ImageURL} close={()=>setImageURL("")}/>
        }

        {
          openEdit && 
          <EditSubCategory 
            data={editData} 
            close={()=>setOpenEdit(false)}
            fetchData={fetchSubCategory}
          />
        }

        {
          openDeleteConfirmBox && (
            <ConfirmBox 
              cancel={()=>setOpenDeleteConfirmBox(false)}
              close={()=>setOpenDeleteConfirmBox(false)}
              confirm={handleDeleteSubCategory}
            />
          )
        }
    </section>
  );
};

export default SubCategory;
