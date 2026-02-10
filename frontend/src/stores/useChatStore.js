import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  isSoundEnabled: (() => {
    try {
      return JSON.parse(localStorage.getItem("isSoundEnabled")) === true;
    } catch {
      return true;
    }
  })(),

  toggleSound: () => {
    const next = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", JSON.stringify(next));
    set({ isSoundEnabled: next });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (user) => set({ selectedUser: user }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId:async(userId)=>{
    set({isMessagesLoading:true});
    try {
      const res=await axiosInstance.get(`/message/chat/${userId}`);
      set({messages:res.data});
    } catch (error) {
      toast.error(error.response?.data?.message||"Something went wrong");
    }
    finally{
      set({isMessagesLoading:false});
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      // remove optimistic message on failure
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  subscribeToMessages: () => {
  const socket = useAuthStore.getState().socket;
  const { selectedUser, isSoundEnabled } = get();

  if (!socket || !selectedUser) return;

  socket.off("newMessage"); 

  socket.on("newMessage", (newMessage) => {
    if (newMessage.senderId !== selectedUser._id) return;

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    if (isSoundEnabled) {
      const audio = new Audio("/sounds/notification.mp3");
      audio.play().catch(() => {});
    }
  });
  
  // typing indicators
  socket.off("typing");
  socket.off("stopTyping");

  socket.on("typing", ({ from, receiverId }) => {
    if (!selectedUser) return;
    if (from !== selectedUser._id) return;
    set({ typingUserId: from });
  });

  socket.on("stopTyping", ({ from, receiverId }) => {
    if (!selectedUser) return;
    if (from !== selectedUser._id) return;
    set({ typingUserId: null });
  });
},

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("typing");
    socket.off("stopTyping");
  },
}));
