import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://talkify-cc5m.onrender.com/api",
  withCredentials: true,
});
