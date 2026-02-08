import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound.";
import { useAuthStore } from "../stores/useAuthStore";

const ChatsList = ({ onSelectChat }) => {
  const {
    getMyChatPartners,
    chats,
    isUsersLoading,
    setSelectedUser,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const handleSelectChat = (chat) => {
    setSelectedUser(chat);
    if (onSelectChat) {
      onSelectChat(); // Switch to chat view on mobile
    }
  };

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const isOnline =
          onlineUsers.includes(chat._id) &&
          chat._id !== authUser._id;

        return (
          <div
            key={chat._id}
            onClick={() => handleSelectChat(chat)}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 active:bg-cyan-500/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="size-10 sm:size-12 rounded-full overflow-hidden">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-slate-800 ${
                    isOnline ? "bg-green-500" : "bg-slate-400"
                  }`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="text-slate-200 font-medium truncate text-sm sm:text-base">
                  {chat.fullName}
                </h4>
                {chat.lastMessage && (
                  <p className="text-xs text-slate-400 truncate mt-1">
                    {chat.lastMessage.text || "Sent an image"}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatsList;