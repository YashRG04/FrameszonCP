import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Sidebar.css";
import logo from "../../../assets/logo.png";

import { logout } from "../../../Actions/userActions";

import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';

const Sidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandle = () => {
        dispatch(logout);
        window.location.reload(true);
    }

    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
      if(!isAuthenticated)
        navigate("/login/");
    }, [navigate, isAuthenticated]);

    return (
        <>
            {/* For laptops and bigger devices */}
            <div className="hidden flex-col md:flex sidebar min-w-max bg-white py-20">
                <Link to="/" className="p-0">
                    <img src={logo} alt="Framezon" className="logo w-8 h-14 object-contain" />
                </Link>
                <Link to="/admin/" className="p-3">
                    <p><DashboardIcon /> Dashboard</p>
                </Link>
                <Link to="/admin/products" className="p-3">
                    <p><InventoryIcon /> Products</p>
                </Link>
                <Link to="/admin/categories" className="p-3">
                    <p><CategoryIcon /> Categories</p>
                </Link>
                <Link onClick={logoutHandle}>
                    <p><LogoutIcon/> Logout</p>
                </Link>
            </div>

            {/* For phones and tablets */}
            <div className="sidebar bg-white flex flex-col flex-wrap w-screen md:hidden">
                <Link to="/">
                    <img src={logo} alt="Framezon" className="logo w-8 h-14 object-contain" />
                </Link>
                <div className="flex flex-row flex-wrap items-center justify-center">
                    <Link to="/admin/" className="p-3">
                        <p><DashboardIcon /> Dashboard</p>
                    </Link>
                    <Link to="/admin/products" className="p-3">
                        <p><InventoryIcon /> Products</p>
                    </Link>
                    <Link to="/admin/categories" className="p-3">
                        <p><CategoryIcon /> Categories</p>
                    </Link>
                    <Link onClick={logoutHandle}>
                        <p><LogoutIcon /> Logout</p>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Sidebar;