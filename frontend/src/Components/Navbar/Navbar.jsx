import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import { logout } from "../../Actions/userActions";

import { BsWhatsapp } from "react-icons/bs";
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleOnClick = () => {
    const ele = document.querySelector(".nav-btn label");
    if (ele) {
      ele.click();
    }
  };

  const logoutHandle = () => {
    dispatch(logout);
    window.location.reload(true);
  }

  return (
    <div className="nav w-screen flex flex-row shadow-lg h-16 items-center justify-between text-sm lg:text-base fixed z-50 bg-white bg-opacity-60 backdrop-blur-md px-6">
      <input type="checkbox" id="nav-check" />
      <img className="logo md:h-16 h-14 hover:cursor-pointer"
        src={require("../../assets/logo.png")}
        alt="logo"
        onClick={() => navigate("/")}
      />
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className="nav-links flex flex-row">
        <div className="items-center text-slate-700 font-serif font-medium flex flex-col sm:flex-row sm:mt-0 mt-6 gap-y-8 sm:gap-y-0 sm:gap-x-5">
          <div onClick={handleOnClick}>
            <Link className="cursor-pointer hover:drop-shadow-md" to="/">Home</Link>
          </div>
          <div onClick={handleOnClick}>
            <Link className="cursor-pointer hover:drop-shadow-md" to="/products">Products</Link>
          </div>
          <a href="#ContactUs" onClick={handleOnClick}>
            <div className="cursor-pointer hover:drop-shadow-md">
              Contact Us
            </div>
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone=%2B917982610896&text=Hello,+I%27m+interested+in+purchasing+eyeglasses.+Please+share+the+catalogue&app_absent=0"
            onClick={handleOnClick} target="_blank">
            <button className="bg-slate-500 transition-all text-white hover:bg-white hover:text-slate-500 hover:border-slate-500 hover:border-2 w-32 h-8 px-4 rounded flex flex-row align-middle justify-center content-center text-center items-center gap-2">
              <BsWhatsapp /> WhatsApp
            </button>
          </a>
          {isAuthenticated &&
              (<><button onClick={logoutHandle} className="bg-slate-500 transition-all text-white hover:bg-white hover:text-slate-500 hover:border-slate-500 hover:border-2 min-w-32 max-w-max h-8 px-4 rounded flex flex-row align-middle justify-center content-center text-center items-center gap-2">
                <LogoutIcon /> Log Out
              </button>
              {user.role === "admin" && <button onClick={() => navigate("admin/")} className="bg-slate-500 transition-all text-white hover:bg-white hover:text-slate-500 hover:border-slate-500 hover:border-2 w-32 h-8 px-4 rounded flex flex-row align-middle justify-center content-center text-center items-center gap-2">
                <AdminPanelSettingsIcon /> Admin
              </button>}
              </>)
          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
