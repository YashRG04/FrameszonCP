import React from "react";

const About = () => {
  return (
    <div
      id="AboutUs"
      className="px-16 pb-10 mb-10 md:pb-0 flex flex-col md:flex-row justify-center self-center text-center items-center align-middle"
    >
      <div className="w-5/6 md:w-1/3">
        <img
          alt="about us"
          src={require("../../assets/aboutus.png")}
          className="w-auto drop-shadow-lg"
        />
      </div>
      <div className="Flex flex-col md:w-1/2 justify-center self-center text-center items-center align-middle ">
        <div className="text-2xl md:text-4xl font-semibold md:font-extrabold text-slate-500 m-4 md:m-8 drop-shadow-lg">
          About Us
        </div>
        <div className="text-justify text-xs tracking-wide md:text-base font-light md:font-normal text-slate-900 md:px-20 opacity-70">
          At Frameszon, we pride ourselves on being a one-stop-shop for all your
          eyewear needs. As a trusted and established eyewear store in Delhi, we
          are committed to offering our customers the highest quality optical
          products at prices that won't break the bank. As an authorized dealer
          of top luxury brands like Ray Ban, Armani, and Prada, we have a wide
          selection of stylish and fashionable eyewear options to choose from.
          But we don't just stop at eyewear - we also offer free eye checkups
          for new customers and carry a variety of contact lenses. When you shop
          with us, you can trust that you're getting the best products and
          services in the industry. Experience crystal-clear vision and
          exceptional customer service - visit Frameszon today!
        </div>
      </div>
    </div>
  );
};

export default About;
