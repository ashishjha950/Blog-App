import { useEffect, useState } from "react";
import { useGlobal } from "./GlobalProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { RotateLoader } from "react-spinners";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const { loading, setLoading, loggedIn, API_URL, isDarkMode } = useGlobal();
  const [fetchedData, setFetchedData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/myblog`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFetchedData(
          response.data.myPosts.map(({ writtenBy, ...rest }) => rest)
        );
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

    setLoading(true);
    fetchBlog();
  }, []);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900" : "bg-gray-200"
      } min-h-screen pt-24 ${
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
              Your Blogs
            </h1>
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
            {fetchedData.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10">
                <h3 className="text-2xl font-semibold text-gray-500">No blog yet!</h3>
                <p className="text-gray-400 mt-2">Start your blogging journey today.</p>
                <button
                  onClick={() => navigate("/addblog")}
                  className="mt-4 px-5 py-2 cursor-pointer bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
                >Add a Blog ✍️
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
