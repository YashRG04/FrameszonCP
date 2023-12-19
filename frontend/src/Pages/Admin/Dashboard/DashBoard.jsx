import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../../Actions/productActions";
import { getCategories } from "../../../Actions/categoryActions"; 
import Loader from "../../../Components/Loader.jsx";

const Dashboard = () => {
    
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);
    const { products, productsCount } = useSelector((state) => state.products);
    const { error, success, loadingNew } = useSelector((state) => state.newProduct);
    const { isUpdated, isDeleted } = useSelector((state) => state.productsChanges);
    const { categories, isChanged, loading} = useSelector((state) => state.categories);

    useEffect(() => {

        dispatch(getAdminProducts());
        dispatch(getCategories());

    }, [dispatch, isChanged, isUpdated, error, success, isDeleted]);

    return (
        <div className="w-full min-h-screen flex flex-col overflow-y-scroll items-stretch justify-center">
            { loading ? <Loader /> :
            <div className="flex flex-col">
                <h1 className="font-normal text-center text-5xl text-slate-600 mb-4">Welcome <b>{user.name}</b></h1>
                <h2 className="text-center text-2xl font-normal italic text-slate-900">Dashboard</h2>

                <div className="flex justify-center mt-6">
                    <div className="flex flex-wrap gap-24 justify-center mt-5">
                        <Link to="/admin/products" className="bg-red-400 rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Products <br /> {productsCount} </p>
                        </Link>
                        <Link to="/admin/categories" className="bg-slate-800 text-sky-100 rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Categories <br /> {categories.categories ? categories.categories.length : 1}</p>
                        </Link>
                        <Link to="/admin/categories" className="bg-stone-800 text-orange-200 rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Genders <br /> {categories.genders ? categories.genders.length : 1} </p>
                        </Link>
                        <Link to="/admin/categories" className="bg-cyan-700 text-zinc-200 rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Brands <br /> {categories.brands ? categories.brands.length : 1} </p>
                        </Link>
                        <Link to="/admin/categories" className="bg-indigo-800 text-white rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Shapes <br /> {categories.shapes ? categories.shapes.length : 1} </p>
                        </Link>
                        <Link to="/admin/categories" className="bg-fuchsia-800 text-pink-100 rounded-full btn-circle md:text-xl text-center p-24 flex items-center justify-center">
                            <p>Special Categories <br /> {categories.specials ? categories.specials.length : 1} </p>
                        </Link>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Dashboard;