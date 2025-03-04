import React from "react";
import { IoIosSearch } from "react-icons/io";
import { TypeAnimation } from "react-type-animation";

const Search = () => {
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50">
      <button className="flex justify-center items-center h-full p-3">
        <IoIosSearch size={22} />
      </button>
      <div>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Buscar "frutas"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Buscar "verduras"',
            1000,
            'Buscar "carnes"',
            1000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;
