import React, { useState } from "react";
import logo from "../../assets/logo2.png";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import UserMenu from "./UserMenu";
import DisplayPriceInCLP from "../../utils/displayPrice";
import { useGlobalContext } from "../../provider/GlobalProvider";
import DisplayCartItem from "../../pages/DisplayCartItem";

const Header = () => {
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);

  /* const redirectToLoginPage = () => {
    navigate("/login");
  }; */

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false);
  };

  return (
    <header className="h-28 lg:h-30 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
      {!isSearchPage && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/*logo*/}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={120}
                height={80}
                alt="logo"
                className="hidden lg:block"
              />
              <img
                src={logo}
                width={100}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
          </div>

          {/*search*/}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/*login and cart*/}
          <div className="">
            <button className="text-neutral-700 lg:hidden">
              <FaCircleUser size={25} />
            </button>

            {/*desktop*/}
            <div className="hidden lg:flex items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((preve) => !preve)}
                    className="flex select-none items-center gap-1 cursor-pointer"
                  >
                    <p>Cuenta</p>
                    {openUserMenu ? (
                      <FaAngleUp size={25} />
                    ) : (
                      <FaAngleDown size={25} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"} className="text-lg px-2">
                  Iniciar sesión
                </Link>
              )}
              <button
                onClick={() => setOpenCartSection(true)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-800 px-3 py-3 rounded text-neutral-50"
              >
                <div>
                  <LiaShoppingCartSolid size={28} />
                </div>
                <div className="font-semibold">
                  {cartItem[0] ? (
                    <div>
                      <p>{totalQty} Items</p>
                      <p>{DisplayPriceInCLP(totalPrice)}</p>
                    </div>
                  ) : (
                    <p>Carrito</p>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
      {openCartSection && (
        <DisplayCartItem close={() => setOpenCartSection(false)} />
      )}
    </header>
  );
};

export default Header;
