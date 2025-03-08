import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPsw = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.msg);
      }

      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/verification-otp",{
            state : data
        })
        setData({
          email: "",
        });
        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Recuperar contraseña </p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded outline-none focus:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
            />
          </div>

          <button
            disabled={!validatedValue}
            className={` ${
              validatedValue ? "bg-green-600 hover:bg-green-500" : "bg-blue-400"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Resetear contraseña
          </button>
        </form>

        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/login"} className="font-semibold italic text-sky-600">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPsw;
