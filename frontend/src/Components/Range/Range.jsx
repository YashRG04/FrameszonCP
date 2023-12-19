import React from "react";

const Range = () => {
  return (
    <div
      id="Range"
      className="pt-12 md:pt-24 px-24 flex flex-col md:flex-row justify-around"
    >
      <div className="flex flex-col p-4 m-8 h-auto justify-center self-center text-center items-center align-middle">
        <div className="transition grow">
          <div className="vert-move h-48 w-48 md:h-72 md:w-72 rounded-full drop-shadow-2xl bg-white justify-center self-center text-center items-center align-middle bg-clip-content overflow-clip cursor-pointer">
            <img className="" src={require("../../assets/lights.png")} alt="" />
            <img
              className="drop-shadow-md absolute top-[30%] z-10 px-4"
              src={require("../assets/pngegg_2.png")}
              alt="spectacles"
            />
          </div>
          <div className="h-4 bg-gray-600 mt-16 rounded-[50%] blur-lg"></div>
        </div>
        <div className="mt-12 text-slate-500 text-lg md:text-2xl font-semibold">
          Low-Range
        </div>
        <div className="mt-2 opacity-70 text-sm font-normal">Rs. 499 - 999</div>
      </div>
      <div className="flex flex-col p-4 m-8 h-auto justify-center self-center text-center items-center align-middle">
        <div className="transition grow">
          <div className="vert-move h-48 w-48 md:h-72 md:w-72 rounded-full drop-shadow-2xl bg-white justify-center self-center text-center items-center align-middle bg-clip-content overflow-clip cursor-pointer">
            <img className="" src={require("../../assets/lights.png")} alt="" />
            <img
              className="drop-shadow-md absolute top-[30%] z-10 px-4"
              src={require("../assets/pngegg_3.png")}
              alt="spectacles"
            />
          </div>
          <div className="h-4 bg-gray-600 mt-16 rounded-[50%] blur-lg"></div>
        </div>
        <div className="mt-12 text-slate-500 text-lg md:text-2xl font-semibold">
          High-Range
        </div>
        <div className="mt-2 opacity-70 text-sm font-normal">
          Rs. 999 - 2999
        </div>
      </div>
      <div className="flex flex-col p-4 m-8 h-auto justify-center self-center text-center items-center align-middle">
        <div className="transition grow">
          <div className="vert-move h-48 w-48 md:h-72 md:w-72 rounded-full drop-shadow-2xl bg-white justify-center self-center text-center items-center align-middle bg-clip-content overflow-clip cursor-pointer">
            <img className="" src={require("../../assets/lights.png")} alt="" />
            <img
              className="drop-shadow-md absolute top-[30%] z-10 px-4"
              src={require("../assets/premium.png")}
              alt="spectacles"
            />
          </div>
          <div className="h-4 bg-gray-600 mt-16 rounded-[50%] blur-lg"></div>
        </div>
        <div className="mt-12 text-slate-500 text-lg md:text-2xl font-semibold flex-nowrap">
          ✨Premium-Range✨
        </div>
        <div className="mt-2 opacity-70 text-sm font-normal">Rs. 2999+</div>
      </div>
    </div>
  );
};

export default Range;
