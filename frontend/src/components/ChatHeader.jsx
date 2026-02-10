import React from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import { ArrowLeft } from 'lucide-react';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  // const handleBackToChats = () => setSelectedUser(null);

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700 bg-slate-800/90">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Mobile Back Button */}
        {/* <button
          // onClick={handleBackToChats}
          className="lg:hidden flex-shrink-0 p-2 rounded-lg hover:bg-slate-700/50 active:bg-slate-700 transition-colors duration-200"
          aria-label="Back to chats"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
        </button> */}
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-700">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online Dot */}
          <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-slate-800 ${
            isOnline ? 'bg-emerald-500' : 'bg-slate-500'
          }`} />
        </div>

        {/* Name + Status */}
        <div className="min-w-0 flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-white truncate">
            {selectedUser.fullName}
          </h4>
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isOnline ? 'bg-emerald-500' : 'bg-slate-500'
            }`} />
            <span className="text-xs sm:text-sm text-slate-400">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;