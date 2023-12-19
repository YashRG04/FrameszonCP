import React from "react";
import { useNavigate } from "react-router-dom";

import CategoriesImages from "./CategoriesImages.js";

const CategoryGrid = ({data}) => {

    const navigate = useNavigate();

    const clickHandle = (e, id) => {
        navigate("/products", {state:{categoryId: id}});
    }

    return (
        <div className="flex justify-center items-center mb-16 h-auto">
            <div className="2xl:mx-auto 2xl:container pt-10 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
                <div className="flex flex-col jusitfy-center items-center space-y-10">
                    <div className="flex flex-col justify-center items-center space-y-2">
                        <h1 className="font-medium md:font-bold text-center text-xl md:text-4xl drop-shadow-lg text-slate-500 mb-4 md:mb-8">
                            Shop By Category
                        </h1>        
                        <div className="h-[0.1rem] md:h-1 w-40 self-center bg-gradient-to-r from-white to-white via-slate-500"></div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center gap-8 px-5 min-h-max md:h-[480px] w-screen md:w-auto">
                        {data.map((category, index) => {
                            return (index < 4 ? <div key={index} className="relative group flex justify-center items-center w-full h-80 md:h-full hover:drop-shadow-xl duration-500">
                                <img className=" object-center object-cover h-full w-full" src={CategoriesImages[index]} alt="Category Preview" />
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-800 py-3 w-36 bg-white" onClick={(e)=>clickHandle(e, category._id)}>{category.name}</button>
                                <div className="absolute opacity-0 group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50" />
                            </div>: <></>)
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryGrid
