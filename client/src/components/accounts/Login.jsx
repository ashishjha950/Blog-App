import { useState } from "react";
import { useGlobal } from "../GlobalProvider";
import { LuEyeClosed } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import {toast} from 'react-toastify'
import {RotateLoader} from 'react-spinners'

const Login = () => {
  const { loading,setLoading, setLoggedIn,API_URL,isDarkMode } = useGlobal();
  const [accounts, toogleAccount] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordReviel, setPasswordReveil] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountToogle = () => {
    toogleAccount(accounts === "login" ? "register" : "login");
  };

  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    let response = ''
    try{
        if(accounts==='login'){
            response = await axios.post(`${API_URL}/user/login`,formData)
        }
        else{
            response = await axios.post(`${API_URL}/user/signUp`,formData)
        }
        
        if(response.data.success){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('name',response.data.name)
            toast.success(response.data.msg,{
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
              })
            setLoggedIn(true)
            navigate('/')
        }
    }
    catch(err){
        toast.error(err.response.data.msg,{
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
          })
            
        setLoggedIn(false)
    }
    setLoading(false);
    console.log(response)
    
  }
  ;

  return (
    <div className={`h-screen ${isDarkMode?'bg-gray-900':'bg-gray-200'} flex items-center justify-center`}>
        {loading?<RotateLoader />:(
      <div className={`rounded-2xl ${isDarkMode?'bg-gray-400':'bg-white'} px-3 py-2 m-2 shadow-lg`}>
        {accounts === "login" ? (
          <form
            className="p-6 max-w-sm mx-auto rounded-lg"
            onSubmit={submitHandler}
          >
            <label
              className={`block text-sm font-medium ${isDarkMode?'text-white':'text-gray-700'}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="my-1 block bg-w w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
  
            <div className="mt-4">
              <label
                className={`block text-sm font-medium ${isDarkMode?'text-white':'text-gray-700'}`}
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordReviel ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block bg-white w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setPasswordReveil(!passwordReviel)}
                  aria-label="Toggle password visibility"
                >
                  {passwordReviel ? <MdOutlineRemoveRedEye /> : <LuEyeClosed />}
                </button>
              </div>
            </div>
  
            <button
              type="submit"
              className="mt-6 w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            className=" p-6 max-w-sm mx-auto shadow-lg rounded-lg"
            onSubmit={submitHandler}
          >
            <label
              className={`block text-sm font-medium ${isDarkMode?'text-white':'text-gray-700'}`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 mb-3 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
            <label
              className={`block text-sm font-medium ${isDarkMode?'text-white':'text-gray-700'}`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="my-1 block bg-w w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
  
            <div className="mt-4">
              <label
                className={`block text-sm font-medium ${isDarkMode?'text-white':'text-gray-700'}`}
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordReviel ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block bg-white w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  onClick={() => setPasswordReveil(!passwordReviel)}
                  aria-label="Toggle password visibility"
                >
                  {passwordReviel ? <MdOutlineRemoveRedEye /> : <LuEyeClosed />}
                </button>
              </div>
            </div>
  
            <button
              type="submit"
              className="mt-6 w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Register
            </button>
          </form>
        )}
        <span className={`block text-center mt-4 ${isDarkMode?'text-white':'text-gray-600'}`}>OR</span>
        <button
          onClick={handleAccountToogle}
          className={`cursor-pointer ${isDarkMode?'text-blue-900':'text-blue-500'} hover:text-blue-600 underline transition-colors duration-200`}
        >
          {accounts === "login"
            ? "Don't have an Account?"
            : "Already have an Account?"}
        </button>
      </div>
        )}
        
    </div>
  );
};

export default Login;
