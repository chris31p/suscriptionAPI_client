import React from "react";
import noDataImg from "../../assets/noData.jpg";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2">
      <img src={noDataImg} alt="noData" className="w-72" />
      <p className="text-neutral-500">No hay datos</p>
    </div>
  );
};

export default NoData;
