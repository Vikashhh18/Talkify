import React from 'react';
import { MessageSquare } from 'lucide-react';

const NoConversationPlaceholder = () => {
  return (
    <div className="text-center p-6 sm:p-8">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
        <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-500" />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">
        Welcome to Chatify
      </h3>
      <p className="text-slate-400 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
        Select a conversation from your chats to begin messaging.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;