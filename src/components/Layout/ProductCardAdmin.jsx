import React, { useState } from "react";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { CgCloseR } from "react-icons/cg";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";
import EditProductAdmin from "../Product/EditProductAdmin";

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });

      const { data: resData } = res;

      if (resData.success) {
        toast.success(resData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <div className="w-48 h-64 p-4 bg-slate-100 rounded-xl group shadow-md flex flex-col justify-between">
        {/* Imagen */}
        <div className="w-full max-w-[150px] md:max-w-[180px] lg:max-w-[200px] group rounded bg-slate-50 shadow-sm overflow-hidden flex flex-col items-center">
          <img
            src={data?.image[0]}
            alt={data?.name}
            className="w-full h-32 object-cover"
          />
        </div>

        {/* Nombre y unidad */}
        <p className="font-semibold text-center my-2">{data?.name}</p>
        <p className="font-thin text-center text-sm">{data?.unit}</p>

        {/* Botones alineados */}
        <div className="items-center hidden group-hover:flex ml-9">
          <button onClick={() => setEditOpen(true)} className="flex-1">
            <BiMessageSquareEdit size={20} />
          </button>
          <button onClick={() => setOpenDelete(true)} className="flex-1">
            <AiTwotoneDelete size={22} />
          </button>
        </div>
      </div>

      {/* Modal de edición */}
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )}

      {/* Modal de eliminación */}
      {openDelete && (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-600 bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-4 w-full max-w-md rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Eliminar permanentemente</h3>
              <button onClick={() => setOpenDelete(false)}>
                <CgCloseR size={25} />
              </button>
            </div>
            <p className="my-2">Está seguro de eliminar?</p>
            <div className="flex justify-end gap-4 py-4">
              <button
                onClick={handleDeleteCancel}
                className="px-3 py-1 border border-red-500 bg-red-100 text-red-500 rounded hover:bg-red-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-3 py-1 border border-green-500 bg-green-100 text-green-500 rounded hover:bg-green-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default ProductCardAdmin;
