import React from "react";
import logo from "/logo.png";
import { NavLink } from "react-router-dom";
import { useGlobal } from "./GlobalProvider";
import {toast} from 'react-toastify'
import { FaSun,FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()

  return (
    <div className={`absolute w-full ${isDarkMode?'bg-black':'bg-white'} top-0 py-2`}>
      <div className="flex p-2 items-center justify-between flex-col gap-2 md:flex-row">
        <button className="cursor-pointer" onClick={()=> navigate('/')}>
        <img className="rounded-4xl w-28" src={logo} alt="logo" />
        </button>
        <div className="flex items-center justify-evenly w-full md:w-max gap-2 lg:gap-8 px-2">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-2xl" : `${isDarkMode?'text-white':'text-gray-700'}`
              } transition-all duration-500 `
            }
            to="/myblog"
          >
            My Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-2xl" : `${isDarkMode?'text-white':'text-gray-700'}`
              } transition-all duration-500 `
            }
            to="/addblog"
          >
            Add Blog
          </NavLink>
        </div>
        <div className="flex justify-center w-full md:w-max items-center lg:gap-8 px-2 gap-10">
          {loggedIn?(
            <button onClick={logout} className="bg-blue-500 py-1 px-2 text-lg rounded-2xl text-white cursor-pointer">LogOut</button>
          ):(
            <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-2xl" : `${isDarkMode?'text-white':'text-gray-700'}`
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
