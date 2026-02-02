import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: { name: "john", age: 30, _id: 12 },
  isLoading: false,

  login: () => {
    console.log("login page");
    set({isLoading:true})
  },
}));
