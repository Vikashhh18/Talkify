import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:import.meta.env.Mode==="development"?"http://localhost:3002/api":"/api",
    withCredentials:true
})