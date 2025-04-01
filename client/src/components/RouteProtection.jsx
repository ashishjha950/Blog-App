import { useEffect } from "react";
import { useGlobal } from "./GlobalProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RouteProtection = ({ children }) => {
  const { loggedIn } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login",{replace:true});
      toast.warn("Login first!", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [loggedIn, navigate]);

  return loggedIn && children;
};

export default RouteProtection;
