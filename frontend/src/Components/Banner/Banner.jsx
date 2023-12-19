import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const handleWindowResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div id="Banner" className="drop-shadow-xl mt-16">
      <Carousel
        autoPlay
        dynamicHeight
        infiniteLoop
        swipeable
        useKeyboardArrows
        showThumbs={false}
      >
        {screenWidth > 768 ? (
          <img src={require("../../assets/luxury.jpg")} alt="banner" />
        ) : (
            <img src={require("../../assets/luxury_mobile.jpg")} alt="banner" />
        )}
        {screenWidth > 768 ? (
          <img src={require("../../assets/Carousel/carou1.png")} alt="banner" />
        ) : (
            <img src={require("../../assets/Carousel/carou1_mobile.png")} alt="banner" />
        )}
        {screenWidth > 768 ? (
          <img src={require("../../assets/Carousel/carou2.png")} alt="banner" />
        ) : (
            <img src={require("../../assets/Carousel/carou2_mobile.png")} alt="banner" />
        )}
        {screenWidth > 768 ? (
          <img src={require("../../assets/Carousel/carou3.png")} alt="banner" />
        ) : (
            <img src={require("../../assets/Carousel/carou3_mobile.jpeg")} alt="banner" />
        )}
      </Carousel>
    </div>
  );
};

export default Banner;
