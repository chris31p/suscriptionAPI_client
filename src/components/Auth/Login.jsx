import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import fetchUserDetails from "../../utils/fetchUserDetails";
import { setUserDetails } from "../../store/userSlice";


const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const validatedValue = Object.values(data).every((elem) => elem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.msg);
      }

      if (response.data.success) {
        toast.success(response.data.msg);
        localStorage.setItem('accessToken', response.data.data.accessToken)
        localStorage.setItem('refreshToken', response.data.data.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))
        
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Ingrese su email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Contraseña :</label>
            <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            disabled={!validatedValue}
            className={` ${
              validatedValue ? "bg-green-600 hover:bg-green-500" : "bg-blue-400"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Iniciar sesión
          </button>
        </form>

        <p>
          ¿No tienes una cuenta?{" "}
          <Link to={"/register"} className="font-semibold italic text-sky-600">
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
