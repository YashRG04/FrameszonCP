import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Login.css";

import HomeIcon from '@mui/icons-material/Home';

import { clearErrors, login, register } from "../../../Actions/userActions.js";
import Loader from "../../../Components/Loader.jsx";

import loginImage from "../../../assets/banners/b6.jpg";

const LoginSignUp = () => {

    const dispatch = useDispatch();
    const [signUp, setSignUp] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [avatar, setImages] = useState([]);

    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);

    const submitHandle = (e) => {
        e.preventDefault();

        if(!signUp)
            dispatch(login(email, password));
        else
            dispatch(register(name, email, password, avatar));
    }

    useEffect(() => {
        if(error)
            dispatch(clearErrors());
        else{
            if(isAuthenticated)
                {
                    if(user.role === "admin")
                        navigate("/admin/");
                    else
                        navigate("/");
                }
        }
    }, [dispatch, navigate, isAuthenticated, error]);

    const createAvatarImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(reader.result);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ):(
                <section className="h-screen">
                    <div className="flex items-center justify-center h-full">
                        <div className="bg-white rounded-lg w-3/4">
                            <div className="grid flex-wrap items-center justify-center grid-cols-1 mx-auto shadow-xl lg:grid-cols-2 rounded-xl">
                                
                                <div className="hidden h-full lg:block">
                                    <img className="object-fill h-full rounded-l-lg" src={loginImage} alt="" />
                                </div>

                                <div className="w-full px-6 py-3">

                                    {/* Title */}
                                    <div>
                                        <div className="mt-3 text-left sm:mt-5">
                                            <div className="inline-flex items-center justify-between w-full">
                                                <h3 className="text-lg font-bold text-neutral-600 l eading-6 lg:text-5xl">{signUp ? "Sign up" : "Login"}</h3>
                                                <HomeIcon fontSize="large" color="primary" className="cursor-pointer" onClick={()=> navigate("/")}/>
                                            </div>
                                            <div className="mt-4 text-base text-gray-500">
                                                {signUp ? <p>SignUp only for admins</p> : <p>Log in only for admins</p>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fills */}
                                    <form className="mt-6 space-y-2">

                                        {/* Name */}
                                        { signUp && 
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your name" required />
                                            </div> }

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your email" required={true} />
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300" placeholder="Enter your password" required={true} />
                                        </div>

                                        {/* Avatar */}
                                        { signUp &&
                                            <div className="flex flex-col w-100 items-start justify-center pb-5">
                                                <label htmlFor="avatar">Profile Image</label>
                                                <input
                                                    onChange={createAvatarImagesChange}
                                                    type="file"
                                                    name="avatar"
                                                    accept="image/*"
                                                    required
                                                    className="file-input file-input-bordered w-full"
                                                />
                                            </div>
                                        }

                                        <div className="flex flex-col lg:space-y-2">
                                            <button type="button" onClick={submitHandle} className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center border border-blue-700 text-black transition duration-500 ease-in-out transform rounded-xl hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">{signUp ? "Sign up" : "Login"}</button>

                                            {/* {!signUp && <a href="#" type="button" className="inline-flex justify-center pt-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm"> Forgot your Password? </a>} */}
                                            {!signUp &&<div type="button" className="inline-flex justify-center pt-2 pb-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm" onClick={()=>{setSignUp(true)}}> Make a new account. Sign Up</div>}
                                            {signUp && <div type="button" className="inline-flex justify-center pt-2 pb-4 text-base font-medium text-gray-500 focus:outline-none hover:text-neutral-600 focus:text-blue-600 sm:text-sm" onClick={()=>{setSignUp(false)}}> Already have an account. Log In</div>}
                                        </div>

                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default LoginSignUp;