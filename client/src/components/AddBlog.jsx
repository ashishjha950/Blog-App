import axios from "axios";
import { useEffect, useState } from "react";
import { useGlobal } from "./GlobalProvider";
import {toast} from 'react-toastify'
import {RotateLoader} from 'react-spinners'
import {useNavigate} from 'react-router-dom'
import noImageAvailable from '../assets/noImageAvailable.jpg'

const AddBlog = () => {
  const { loading, setLoading, API_URL,isDarkMode,editPostData,setEditPostData } = useGlobal();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    postImg: '',
  });
  const [image,setImgae] = useState(noImageAvailable);

  useEffect(()=>{
    URL.revokeObjectURL(image);
    if(editPostData){
      setFormData({
        title: editPostData.title,
        content: editPostData.content,
      })
      setImgae(editPostData.imageUrl)
    }
    else{
      setFormData({
        title: "",
        content: "",
      })
      setImgae(noImageAvailable)
    }
  },[])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
  
      setFormData({ ...formData, postImg: file });

      setImgae(URL.createObjectURL(file));  
    } else {
      setFormData({...formData,[name]: value,});
    }
  };

    const navigate = useNavigate()

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let response = '';
      editPostData?(
        response = await axios.patch(`${API_URL}/blog/updateblog/${editPostData._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })        
      ):(        
        response = await axios.post(`${API_URL}/blog/postblog`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
      )
      setFormData({
        title: "",
        content: "",
      })

      setEditPostData(null)
      
      toast.success(response.data.msg, {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      navigate('/myblog')

    } catch (err) {
      toast.error(err.response.data.msg,{
        position: 'top-left',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
    }
    setLoading(false);
  };

  return (
    <div className={`${isDarkMode?'bg-gray-900':'bg-gray-200'} min-h-screen flex justify-center items-center mt-20 md:mt-5`}>
      {loading?<RotateLoader color={isDarkMode?'white':'black'}/>:(
        <div className={`${isDarkMode?'bg-gray-400':'bg-white'} p-8 mt-24 rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${isDarkMode?'text-white':'text-gray-800'}`}>
          Create a New Blog
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            required
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 mb-4 border bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            type="text"
            name="content"
            required
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-3 border bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
          />
          <div className="flex py-3 items-center justify-center ">
          <img className="rounded-xl" width={150} src={image} alt="postImg" />
          </div>
          <input
            type="file"
            name="postImg"
            onChange={handleChange}
            className="w-full p-3 mb-4 border bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full cursor-pointer py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
          >
            {editPostData?'Update Blog':'Add Blog'}
          </button>
        </form>
      </div>
      )}
      
    </div>
  );
};

export default AddBlog;
