import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../stores/useChatStore';
import { useAuthStore } from '../stores/useAuthStore';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';
import { Check, CheckCheck } from 'lucide-react';

const ChatContainer = () => {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

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
    return new Date(date).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      {/* Fixed Header */}
      <div className="shrink-0">
        <ChatHeader />
      </div>
      
      {/* Scrollable Messages Area */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
      >
        <div className="px-4 py-6 max-w-3xl mx-auto min-h-full">
          {messages.length > 0 && !isMessagesLoading ? (
            <div className="space-y-3">
              {messages.map((msg, index) => {
                const isOwnMessage = msg.senderId === authUser._id;
                const showDateSeparator = index === 0 || 
                  new Date(msg.createdAt).toDateString() !== 
                  new Date(messages[index - 1].createdAt).toDateString();

                return (
                  <React.Fragment key={msg._id}>
                    {showDateSeparator && (
                      <div className="flex items-center justify-center my-6">
                        <span className="px-3 py-1 text-xs font-medium bg-slate-800/50 text-slate-400 rounded-full">
                          {new Date(msg.createdAt).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${isOwnMessage ? 'ml-auto' : 'mr-auto'}`}>
                        <div className={`relative group ${isOwnMessage ? 'pl-8' : 'pr-8'}`}>
                          {/* Message bubble */}
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-lg ${
                              isOwnMessage
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-tr-none'
                                : 'bg-slate-800/80 text-slate-200 rounded-tl-none border border-slate-700/50'
                            }`}
                          >
                            {/* Message content */}
                            {msg.image && (
                              <div className="mb-3 overflow-hidden rounded-xl border border-slate-700/50">
                                <img 
                                  src={msg.image} 
                                  alt="Shared" 
                                  className="w-full h-56 object-cover hover:scale-[1.02] transition-transform duration-300" 
                                />
                              </div>
                            )}
                            
                            {msg.text && (
                              <p className={`whitespace-pre-wrap break-words ${msg.image ? 'mt-2' : ''}`}>
                                {msg.text}
                              </p>
                            )}
                            
                            {/* Timestamp and status */}
                            <div className={`flex items-center justify-end mt-2 gap-1 ${
                              isOwnMessage ? 'text-cyan-100/80' : 'text-slate-400'
                            }`}>
                              <span className="text-xs font-medium">
                                {formatTime(msg.createdAt)}
                              </span>
                              
                              {isOwnMessage && (
                                <span className="ml-1">
                                  {msg.read ? (
                                    <CheckCheck className="w-3.5 h-3.5" />
                                  ) : (
                                    <Check className="w-3.5 h-3.5" />
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* User avatar for received messages */}
                          {!isOwnMessage && (
                            <div className="absolute -left-10 bottom-0">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center ring-2 ring-slate-800">
                                <span className="text-xs font-semibold text-slate-300">
                                  {selectedUser?.fullName?.charAt(0) || 'U'}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messageEndRef} className="h-4" />
            </div>
          ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser?.fullName} />
          )}
        </div>
      </div>

      {/* Fixed Input Area at Bottom */}
      <div className="shrink-0 relative">
        {/* Gradient overlay at top of input area */}
        <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        <MessageInput />
      </div>
    </div>
  )
}

export default ChatContainer