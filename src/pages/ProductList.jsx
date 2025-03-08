import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { Link, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Layout/Loading";
import CardProduct from "../components/Layout/CardProduct";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/validateURL";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [DisplaySubCatory, setDisplaySubCategory] = useState([]);

  console.log("AllSubCategory", AllSubCategory);

  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    ?.join(" ");

    const categoryData = AllSubCategory.find(
      (c) => valideURLConvert(c.name) === params.category
    );
    const categoryId = categoryData ? categoryData._id : null;
    

  
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          limit: 8,
        },
      });
      
      const { data: resData } = res;
      
      if (resData.success && Array.isArray(resData.data)) {
        setData(resData.data);
      } else {
        setData([...data, ...resData.data]);
      }
    } catch (error) {
      AxiosToastError(error);
      setData([]); // Asegúrate de que data no sea indefinido en caso de error
    } finally {
      setLoading(false);
    }
  };

  console.log("Params category:", params.category);
  console.log("Params subCategory:", params.subCategory);
  console.log("Category ID:", categoryId);
  console.log("SubCategory ID:", subCategoryId);

  useEffect(() => {
    if (!categoryId || !subCategoryId) {
      console.error("Faltan parámetros de categoría o subcategoría.");
      return;
  }
    fetchProductdata();
  }, []);

  useEffect(() => {
    const sub = AllSubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });

      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, AllSubCategory, categoryId]);

  return (
    <section className="sticky top-24 lg:top-20">
      <div className="container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
        {/**sub categoria **/}
        <div className=" min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {DisplaySubCatory.map((s) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={link}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className=" w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>

        {/**Producto **/}
        <div className="sticky top-20">
          <div className="bg-white shadow-md p-4 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
                {data.map((p, index) => {
                  return (
                    <CardProduct
                      data={p}
                      key={p._id + "productSubCategory" + index}
                      p={p}
                    />
                  );
                })}
              </div>
            </div>

            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
