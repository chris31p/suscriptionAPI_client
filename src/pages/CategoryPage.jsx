import React, { useEffect, useState } from "react";
import UploadCategory from "../components/Category/UploadCategory";
import Loading from "../components/Layout/Loading";
import NoData from "../components/Layout/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);

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

  return (
    <section>
      <div className="p-2 bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Categorías</h2>
        <button
          onClick={handleOpenUploadCategory}
          className="text-sm border bg-green-400 px-3 py-1 rounded"
        >
          Añadir categoría
        </button>
      </div>

      {
        !dataCategory[0] && !loading && (
            <NoData />
            )
            }
      <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {dataCategory.map((category, index) => {
        return (
          <div className="w-36 h-48 rounded shadow-md ">
            <img
              alt={category.name}
              src={category.image}
              className="w-full object-scale-down"
            />
            <p className="font-semibold text-center my-2">
                {category.name}
            </p>
          </div>
        );
      })}
      </div>
      {loading && <Loading />}
      {openUploadCategory && (
        <UploadCategory fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
      )}
    </section>
  );
};

export default CategoryPage;
