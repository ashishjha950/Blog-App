import { useEffect } from "react"
import { useGlobal } from "./GlobalProvider"
import axios from "axios"

const MyBlog = () => {

    const { loading,setLoading, loggedIn, API_URL } = useGlobal()

    useEffect(()=>{
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${API_URL}/blog/myblog`)
                console.log(response)
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        
        setLoading(true)
        fetchBlog()

    },[])

  return (
    <div className='bg-gray-200 mt-24'>
        
    </div>
  )
}

export default MyBlog