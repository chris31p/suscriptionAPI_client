import React from "react";
import logo from "../../assets/logo2.png";
import Search from "./Search";
import {Link} from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { LiaShoppingCartSolid } from "react-icons/lia";

const Header = () => {

    
  return (
    <header className="h-28 lg:h-30 lg:shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-white">
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
                <FaCircleUser size={25}/>
            </button>

            {/*desktop*/}
            <div className="hidden lg:flex items-center gap-10">
                <Link to={"/login"} className="text-lg px-2">Login</Link>
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-800 px-3 py-3 rounded text-neutral-50">
                    <div>
                        <LiaShoppingCartSolid size={28}/>
                    </div>
                    <div className="font-semibold">
                        <p>Carrito</p>
                    </div>
                </button>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-2 lg:hidden">
        <Search/>
      </div>
    </header>
  );
};

export default Header;
