import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { logout } from "../../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../../utils/AxiosToastError";
import { RxExternalLink } from "react-icons/rx";
import isAdmin from "../../utils/isAdmin";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log("Token antes de logout:", accessToken); // Verifica si hay token
      
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.msg);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">Mi Cuenta</div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user.name || user.phone}{" "}
          <span className="text-medium text-red-600">
            {user.role === "ADMIN" ? "(Admin)" : ""}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={"/dashboard/profile"}
          className="hover:text-primary-200"
        >
          <RxExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="text-sm grid gap-1">
        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/category"}
            className="px-2 hover:bg-green-300 py-1"
          >
            Categorías
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/subcategory"}
            className="px-2 hover:bg-green-200 py-1"
          >
            Sub Categorías
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-green-200 py-1"
          >
            Agregar Producto
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link
            onClick={handleClose}
            to={"/dashboard/product"}
            className="px-2 hover:bg-green-200 py-1"
          >
            Productos
          </Link>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-green-100 py-1"
        >
          Mis pedidos
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="px-2 hover:bg-green-100 py-1"
        >
          Mi dirección
        </Link>

        <button
          onClick={handleLogout}
          className="text-left px-2 hover:bg-green-100 py-1"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
