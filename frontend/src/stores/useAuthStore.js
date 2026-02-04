import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const useAuthStore = create((set) => ({
  authUser:null,
  isCheckingAuth:true,
  isSigningUp:false,

  checkAuth:async()=>{
    try {
      const res=await axiosInstance("/auth/check");
      set({authUser:res.data});
    } catch (error) {
      console.log("Error in checkAuth ",error);
      set({authUser:null})
    }
    finally{
      set({isCheckingAuth:false})
    }
  },

  signUp: async (data) => {
  set({ isSigningUp: true });
  try {
    const res = await axiosInstance.post("/auth/register", data);
    set({ authUser: res.data });
    // <Navigate to={"/"}/>
    toast.success("Account created successfully!");
  } catch (error) {
    const message =
      error?.response?.data?.message || "Signup failed";
    toast.error(message);
  } finally {
    set({ isSigningUp: false });
  }
},
}));
