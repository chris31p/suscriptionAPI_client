import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../../utils/AxiosToastError";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import CardLoading from "../../components/Layout/CardLoading";
import CardProduct from "../../components/Layout/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../../utils/validateURL";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: resData } = res;

      if (resData.success) {
        setData(resData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListpage();
  return (
    <div>
      {/* Separador entre categorías */}
      <div className="container mx-auto flex items-center gap-2 py-2">
        <div className="flex-1 h-0.5 bg-green-500 opacity-25"></div>
        <span >🌱</span>
        <div className="flex-1 h-0.5 bg-green-500 opacity-25"></div>
      </div>
      {/* Data */}
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link to={redirectURL} className="text-green-600 hover:text-green-400">
          Ver todo
        </Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategorywiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + "CategorywiseProductDisplay" + index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
