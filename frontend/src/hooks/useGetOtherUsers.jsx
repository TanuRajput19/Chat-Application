import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
          try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://chat-application-backend.onrender.com/api/v1/user",
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers