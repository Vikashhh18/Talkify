import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import { Clock, Check, CheckCheck, MessageSquare } from "lucide-react";

const ChatsList = () => {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-3.5 sm:h-4 bg-slate-700 rounded animate-pulse mb-2 w-3/4" />
              <div className="h-2.5 sm:h-3 bg-slate-700/50 rounded animate-pulse w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
        </div>
        <h3 className="text-slate-300 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">No conversations yet</h3>
        <p className="text-slate-500 text-xs sm:text-sm">Start by messaging a contact</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="px-3 py-2">
        <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Recent Conversations
        </h3>
      </div>
      
      {chats.map((chat) => {
        const isOnline = onlineUsers.includes(chat._id) && chat._id !== authUser._id;
        const lastMessageTime = chat.lastMessage?.createdAt 
          ? new Date(chat.lastMessage.createdAt).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            }).toLowerCase()
          : null;
        
        const isUnread = chat.unreadCount > 0;
        const isLastMessageFromMe = chat.lastMessage?.senderId === authUser._id;

        return (
          <button
            key={chat._id}
            onClick={() => setSelectedUser(chat)}
            className={`w-full text-left p-3 sm:p-4 rounded-xl transition-all duration-200 group hover:bg-slate-700/50 active:bg-slate-700/70 border border-transparent hover:border-slate-600 ${
              isUnread ? 'bg-slate-700/30 hover:bg-slate-700/50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-700">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-slate-800 ${
                  isOnline ? "bg-emerald-500" : "bg-slate-500"
                }`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-medium truncate text-sm sm:text-base ${
                    isUnread ? 'text-white' : 'text-slate-200'
                  }`}>
                    {chat.fullName}
                  </h4>
                  {lastMessageTime && (
                    <span className="text-xs text-slate-500 flex items-center gap-1 flex-shrink-0 ml-2">
                      <Clock className="w-3 h-3" />
                      {lastMessageTime}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  {isLastMessageFromMe && chat.lastMessage && (
                    <div className="flex-shrink-0">
                      {chat.lastMessage?.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                      ) : (
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                      )}
                    </div>
                  )}
                  
                  {chat.lastMessage && (
                    <p className={`text-xs sm:text-sm truncate ${
                      isUnread ? 'text-white font-medium' : 'text-slate-400'
                    }`}>
                      {chat.lastMessage.text || "📷 Photo"}
                    </p>
                  )}
                </div>
                
                {isUnread && (
                  <div className="mt-2">
                    <div className="inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-semibold rounded-full">
                      {chat.unreadCount}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ChatsList;