import React, { useEffect } from "react";

const Gender = () => {
  return (
    <div className="flex flex-col md:flex-row px-8 md:px-20 py-16 h-auto">
      <div className="flex-col w-full md:w-1/3 p-8 md:p-12 justify-center align-middle self-center items-center text-center bg-gradient-to-r via-slate-500 to-white from-white cursor-pointer mb-4">
        <div className="flex justify-center align-middle self-center items-center mb-4 md:mb-8 transition grow">
          <img
            alt=""
            src={require("../../assets/man.png")}
            className="md:w-40 md:h-40 w-20 h-20 drop-shadow-lg"
          />
        </div>
        <div className="text-white font-medium md:font-bold text-xl md:text-5xl drop-shadow-lg">
          Men
        </div>
      </div>
      <div className="flex-col w-full md:w-1/3 p-8 md:p-12 justify-center align-middle self-center items-center text-center bg-gradient-to-r via-pink-500 to-white from-white cursor-pointer mb-4">
        <div className="flex justify-center align-middle self-center items-center mb-4 md:mb-8 transition grow">
          <img
            alt=""
            src={require("../../assets/woman.png")}
            className="md:w-40 md:h-40 w-20 h-20 drop-shadow-lg"
          />
        </div>
        <div className="text-white font-medium md:font-bold text-xl md:text-5xl drop-shadow-lg">
          Women
        </div>
      </div>
      <div className="flex-col w-full md:w-1/3 p-8 md:p-12 justify-center align-middle self-center items-center text-center bg-gradient-to-r via-green-500 to-white from-white cursor-pointer mb-4">
        <div className="flex justify-center align-middle self-center items-center mb-4 md:mb-8 transition grow">
          <img
            alt=""
            src={require("../../assets/baby.png")}
            className="md:w-40 md:h-40 w-20 h-20 drop-shadow-lg"
          />
        </div>
        <div className="text-white font-medium md:font-bold text-xl md:text-5xl drop-shadow-lg">
          Kids
        </div>
      </div>
    </div>
  );
};

export default Gender;
