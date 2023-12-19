import React from 'react';
import { useNavigate } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const ShopNow = ({img1, img2}) => {

    const navigate = useNavigate();
    
    // grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-24 md:gap-10 gap-12 lg:px-20 md:py-12 md:px-6 py-9 px-4
  return (
    <div>
        <div className="2xl:container 2xl:mx-auto px-5">
            <div className="hidden md:grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-10 gap-5 lg:px-10 md:py-12 md:px-6 py-7 px-4">

                {/* Fast Shipping Grid Card */}
                <div className="flex space-x-4 bg-[#2a73b7] hover:bg-[#21598e] duration-500 text-white rounded-box justify-center items-center p-2 md:p-4">
                    <RocketLaunchIcon style={{"fontSize": "2.5rem"}}/>
                    <div className="text-base md:text-xl font-semibold text-white">Fast Shipping</div>
                </div>

                {/* Easy Return Card */}
                <div className="flex space-x-4 bg-[#2a73b7] hover:bg-[#21598e] duration-500 text-white rounded-box justify-center items-center p-2 md:p-4">
                    <AutorenewIcon style={{ "fontSize": "2.5rem" }} />
                    <div className="text-base md:text-xl font-semibold text-white">14 Day Easy Return And Refund</div>
                </div>

                {/* Safe Payment card */}

                <div className="flex space-x-4 bg-[#2a73b7] hover:bg-[#21598e] duration-500 text-white rounded-box justify-center items-center p-2 md:p-4">
                    <CategoryIcon style={{ "fontSize": "2.5rem" }} />
                    <div className="text-base md:text-xl font-semibold text-white">Extensive Range of Products</div>
                </div>
            </div>
        </div>

        <div className="md:mb-20 -mb-40 sm:-mb-20 pt-10">
            
            <div className="flex justify-center self-center align-middle items-center mb-4 md:mb-10 flex-col">
                <div className="font-medium md:font-semibold text-center text-lg md:text-3xl text-slate-500 mb-4">
                    ACCESSORIZE WITH OUR FEATURED COLLECTION!
                </div>
                <div className="h-[0.1rem] md:h-1 w-40 self-center bg-gradient-to-r from-white to-white via-slate-500"></div>
            </div>

            {/* Medium Screen Width */}
            <div className="hidden md:grid grid-cols-5 px-10">

                <div className="col-span-2 grid-rows-6 flex flex-col items-start align-middle mr-3">
                    <h3 className="row-span-1 text-xl mb-3 text-slate-800 tracking-widest" style={{ "fontFamily": "Source" }}>More is always More and extra is everything</h3>
                    <div className="row-span-5 shadow-lg hover:shadow-none duration-300 w-full h-full">
                        <img src={img1} alt="An poster is here" className="object-cover w-full h-full" />
                        <button className="p-2 text-sm text-slate-900 font-bold duration-300 rounded-lg -translate-y-16 translate-x-[calc(100%-4rem)] hover:drop-shadow-sm" style={{"backgroundColor": "#E5E7E9"}} onClick={() => navigate("/products")}>SHOP NOW</button>
                    </div>
                </div>
                <div className="col-span-3 grid-rows-6 flex flex-col items-start align-middle">
                    <h3 className="row-span-1 text-xl mb-3 text-slate-800 tracking-widest" style={{"fontFamily":"Source"}}>The future of eyewear has arrived. Are you ready to take a look?</h3>
                    <div className="row-span-5 shadow-lg hover:shadow-none duration-300 w-full h-full">
                        <img src={img2} alt="An poster is here" className="object-cover w-full h-full"/>
                        <button className="p-2 text-sm text-slate-900 font-bold duration-300 rounded-lg -translate-y-16 translate-x-[calc(100%-4rem)] hover:drop-shadow-sm" style={{"backgroundColor": "#E5E7E9"}} onClick={() => navigate("/products")}>SHOP NOW</button>                    </div>
                </div>
            </div>

            {/* Small Screen Width */}
            <div className="flex flex-col justify-center items-center w-full md:hidden h-full">
                <div className="flex flex-col px-8 justify-center gap-1 w-full">
                    <h3 className="text-md text-slate-800 tracking-widest" style={{ "fontFamily": "Source" }}>More is always More and extra is everything</h3>
                    <img src={img1} alt="An poster is here" className="object-cover w-full h-80 object-top" />
                    <button className="p-2 text-xs text-slate-900 font-bold duration-300 rounded-md -translate-y-16 translate-x-[calc(100%-3rem)] hover:drop-shadow-sm max-w-max" style={{"backgroundColor": "#E5E7E9"}} onClick={() => navigate("/products")}>SHOP NOW</button>
                </div>
                <div className="flex flex-col px-8 justify-center gap-2 w-full">
                    <h3 className="text-md text-slate-800 tracking-widest" style={{ "fontFamily": "Source" }}>The future of eyewear has arrived. Are you ready to take a look?</h3>
                    <img src={img2} alt="An poster is here" className="object-cover w-full h-80 object-top" />
                    <button className="p-2 text-xs text-slate-900 font-bold duration-300 rounded-md -translate-y-16 translate-x-[calc(100%-3rem)] hover:drop-shadow-sm max-w-max" style={{"backgroundColor": "#E5E7E9"}} onClick={() => navigate("/products")}>SHOP NOW</button> 
                </div>
            </div>

        </div>
    </div>
  )
}

export default ShopNow
