import React, {useEffect} from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getProductDetails, clearErrors } from '../../Actions/productActions';
import { getCategories } from "../../Actions/categoryActions.js";

import Loader from "../../Components/Loader.jsx";

const Product = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, error, loading } = useSelector((state) => state.productDetails);
  const { categories } = useSelector((state) => state.categories);

  const [category, setCategory] = useState("");
  const [special, setSpecial] = useState("");
  const [brand, setBrand] = useState("");
  const [shape, setShape] = useState("");
  const [gender, setGender] = useState("");


  var whatsappLink = `https://api.whatsapp.com/send/?phone=%2B917982610896&text=Hello%2C+I+am+interested+in+purchasing+the+product+with+the+following+details%3A%0AProduct+Name%3A+${product.name}%0AProduct+Code%3A+${product.productCode}%0AProduct+Link%3A+${window.location.href}%0A%0ACould+you+please+provide+me+with+more+information+about+this+product%2C+including+pricing+and+availability%3F%0A%0AThank+you+in+advance+for+your+assistance.`;

  const assignTags = () => {
    if(categories)
    {
      if(categories.categories)
      {
        categories.categories.forEach((category) => {
          if(category._id === product.category) setCategory(category.name);
        })
      }
      if (categories.genders) {
        categories.genders.map((gender) => {
          return gender._id === product.gender ? setGender(gender.name) : "";
        })
      }
      if (categories.brands) {
        categories.brands.map((brand) => {
          return brand._id === product.brand ? setBrand(brand.name) : "";
        })
      }
      if (categories.shapes) {
        categories.shapes.map((shape) => {
          return shape._id === product.shape ? setShape(shape.name) : "";
        })
      }
      if (categories.specials) {
        categories.specials.map((special) => {
          return special._id === product.special ? setSpecial(special.name) : "";
        })
      }
    }
  }

  const [mainImage, setMainImage] = useState();

  // Getting product details
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
    dispatch(getCategories());
  }, [dispatch, id, error]);

  // Set main image and tags
  useEffect(() => {
    setMainImage(product.images ? product.images[0].url : undefined);
    // whatsappLink = whatsappLink + product.productCode + "+" + product.name;
    assignTags();
  }, [dispatch, product, categories, id, category ])
  

  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      {
        loading ? <Loader /> : (
          product && 
          <div className="flex justify-center lg:flex-row flex-col gap-10 min-h-full pt-20 sm:items-center">

            {/* <!-- Preview Images Div For larger Screen--> */}
            <div className="w-full self-center sm:w-96 md:w-8/12 lg:w-6/12 flex flex-col gap-4">
              <div className="w-full bg-white flex justify-center items-center rounded-xl shadow-md h-96">
                <img src={mainImage} alt="Product Preview" className="w-full h-full object-contain md:object-fill rounded-lg" />
              </div>
              <div className="w-full grid lg:grid-row-1 sm:grid-cols-4 grid-cols-2 gap-6">
                {product.images && product.images.map((image, index) => {
                  return (
                    <div className="bg-white flex justify-center items-center rounded-lg shadow h-24 hover:shadow-lg duration-500" key={index} onClick={() => setMainImage(image.url)}>
                      <img src={image.url} alt="Product - preview" className="h-full object-fill rounded-lg" />
                    </div>
                  )
                }
                )}
              </div>
            </div>

            {/* <!-- Description Div --> */}
            <div className="w-full h-full mt-8 sm:w-96 md:w-8/12 lg:w-6/12 flex flex-col gap-3 self-start items-start justify-center">
              <h2 className="font-semibold lg:text-4xl text-3xl text-gray-800 capitalize">{product.name}</h2>
              <p className="font-normal text-base text-gray-600">Product Code : {product.productCode}</p>
              <p className="font-normal text-base text-gray-600">{product.description}</p>
              <p className="font-semibold lg:text-2xl text-xl">₹ {product.price}</p>

              <div className="flex flex-col gap-3">
                <h4>Tags: </h4>
                <div className="tags flex flex-wrap gap-4">
                  {category && <span className="min-w-max bg-slate-400 px-3 py-2 rounded-full">{category}</span>}
                  {gender && <span className="min-w-max bg-slate-400 px-3 py-2 rounded-full">{gender}</span>}
                  {brand && <span className="min-w-max bg-slate-400 px-3 py-2 rounded-full">{brand}</span>}
                  {shape && <span className="min-w-max bg-slate-400 px-3 py-2 rounded-full">{shape}</span>}
                  {special && <span className="min-w-max bg-slate-400 px-3 py-2 rounded-full">{special}</span>}
                </div>
              </div>

              <a
                href={whatsappLink} target="_blank"
                className="mt-6 text-center focus:outline-none focus:ring-2 hover:bg-black focus:ring-offset-2 focus:ring-gray-800 font-medium text-base leading-4 text-white bg-gray-800 w-full py-4">
                Buy Now
              </a>
            </div>

          </div>
      )}
    </div>
  )
}

export default Product;