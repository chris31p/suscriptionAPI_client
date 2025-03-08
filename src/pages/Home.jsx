import React from "react";
import banner from "../assets/logo1.png";
import bannerMobile from "../assets/logo5.png";
import { useSelector } from "react-redux";
import { valideURLConvert } from "../utils/validateURL";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/Category/CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const SubCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    if (!id || id.length !== 30) {
      console.error("Error: categoryId no válido", id);
      return;
    }
  
    const subcategory = SubCategoryData.find((sub) => {
      return sub.category.some((c) => c._id === id);
    });
  
    if (!subcategory) {
      console.error("Error: No se encontró la subcategoría");
      return;
    }
  
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    //const url = `${cat}-${id}/${subcategory.name}-${subcategory._id}`
    navigate(url);
  };
  

  return (
    <section className="bg-white p-2 mt-2">
      {/***banner*/}
      <div className="container mx-auto my-4 px-4 bg-green-700 rounded-lg opacity-95">
        <div
          className={`w-96 h-auto min-h-48 place-self-center border border-lime-500 ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      {/*** Sobre Nosotros */}
      <div className="text-center my-6">
        <h2 className="text-3xl font-bold text-gray-800">Sobre nosotros</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mt-2">
          Nuestra aplicación nació con la idea de ofrecer productos frescos y de calidad,
          conectando a productores locales con consumidores conscientes.
        </p>
      </div>


      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {loadingCategory
          ? ( new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              )
            })
          ):( 
             categoryData.map((cat) => {
              return (
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div>
                    <img
                      src={cat.image}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                </div>
              );
            }))}
      </div>

      {/***display category product */}
      {categoryData?.map((c) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
