import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import Card from "../Card/Card.jsx";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, background: "grey", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, background: "grey", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

const BestSellers = ({ gender, data, genId, specId }) => {

    const settings = {
        dots: true,
        infinite: data.length>=4? true:false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: data.length >= 4 ? true : false,
                    dots: true,
                    autoplay: true
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: data.length >= 2 ? true : false,
                    dots: true,
                    autoplay: true
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: data.length >= 1 ? true : false,
                    // centerMode: true,
                    dots: true,
                    autoplay: true
                },
            },
        ],
    };

    const navigate = useNavigate();

    const clickHandle = (e) => {
        navigate("/products", {state:{genderId: genId, specialId: specId}});
    }

    return (
        <div className="-my-28 md:py-20 md:my-0">
            <div id="BestSellers" className="flex flex-col gap-7">
                <div className="flex justify-center self-center align-middle items-center flex-col">
                    <div className="font-medium md:font-semibold text-center text-lg md:text-3xl text-slate-500 mb-4">
                        Bestsellers - {gender}
                    </div>
                    <div className="h-[0.1rem] md:h-1 w-40 self-center bg-gradient-to-r from-white to-white via-slate-500"></div>
                </div>

                <div className="w-full flex flex-col justify-center px-3">
                    <Slider {...settings}>

                        {data.map((product, index) => (
                            <Card key={index} product={product}/>
                        ))}

                    </Slider>
                </div>

                <button className="bg-primary max-w-max self-center py-2 px-4 rounded-lg text-white mt-4" onClick={()=>clickHandle()}>View All</button>
            </div>
        </div>
    );
};

export default BestSellers;
