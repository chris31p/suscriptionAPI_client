import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerificate = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  console.log("location", location);

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);

  const validatedValue = data.every((elem) => elem);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
            otp: data.join(""),
            email: location?.state?.email
        }
      });

      if (response.data.error) {
        toast.error(response.data.msg);
      }

      if (response.data.success) {
        toast.success(response.data.msg);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
          state : {
              data : response.data,
              email : location?.state?.email
          }
      })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg text-center">Código OTP</p>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Ingresa el código: </label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validatedValue}
            className={` ${
              validatedValue ? "bg-green-600 hover:bg-green-500" : "bg-blue-400"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verificar
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

export default OtpVerificate;
