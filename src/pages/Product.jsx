import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProductData = async () => {
    try {
      const res = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
        },
      });

      const { data: resData } = res;

      console.log("product page ", resData);
      if (resData.success) {
        setProductData(resData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  console.log("product page");
  useEffect(() => {
    fetchProductData();
  }, []);

  return <div>Product</div>;
};

export default Product;
