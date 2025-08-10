import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
   const fetchOtherUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found in localStorage.");
      return;
    }

    const res = await axios.get(
      "https://chat-application-backend.onrender.com/api/v1/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (res.data && Array.isArray(res.data)) {
      console.log("Fetched other users:", res.data);
      dispatch(setOtherUsers(res.data));
    } else {
      console.warn("Unexpected response format:", res.data);
    }
  } catch (err) {
    if (err.response) {
      console.error("Server responded with error:", err.response.data);
    } else if (err.request) {
      console.error("No response received:", err.request);
    } else {
      console.error("Error setting up request:", err.message);
    }
  }
};


    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
