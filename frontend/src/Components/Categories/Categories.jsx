import React from "react";
import { useNavigate } from "react-router-dom";

const Shapes = ({data}) => {

  const navigate = useNavigate();

  const clickHandle = (e, id) => {
    navigate("/products", { state: { shapeId: id } });
  }
  
  function CircularCard(props) {
    return (
      <div className="flex flex-col justify-center items-center" onClick={(e) => clickHandle(e, props.id)}>
        <div className="rounded-full bg-white hover:bg-slate-200 cursor-pointer drop-shadow-lg md:h-28 md:w-28 h-16 w-16 mb-4 flex relative items-center justify-center transition grow">
          <img
            src={props.img}
            alt=""
            className="h-auto p-2 w-auto justify-center items-center relative drop-md"
          />
        </div>
        <div className="font-light md:font-medium text-xs md:text-sm text-slate-500 mb-4 md:mb-8">
          {props.name}
        </div>
      </div>
    );
  }

  return (
    <div id="Categories" className="m-8 md:mt-10 lg:mt-20 md:mx-60 h-auto flex flex-col justify-center items-center mb-12">
      
      <div className="flex justify-center self-center align-middle items-center mb-8 md:mb-16 flex-col">
        <div className="font-medium md:font-bold text-center text-xl md:text-4xl drop-shadow-lg text-slate-500 mb-4 md:mb-8">
          Shop By Shapes
        </div>
        <div className="h-[0.1rem] md:h-1 w-40 self-center bg-gradient-to-r from-white to-white via-slate-500"></div>
      </div>

      <div className="lg:w-4/5 flex items-center justify-center flex-wrap lg:gap-24 gap-10">
        {data.map((shape, index) => (
          <CircularCard key={index} id={shape._id} img={shape.images[0].url} name={shape.name}/>
        ))}
      </div>

    </div>
  );
};

export default Shapes;
