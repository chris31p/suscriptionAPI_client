import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import AxiosToastError from "../../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (data.password !== data.confirmPassword) {
      toast.error("No coinciden las contraseñas");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.msg);
      }

      if (response.data.success) {
        toast.success(response.data.msg);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-8">
        <p className="text-center">Bienvenido a GreenMarket</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Nombre: </label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-green-50 p-2 border rounded outline-none"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              autoFocus
              className="bg-green-50 p-2 border rounded outline-none"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Contraseña: </label>
            <div className="bg-green-50 p-2 border rounded flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
              <div
                onClick={() => setShowPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showPassword ? <FaEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirma tu contraseña: </label>
            <div className="bg-green-50 p-2 border rounded flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoFocus
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Ingresa nuevamente tu contraseña"
              />
              <div
                onClick={() => setShowConfirmPassword((preve) => !preve)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <button
            disabled={!validatedValue}
            className={`${
              validatedValue ? "bg-green-600 hover:bg-green-500" : "bg-teal-800"
            } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Registrarse
          </button>
        </form>

        <p className="text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to={"/login"} className="font-semibold italic text-blue-400">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
