import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

import { clearErrors, getProducts } from '../../Actions/productActions.js';
import { getCategories } from "../../Actions/categoryActions.js";

import Banner from '../../Components/Banner/Banner.jsx';
import Card from '../../Components/Card/Card.jsx';
import Loader from "../../Components/Loader.jsx";

import SearchIcon from '@mui/icons-material/Search';

const Products = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  // For filters
  const [category, setCategory] = useState((location.state && location.state.categoryId)?[location.state.categoryId]:[]);
  const [special, setSpecial] = useState((location.state && location.state.specialId)?[location.state.specialId]:[]);
  const [brand, setBrand] = useState([]);
  const [shape, setShape] = useState((location.state && location.state.shapeId)?[location.state.shapeId]:[]);
  const [gender, setGender] = useState((location.state && location.state.genderId)?[location.state.genderId]:[]);

  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);

  const [keyword, setKeyword] = useState("");

  // redux states
  const { products, resultPerPage, filteredProductsCount, loading, error } = useSelector((state) => state.products);
  const { categories, isChanged } = useSelector((state) => state.categories);

  const priceHandler = (event) => {
    setPrice([event.target.min, event.target.value]);
  };

  const handlechecks = (e, id, check) => {

    if(check === "category") {
      if (e.target.checked)
        setCategory([...category, id]);
      else {
        let curr = category.filter((cat) => cat!==id);
        setCategory(curr);
      }
    }
    else if (check === "gender") {
      if (e.target.checked)
        setGender([...gender, id]);
      else {
        let curr = gender.filter((cat) => cat !== id);
        setGender(curr);
      }
    }
    else if (check === "brand") {
      if (e.target.checked)
        setBrand([...brand, id]);
      else {
        let curr = brand.filter((cat) => cat !== id);
        setBrand(curr);
      }
      console.log(brand);
    }
    else if (check === "shape") {
      if (e.target.checked)
        setShape([...shape, id]);
      else {
        let curr = shape.filter((cat) => cat !== id);
        setShape(curr);
      }
    }
    else if (check === "special") {
      if (e.target.checked)
        setSpecial([...special, id]);
      else {
        let curr = special.filter((cat) => cat !== id);
        setSpecial(curr);
      }
    }
  }

  console.log(gender);
  // Checking the options for which it is redirected
  const isPresent = (id) => {
    if(gender)
      console.log(gender.includes(id));

    // console.log(gender, id);
    const arraysToCheck = [category, shape, gender, special];
  
    // Use Array.prototype.some() to check if id is present in any of the arrays
    return arraysToCheck.some((arr) => arr && arr.includes(id));
  }

  // Getting all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, isChanged]);

  // Getting all products
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword , currentPage, price , category, gender, brand, shape, special));

  }, [dispatch, keyword, currentPage, price, error, category, gender, brand, shape, special]);

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, price, category, gender, brand, shape, special])
  
  return (
    <div className="products flex-row">

      <div className="top">
        <Banner />
      </div>

      <div className="bottom flex flex-col md:flex-row">

        {/* For Large screen interfaces */}
        <div className="left bg-slate-50 items-center pt-6 min-w-max hidden md:block">
          
          <div className="flex m-4 pr-2 justify-center items-center rounded border border-black">
            <input placeholder="Search" className="py-2 pl-4 pr-2 bg-gray-100 outline-none rounded text-slate-600 w-full" onChange={(e)=>setKeyword(e.target.value)}/>
            <SearchIcon/>
          </div>

          <ul className="menu rounded-box p-4 h-full w-full flex gap-4">
            <li className="bg-slate-900 text-white flex items-center p-1 rounded-md "><h1 className="text-lg hover:text-white">FILTERS</h1></li>
            
            {/* Category */}
            <li>
              <details>
                <summary>Category</summary>
                <ul className="flex-row gap-4">
                  {categories.categories && categories.categories.map((category, index) => {
                    return (<li key={index}>
                      <label>
                        <input type="checkbox" checked={isPresent(category._id)} onChange={(e) => handlechecks(e, category._id, "category")}/> 
                        {category.name}
                      </label>
                    </li>)
                  })}
                </ul>
              </details>
            </li>

            {/* Gender */}
            <li>
              <details>
                <summary>Gender</summary>
                <ul className="flex-row gap-4">
                  {categories.genders && categories.genders.map((gender, index) => {
                    return (<li key={index}>
                      <label>
                        <input type="checkbox" checked={isPresent(gender._id)} onChange={(e) => handlechecks(e, gender._id, "gender")} /> 
                        {gender.name}
                      </label>
                    </li>)
                  })}
                </ul>
              </details>
            </li>

            {/* Brand */}
            <li>
              <details>
                <summary>Brands</summary>
                <ul className="flex-row gap-4">
                  {categories.brands && categories.brands.map((brand, index) => {
                    return (<li key={index}><label><input type="checkbox" onChange={(e) => handlechecks(e, brand._id, "brand")} /> {brand.name}</label></li>)
                  })}
                </ul>
              </details>
            </li>

            {/* Shape */}
            <li>
              <details>
                <summary>Shapes</summary>
                <ul className="flex-row gap-4">
                  {categories.shapes && categories.shapes.map((shape, index) => {
                    return (<li key={index}><label><input type="checkbox" checked={isPresent(shape._id)} onChange={(e) => handlechecks(e, shape._id, "shape")} /> {shape.name}</label></li>)
                  })}
                </ul>
              </details>
            </li>

            {/* Special */}
            <li>
              <details>
                <summary>Special</summary>
                <ul className="flex-row gap-4">
                  {categories.specials && categories.specials.map((special, index) => {
                    return (<li key={index}><label><input type="checkbox" checked={isPresent(special._id)} onChange={(e) => handlechecks(e, special._id, "special")} /> {special.name}</label></li>)
                  })}
                </ul>
              </details>
            </li>

            {/* Price */}
            <li>
              <details>
                <summary>Price</summary>
                <ul className="flex-row justify-center items-center outline-none">
                  <li>
                    <input type="range" name="price" min={0} max={26000} value={price[1]} className="py-2 px-0" onChange={priceHandler} />
                    <label>Max Range: ₹ {price[1]}</label>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        
        </div>

        {/* For small and medium screen interfaces */}
        <div className="left bg-slate-50 items-center pt-2 min-w-max z-10 group md:hidden">

          <div className="flex m-4 pr-2 justify-center items-center rounded border border-black bg-slate-400 ">
            <input placeholder="Search" className="py-2 pl-4 mr-2 bg-gray-100 outline-none rounded-l text-slate-600 w-full" onChange={(e) => setKeyword(e.target.value)} />
            <SearchIcon />
          </div>

          <details className="flex justify-center m-4">
            <summary className="text-lg bg-slate-600 text-white rounded-md p-2 text-center list-none">FILTERS</summary>
            <ul className="menu rounded-box p-2 max-w-full flex gap-2 text-black">
              {/* Category */}
              <li>
                <details>
                  <summary>Category</summary>
                  <ul className="flex-row gap-4">
                    {categories.categories && categories.categories.map((category, index) => {
                      return (<li key={index}>
                        <label>
                          <input type="checkbox" checked={isPresent(category._id)} onChange={(e) => handlechecks(e, category._id, "category")} />
                          {category.name}
                        </label>
                      </li>)
                    })}
                  </ul>
                </details>
              </li>

              {/* Gender */}
              <li>
                <details>
                  <summary>Gender</summary>
                  <ul className="flex-row gap-4">
                    {categories.genders && categories.genders.map((gender, index) => {
                      return (<li key={index}>
                        <label>
                          <input type="checkbox" checked={isPresent(gender._id)} onChange={(e) => handlechecks(e, gender._id, "gender")} /> 
                          {gender.name}
                        </label>
                        </li>)
                    })}
                  </ul>
                </details>
              </li>

              {/* Brand */}
              <li>
                <details>
                  <summary>Brands</summary>
                  <ul className="flex-row gap-4">
                    {categories.brands && categories.brands.map((brand, index) => {
                      return (<li key={index}><label><input type="checkbox" onChange={(e) => handlechecks(e, brand._id, "brand")} /> {brand.name}</label></li>)
                    })}
                  </ul>
                </details>
              </li>

              {/* Shape */}
              <li>
                <details>
                  <summary>Shapes</summary>
                  <ul className="flex-row gap-4">
                    {categories.shapes && categories.shapes.map((shape, index) => {
                      return (<li key={index}><label><input type="checkbox" checked={isPresent(shape._id)} onChange={(e) => handlechecks(e, shape._id, "shape")} /> {shape.name}</label></li>)
                    })}
                  </ul>
                </details>
              </li>

              {/* Special */}
              <li>
                <details>
                  <summary>Special</summary>
                  <ul className="flex-row gap-4">
                    {categories.specials && categories.specials.map((special, index) => {
                      return (<li key={index}><label><input type="checkbox" checked={isPresent(special._id)} onChange={(e) => handlechecks(e, special._id, "special")} /> {special.name}</label></li>)
                    })}
                  </ul>
                </details>
              </li>

              {/* Price */}
              <li>
                <details>
                  <summary>Price</summary>
                  <ul className="flex-row justify-center items-center outline-none">
                    <li>
                      <input type="range" name="price" min={0} max={26000} value={price[1]} className="py-2 px-0" onChange={priceHandler} />
                      <label>Max Range: ₹ {price[1]}</label>
                    </li>
                  </ul>
                </details>
              </li>
              
            </ul>
          </details>

        </div>

        <div className="right flex flex-col items-center">

          <div className="flex flex-wrap items-center justify-center col-span-4">
            {loading ? <Loader /> :
              ((products && products.length) ? products.map((product, index) => <Card product={product} key={index} />) : <div>No Product Found</div>)
            }
          </div>

          <div className="join mb-4">
            <button className="join-item btn bg-slate-600" disabled={currentPage === 1 ? true : false} onClick={() => setCurrentPage(currentPage-1)}>«</button>
            <button className="join-item btn">Page {currentPage}</button>
            <button className="join-item btn bg-slate-600" disabled={resultPerPage > filteredProductsCount} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
          </div>

        </div>
      
      </div>

    </div>
  )
}

export default Products