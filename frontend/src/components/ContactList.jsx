import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import { MessageCircle, Users } from "lucide-react";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-3.5 sm:h-4 bg-slate-700 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Contacts ({allContacts.length})
          </h3>
        </div>
      </div>
      
      {allContacts.map((contact) => {
        const isOnline = onlineUsers.includes(contact._id) && contact._id !== authUser?._id;

        return (
          <button
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className="w-full text-left p-3 sm:p-4 rounded-xl hover:bg-slate-700/50 active:bg-slate-700/70 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-700">
                    <img
                      src={contact.profilePic || "/avatar.png"}
                      alt={contact.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border-2 border-slate-800 ${
                    isOnline ? "bg-emerald-500" : "bg-slate-500"
                  }`} />
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-medium text-white text-sm sm:text-base">
                    {contact.fullName}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      isOnline ? "bg-emerald-500" : "bg-slate-500"
                    }`} />
                    <span className="text-xs sm:text-sm text-slate-400">
                      {isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(contact);
                }}
                className="p-2 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 hover:border-cyan-500/30 border border-slate-600 transition-all hover:scale-110 group"
                title="Start chat"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </button>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ContactList;