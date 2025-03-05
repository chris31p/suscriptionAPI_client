import React, { useState } from "react";
import { CgCloseR } from "react-icons/cg";
import uploadImage from "../../utils/uploadImage.js";
import Axios from "../../utils/Axios.js";
import SummaryApi from "../../common/SummaryApi.js";
import toast from 'react-hot-toast';
import AxiosToastError from '../../utils/AxiosToastError.js'


const UploadCategory = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {

        setLoading(true)
        const resp = await Axios({
            ...SummaryApi.addCategory,
            data: data 
        })
        const {data : resData} = resp 

        if(resData.success){
            toast.success(resData.msg)
            close()
            fetchData()
        }
    } catch (error) {
        AxiosToastError(error)
    } finally{
        setLoading(false)
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const UploadImage = await uploadImage(file);
    const { data: ImageResponse } = UploadImage;

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center">
      <div className="bg-white max-w-4xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Categoría</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <CgCloseR size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grip gap-1">
            <label htmlFor="">Nombre: </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Ingrese la categoría"
              value={data.name}
              name="name"
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Imagen</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No hay imagen</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`
                ${
                  !data.name
                    ? "bg-gray-300"
                    : "hover:bg-yellow-300 border-primary-100"
                }
                px-4 py-2 rounded cursor-pointer border font-medium             
                `}
                >
                  Subir imagen
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            className={`
            ${data.name && data.image ? "bg-green-600" : "bg-gray-400"}
            py-2 font-semibold 
            `}
          >
            Agregar
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategory;
