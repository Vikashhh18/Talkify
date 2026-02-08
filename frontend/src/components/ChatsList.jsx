import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound.";
import { useAuthStore } from "../stores/useAuthStore";

const ChatsList = () => {
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
            onClick={() => setSelectedUser(chat)}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="size-12 rounded-full overflow-hidden">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Green Dot */}
                {isOnline && (
                  // <span className="absolute top-0 right-0 size-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
<span className="absolute top-1 right-0.5 size-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>

                  // <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                )}
              </div>

              <h4 className="text-slate-200 font-medium truncate">
                {chat.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatsList;
