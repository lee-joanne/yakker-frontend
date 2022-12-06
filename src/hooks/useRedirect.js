// useRedirect code credit goes to Code Institute Moments
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMount = async () => {
      try {
        await axios.post("/dj-rest-auth/token/refresh/");
        if (userAuthStatus === "loggedIn") {
          navigate("/");
        }
      } catch (err) {
        if (userAuthStatus === "loggedOut") {
          navigate("/");
        }
        if (err.response?.status === 500) {
          navigate("/500");
        }
      }
    };

    handleMount();
  }, [navigate, userAuthStatus]);
};
