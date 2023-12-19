import React from "react";

import Marquee from "react-fast-marquee";

const InternationalBrands = () => {
  const brands = [
    { imgURL: require("../../assets/Disel.png") },
    { imgURL: require("../../assets/burberry.png") },
    { imgURL: require("../../assets/gucci.png") },
    { imgURL: require("../../assets/persol.png") },
    { imgURL: require("../../assets/Prada.png") },
    { imgURL: require("../../assets/Versace.png") },
    { imgURL: require("../../assets/tomford.jpg") },
    { imgURL: require("../../assets/DG.png") },
    { imgURL: require("../../assets/EA.png") },
    { imgURL: require("../../assets/rayban.png") },
    { imgURL: require("../../assets/TH.png") },
  ];

  function Card(props) {
    return (
      <div>
        <img className="md:h-20 h-10 md:mx-6 mx-2 mix-blend-multiply" src={props.img} alt="brand" />
      </div>
    );
  }

  return (
    <div className="md:my-10 my-8 z-10">
      <div id="InternationalBrands">
        <Marquee speed={50} gradient={false}>
          <div className="flex">
            {brands.map((brand, index) => (
              <Card img={brand.imgURL} key={index}/>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default InternationalBrands;
