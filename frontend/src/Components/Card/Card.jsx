import React from 'react';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getProductDetails } from '../../Actions/productActions';

const Card = ({product}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(getProductDetails(product._id));
    navigate(`/product/${product._id}`);
  }

  return (
    <div className="card w-80 h-96 bg-white hover:shadow-xl duration-500 m-5">
      <figure className="w-full"><img src={product.images[0].url} alt="Shoes" className="w-full object-contain object-center" /></figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: ₹{product.price}</p>
        <div className="card-actions justify-between mt-5">
          <button className="btn btn-primary btn-active w-max" onClick={handleClick}><ShoppingCartIcon />Buy Now</button>
        </div>
      </div>
    </div>
    
    // <div className="h-60 shadow-lg rounded-2xl border-2 border-opacity-10 border-slate-500 lg:m-5 md:m-10 m-5 flex justify-center self-center align-middle items-center flex-col transition grow2 w-80">
    //   <div className="md:h-40 mb-2 w-full flex justify-center items-center align-middle self-center overflow-y-hidden">
    //     <img alt="Frame Image" src={product.images[0].url} className="w-full object-cover rounded-t-2xl" />
    //   </div>
    //   <div className="md:font-light md:text-sm text-xs text-center">
    //     {product.name}
    //   </div>
    //   <div className="text-slate-500 font-semibold md:text-base text-sm mt-2">
    //     ₹ {product.price}
    //   </div>
    // </div>
  );
}

export default Card