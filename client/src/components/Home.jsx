import { useEffect,useState } from "react"
import { useGlobal } from "./GlobalProvider"
import axios from "axios"
import {toast} from 'react-toastify'
import {RotateLoader} from 'react-spinners'
import Card from "./Card"

const Home = () => {

  const { loading,setLoading,loggedIn, API_URL,isDarkMode } = useGlobal()
  const [fetchedData, setFetchedData] = useState([])

  useEffect(()=>{
      const fetchBlog = async () => {
          try {
              const response = await axios.get(`${API_URL}/blog/allblog`,{headers:{
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              }})
              setFetchedData(response.data.myPosts)
          }catch(err){
              toast.error('Server Error',{
                      position: 'top-left',
                      autoClose: 1000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      theme: 'dark',
                    })
          }
          setLoading(false)
      }
      
      setLoading(true)
      fetchBlog()

  },[])

  return (
    <div className={`${isDarkMode?'bg-gray-900':'bg-gray-200'} min-h-screen pt-24 ${loading?'flex items-center justify-center w-full':''}`}>
        {loading?<RotateLoader color={isDarkMode?'white':'black'}/>:(
            <div>
                <div className="py-2 px-4">
                    <h1 className={`text-3xl font-bold text-center ${isDarkMode?'text-white':'text-black'}`}>All Blogs</h1>
                    {loggedIn && <h4 className={`text-xl font-medium text-right ${isDarkMode?'text-white':'text-black'}`}>Hi! {localStorage.getItem('name')}</h4>}
                </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 py-5 gap-3 ">
                {fetchedData&&fetchedData.map((data)=>{
                    return <Card key={data._id} data={data}/>
                })}
            </div>
            </div>
        )}        
    </div>
  )
}

export default Home