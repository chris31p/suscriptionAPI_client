import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImUser } from "react-icons/im";
import AxiosToastError from "../utils/AxiosToastError";
import { setUserDetails } from "../store/userSlice";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.msg);
        const userData = await fetchUserDetails();
        console.log("Data", userData)
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="w-20 h-20 flex items-center rounded-full overflow-hidden drop-shadow-md">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full" />
        ) : (
          <ImUser size={38}/>
        )}
      </div>
      <button className="text-sm min-w-16 border border-blue-400 hover:border-secondary-200 px-2 py-1 rounded-full mt-3">
        Editar mi perfil
      </button>

      {/*Editar nombre, telefono, email, cambiar password*/}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Nombre</label>
          <input
            type="name"
            placeholder="Ingresa tu nombre"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
            className="p-2 br-slate-50 outline-none border focus-within:border-cyan-100"
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Ingresa tu email"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
            className="p-2 br-slate-50 outline-none border focus-within:border-cyan-100"
          />
        </div>
        <div className="grid">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="text"
            placeholder="Ingresa tu teléfono"
            value={userData.phone}
            name="phone"
            onChange={handleOnChange}
            required
            className="p-2 br-slate-50 outline-none border focus-within:border-cyan-100"
          />
        </div>
        <button className="border px-4 py-2 font-semibold hover:bg-blue-400 border-sky-600 rounded">
          {
                    loading ? "Loading..." : "Guardar"
                }
        </button>
      </form>
    </div>
  );
};

export default Profile;
