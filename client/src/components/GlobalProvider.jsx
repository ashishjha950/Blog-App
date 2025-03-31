import { createContext, useContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

const GlobalProvider = ({children}) => {

    const [loading,setLoading] = useState(false)
    const [loggedIn,setLoggedIn] = useState(false)
    const API_URL = 'https://blog-app-backend-19c1h9ofr-ashish-kumar-jhas-projects.vercel.app';

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
    <GlobalContext.Provider value={{loading,setLoading,loggedIn,setLoggedIn,API_URL}}>
        {children}
    </GlobalContext.Provider>
  )
}

const useGlobal = () => useContext(GlobalContext)

export  {GlobalProvider,useGlobal}