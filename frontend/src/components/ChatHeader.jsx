import React from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-800 bg-slate-900">
      
      {/* Avatar */}
      <div className="relative size-10">
        <img
          src={selectedUser.profilePic || "/avatar.png"}
          alt={selectedUser.fullName}
          className="rounded-full size-10 object-cover"
        />

        {/* 🟢 Online Dot */}
        {isOnline && (
          <span className="absolute top-1 right-1 size-2.5 bg-green-500 border-2 border-slate-900 rounded-full" />
        )}
      </div>

      {/* Name + status */}
      <div className="flex flex-col">
        <h4 className="text-slate-200 font-medium leading-tight">
          {selectedUser.fullName}
        </h4>
        <span className="text-xs text-green-400">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;
