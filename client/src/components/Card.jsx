import { useGlobal } from "./GlobalProvider";
import noImageAvailable from "../assets/noImageAvailable.jpg";
import { ImPencil2 } from "react-icons/im";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

const Card = ({ data }) => {
  const { setLoading, API_URL, isDarkMode, setEditPostData } = useGlobal();

  const navigate = useNavigate();

  const updateHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          setEditPostData(data);
          navigate("/addblog");
        } catch (err) {
          toast.error("Failed to update post!", {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const deleteHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const response = await axios.delete(
            `${API_URL}/blog/myblog/${data._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          navigate("/");

          toast.success(response.data.msg, {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        } catch (err) {
          toast.error("Failed to delete post!", {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const showComments = () => {
    const commentList = data.comments && data.comments.length > 0
      ? data.comments.map(comment => `<p><strong>${comment.author}:</strong> ${comment.text}</p><hr>`).join("")
      : "<p>No comments yet!</p>";
  
    Swal.fire({
      title: "Comments",
      html: `
        <div style="text-align:left; max-height: 300px; overflow-y: auto; padding-right: 10px;">
          ${commentList}
        </div>
        <textarea id="commentInput" rows="3" style="width: 100%; margin-top: 10px; padding: 8px;" placeholder="Write a comment..."></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Close",
      width: "80%",
      background: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      preConfirm: () => {
        const commentText = document.getElementById("commentInput").value.trim();
        if (!commentText) {
          Swal.showValidationMessage("Comment cannot be empty!");
        }
        return commentText;
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${API_URL}/comment/post/${data._id}`, 
            { text: result.value },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
  
          toast.success("Comment added successfully!", {
            position: "top-left",
            autoClose: 1000,
            theme: "dark"
          });
  
        } catch (error) {
          toast.error("Failed to add comment!", {
            position: "top-left",
            autoClose: 1000,
            theme: "dark"
          });
        }
      }
    });
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg flex flex-col md:flex-row gap-4 `}
    >
      <div className="relative w-full flex items-center justify-center max-w-xl">
        <img
          src={data.imageUrl || noImageAvailable}
          alt="post-img"
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      <div className="flex items-start flex-col justify-between w-full">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p className="text-sm text-gray-400">{data.content}</p>
        </div>

        <div className="flex flex-row items-center justify-between w-full gap-2 ">
          <div>
            <div className="flex items-center justify-start gap-1.5 py-2">
              <button onClick={showComments} className="px-4 py-2 text-white cursor-pointer bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition">
                Comments
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Published: {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
          {data.writtenBy && (
            <p className="text-sm font-medium">Written by: {data.writtenBy}</p>
          )}
          {!data.writtenBy && (
            <div className="flex items-center justify-end gap-1">
              <button
                onClick={updateHandler}
                className="cursor-pointer hover:bg-blue-200 rounded-full p-2"
              >
                <ImPencil2 color="gray" size={20} />
              </button>
              <button
                onClick={deleteHandler}
                className="cursor-pointer hover:bg-blue-200 rounded-full p-1"
              >
                <MdDeleteOutline color="red" size={30} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
