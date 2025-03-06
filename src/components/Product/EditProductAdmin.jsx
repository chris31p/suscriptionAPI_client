import React, { useState } from "react";
import { useSelector } from 'react-redux';
import uploadImage from '../../utils/uploadImage';
import { CgCloseR } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { MdDelete } from "react-icons/md";
import successAlert from '../../utils/successAlert';
import AxiosToastError from "../../utils/AxiosToastError";
import ViewImage from '../../components/Layout/ViewImage';
import Loading from "../Layout/Loading";
import AddField from '../../components/Layout/AddField';


const EditProductAdmin = ({ close, data: propsData, fetchProductData }) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const res = await uploadImage(file);
    const { data: ImageResponse } = res;
    const imageUrl = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const res = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });
      const { data: resData } = res;

      if (resData.success) {
        successAlert(resData.msg);
        if (close) {
          close();
        }
        fetchProductData();
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]">
        <section className="">
          <div className="p-2   bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Editar producto</h2>
            <button onClick={close}>
              <CgCloseR size={20} />
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ingrese el nombre"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Descripción
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Ingrese la descripción"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none"
                />
              </div>
              <div>
                <p className="font-medium">Imagen</p>
                <div>
                  <label
                    htmlFor="productImage"
                    className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
                  >
                    <div className="text-center flex justify-center items-center flex-col">
                      {imageLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} />
                          <p>Subir imagen</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/**display uploded image*/}
                  <div className="flex flex-wrap gap-4">
                    {data.image.map((img, index) => {
                      return (
                        <div
                          key={img + index}
                          className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                        >
                          <img
                            src={img}
                            alt={img}
                            className="w-full h-full object-scale-down cursor-pointer"
                            onClick={() => setViewImageURL(img)}
                          />
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer"
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <label className="font-medium">Categoría</label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find(
                        (el) => el._id === value
                      );

                      setData((preve) => {
                        return {
                          ...preve,
                          category: [...preve.category, category],
                        };
                      });
                      setSelectCategory("");
                    }}
                  >
                    <option value={""}>Seleccionar categoría</option>
                    {allCategory.map((c, index) => {
                      return <option value={c?._id}>{c.name}</option>;
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveCategory(index)}
                          >
                            <CgCloseR size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="grid gap-1">
                <label className="font-medium">Sub categoría</label>
                <div>
                  <select
                    className="bg-blue-50 border w-full p-2 rounded"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find(
                        (el) => el._id === value
                      );

                      setData((preve) => {
                        return {
                          ...preve,
                          subCategory: [...preve.subCategory, subCategory],
                        };
                      });
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""} className="text-neutral-600">
                      Seleccionar sub categoría
                    </option>
                    {allSubCategory.map((c, index) => {
                      return <option value={c?._id}>{c.name}</option>;
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.subCategory.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                        >
                          <p>{c.name}</p>
                          <div
                            className="hover:text-red-500 cursor-pointer"
                            onClick={() => handleRemoveSubCategory(index)}
                          >
                            <CgCloseR size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <label htmlFor="unit" className="font-medium">
                  Unidad
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="Ingrese la unidad de medida (unidad, gr, kg, pcs)"
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="stock" className="font-medium">
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Ingrese la cantidad de stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Precio
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Ingrese el precio"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Descuento
                </label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Ingrese el descuento"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                />
              </div>

              {/**add more field**/}
              {Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div className="grid gap-1">
                    <label htmlFor={k} className="font-medium">
                      {k}
                    </label>
                    <input
                      id={k}
                      type="text"
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
                    />
                  </div>
                );
              })}

              <div
                onClick={() => setOpenAddField(true)}
                className=" hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded"
              >
                Agregar campos
              </div>

              <button className="bg-green-600 hover:bg-primary-200 py-2 rounded font-semibold">
                Actualizar
              </button>
            </form>
          </div>

          {ViewImageURL && (
            <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
          )}

          {openAddField && (
            <AddField
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              submit={handleAddField}
              close={() => setOpenAddField(false)}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;
