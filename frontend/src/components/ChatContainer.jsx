import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/useChatStore';
import { useAuthStore } from '../stores/useAuthStore';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';
import { Check, CheckCheck, ArrowLeft } from 'lucide-react';

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    setSelectedUser
  } = useChatStore();
  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser) return;
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const handleBackToChats = () => {
    setSelectedUser(null);
  };

  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  if (!selectedUser) {
    return (
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <NoChatHistoryPlaceholder name="someone" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-700 bg-slate-800/90">
        <div className="flex items-center justify-between">
          {/* Left: Back Button + User Info */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            {/* Mobile Back Button */}
            <button
              onClick={handleBackToChats}
              className="lg:hidden flex-shrink-0 p-2 rounded-lg hover:bg-slate-700/50 active:bg-slate-700 transition-colors duration-200"
              aria-label="Back to chats"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            </button>

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-700">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-slate-800 ${
                isOnline ? 'bg-emerald-500' : 'bg-slate-500'
              }`} />
            </div>

            {/* User Info */}
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-white truncate">
                {selectedUser.fullName}
              </h2>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isOnline ? 'bg-emerald-500' : 'bg-slate-500'
                }`} />
                <p className="text-xs sm:text-sm text-slate-400">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-4xl mx-auto">
            {/* Messages */}
            {messages.map((msg) => {
              const isOwnMessage = msg.senderId === authUser._id;
              
              return (
                <div 
                  key={msg._id} 
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-3 last:mb-0`}
                >
                  <div className={`max-w-[85%] sm:max-w-[75%] ${isOwnMessage ? 'ml-auto' : 'mr-auto'}`}>
                    {/* Message bubble */}
                    <div className={`
                      relative px-4 py-3 rounded-2xl
                      ${isOwnMessage 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-md' 
                        : 'bg-slate-700/80 text-slate-100 rounded-bl-md'
                      }
                    `}>
                      {/* Image attachment */}
                      {msg.image && (
                        <div className="mb-3 overflow-hidden rounded-lg border border-slate-600/50">
                          <img 
                            src={msg.image} 
                            alt="Shared" 
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Text content */}
                      {msg.text && (
                        <p className="whitespace-pre-wrap break-words text-sm sm:text-[15px] leading-relaxed">
                          {msg.text}
                        </p>
                      )}
                      
                      {/* Message footer */}
                      <div className={`flex items-center justify-end gap-2 mt-2 ${
                        isOwnMessage ? '' : 'justify-start'
                      }`}>
                        <span className={`text-xs ${
                          isOwnMessage ? 'text-cyan-100/80' : 'text-slate-400'
                        }`}>
                          {formatTime(msg.createdAt)}
                        </span>
                        {isOwnMessage && (
                          <span className={isOwnMessage ? 'text-cyan-100/80' : 'text-slate-400'}>
                            {msg.read ? (
                              <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            ) : (
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} className="h-4 sm:h-8" />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      {/* Fixed Input */}
      <div className="shrink-0 px-3 sm:px-4 md:px-6 py-3 sm:py-4 border-t border-slate-700 bg-slate-800/50">
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatContainer;