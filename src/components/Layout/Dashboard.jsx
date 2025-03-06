import React from "react";
import UserMenu from "./UserMenu";
import { Outlet } from "react-router-dom";
//import { useSelector } from "react-redux";

const Dashboard = () => {

  //const user = useSelector(state => state.user)
  
  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
        {/* Menú Izquierdo */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-y-auto hidden lg:block border-r">
          <UserMenu />
        </div>

        {/* Contenido Derecho */}
        <div className="bg-white min-h-[80vh] p-4">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
