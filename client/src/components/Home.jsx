import { useEffect, useState } from "react";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { RotateLoader } from "react-spinners";
import Card from "./Card";

const Home = () => {
  const { loading, setLoading, loggedIn, API_URL, isDarkMode } = useGlobal();
  const [fetchedData, setFetchedData] = useState([]);

  const [formData, setFormData] = useState({
    search: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitForm = (e)=>{
    e.preventDefault();
    fetchBlog();
  }

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/blog/allblog`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFetchedData(response.data.myPosts);
    } catch (err) {
      toast.error("Server Error", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-gray-200"
      } min-h-screen pt-48 md:pt-32 ${
        loading ? "flex items-center justify-center w-full" : ""
      }`}
    >
      {loading ? (
        <RotateLoader color={isDarkMode ? "white" : "black"} />
      ) : (
        <div>
          <div className="py-2 px-4">
            <h1
              className={`text-3xl font-bold text-center ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              All Blogs
            </h1>
            <form
              onSubmit={submitForm}
              className={`p-4 my-2 flex items-center justify-center flex-col rounded ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                name="search"
                value={formData.search}
                onChange={handleChange}
                className={`border rounded px-3 py-2 w-full outline-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }`}
              />

              <select
                name="category"
                onChange={handleChange}
                value={formData.category}
                className={`mt-2 p-2 rounded w-full outline-none ${
                  isDarkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                }`}
              >
                <option value="all">All</option>
                <option value="author">By Author</option>
                <option value="title">By Title</option>
              </select>

              <button
                type="submit"
                className={`mt-3 px-4 py-2 rounded font-semibold transition-colors ${
                  isDarkMode
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                Search
              </button>
            </form>
            {loggedIn && (
              <h4
                className={`text-xl font-medium text-right ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Hi! {localStorage.getItem("name")}
              </h4>
            )}
          </div>
          <div className="grid px-4 py-5 gap-3 ">
            {fetchedData &&
              fetchedData.map((data) => {
                return <Card key={data._id} data={data} />;
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
