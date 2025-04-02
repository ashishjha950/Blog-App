import { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {

    const [loading,setLoading] = useState(false)
    const [loggedIn,setLoggedIn] = useState(false)
    const [isDarkMode,setIsDarkMode] = useState(true)
    const [editPostData, setEditPostData] = useState(null);
    const API_URL = 'http://localhost:8000';

    useEffect(()=>{
      const token = localStorage.getItem('token')
      if(token){
        setLoggedIn(true)
      }
      else{
        setLoggedIn(false)
      }
    },[])

  return (
    <GlobalContext.Provider value={{loading,setLoading,loggedIn,setLoggedIn,API_URL,isDarkMode,setIsDarkMode,editPostData, setEditPostData}}>
        {children}
    </GlobalContext.Provider>
  )
}

const useGlobal = () => useContext(GlobalContext)

export  {GlobalProvider,useGlobal}