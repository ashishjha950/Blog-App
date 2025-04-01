import React from "react";
import logo from "../assets/logo.avif";
import { NavLink } from "react-router-dom";
import { useGlobal } from "./GlobalProvider";
import {toast} from 'react-toastify'
import { FaSun,FaMoon } from "react-icons/fa";

const Navbar = () => {

    const {loggedIn, setLoggedIn,isDarkMode,setIsDarkMode} = useGlobal();

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setLoggedIn(false)
        toast.success('Successfully Logout',{
            position: 'top-left',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          })
    }

  return (
    <div className={`absolute w-full ${isDarkMode?'bg-black':'bg-white'} top-0`}>
      <div className="flex p-2 items-center justify-between">
        <img className="rounded-4xl" width={100} src={logo} alt="logo" />
        <div className="flex items-center gap-2 lg:gap-8 px-2">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : `${isDarkMode?'text-white':'text-gray-700'} text-sm md:text-xl`
              } transition-all duration-500 `
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : `${isDarkMode?'text-white':'text-gray-700'} text-sm md:text-xl`
              } transition-all duration-500 `
            }
            to="/myblog"
          >
            My Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : `${isDarkMode?'text-white':'text-gray-700'} text-sm md:text-xl`
              } transition-all duration-500 `
            }
            to="/addblog"
          >
            Add Blog
          </NavLink>

          {loggedIn?(
            <button onClick={logout} className="bg-blue-500 py-1 px-2 text-lg rounded-2xl text-white cursor-pointer">LogOut</button>
          ):(
            <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : `${isDarkMode?'text-white':'text-gray-700'} text-sm md:text-xl`
              } transition-all duration-500 `
            }
            to="/login"
          >
            Login
          </NavLink>            
          )}

          <button onClick={()=>setIsDarkMode(!isDarkMode)} className="p-2 bg-white rounded-full cursor-pointer text-2xl">
            {isDarkMode?<FaMoon/>:<FaSun/>}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
