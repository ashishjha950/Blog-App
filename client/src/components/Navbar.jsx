import React from "react";
import logo from "../assets/logo.avif";
import { NavLink } from "react-router-dom";
import { useGlobal } from "./GlobalProvider";
import {toast} from 'react-toastify'

const Navbar = () => {

    const {loggedIn, setLoggedIn} = useGlobal();

    const logout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        setLoggedIn(false)
        toast.success('Successfully Logout',{
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          })
    }

  return (
    <div className="absolute w-full bg-white top-0">
      <div className="flex p-2 items-center justify-between">
        <img width={100} src={logo} alt="logo" />
        <div className="flex items-center gap-2 lg:gap-8 px-2">
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : "text-gray-700 text-sm md:text-xl"
              } transition-all duration-500 `
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : "text-gray-700 text-sm md:text-xl"
              } transition-all duration-500 `
            }
            to="/myblog"
          >
            My Blogs
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `${
                isActive ? "text-red-700 text-md md:text-2xl" : "text-gray-700 text-sm md:text-xl"
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
                isActive ? "text-red-700 text-md md:text-2xl" : "text-gray-700 text-sm md:text-xl"
              } transition-all duration-500 `
            }
            to="/login"
          >
            Login
          </NavLink>            
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
