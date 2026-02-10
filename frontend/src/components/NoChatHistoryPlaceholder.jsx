import React from 'react';
import { MessageSquare } from 'lucide-react';

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="text-center py-12 sm:py-16 px-4">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-500" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
        Start a conversation with {name}
      </h3>
      <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
        Send your first message to begin chatting.
      </p>
    </div>
  );
};

export default NoChatHistoryPlaceholder;