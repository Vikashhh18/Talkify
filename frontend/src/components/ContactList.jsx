import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import { useAuthStore } from "../stores/useAuthStore";
import { MessageCircle, Users } from "lucide-react";

const ContactList = () => {
  const {
    getAllContacts,
    allContacts,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-10 h-10 bg-slate-700 rounded-full animate-pulse" />
            <div className="flex-1 h-4 bg-slate-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="px-3 py-2 flex items-center gap-2">
        <Users className="w-4 h-4 text-slate-500" />
        <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Contacts ({allContacts.length})
        </h3>
      </div>

      {allContacts.map((contact) => {
        const isOnline =
          onlineUsers.includes(contact._id) &&
          contact._id !== authUser?._id;

        return (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className="w-full cursor-pointer p-3 sm:p-4 rounded-xl hover:bg-slate-700/50 active:bg-slate-700/70 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-slate-700">
                    <img
                      src={contact.profilePic || "/avatar.png"}
                      alt={contact.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                      isOnline ? "bg-emerald-500" : "bg-slate-500"
                    }`}
                  />
                </div>

                {/* Info */}
                <div>
                  <h4 className="font-medium text-white text-sm sm:text-base">
                    {contact.fullName}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {isOnline ? "Online" : "Offline"}
                  </span>
                </div>
              </div>

              {/* RIGHT ICON (NOT A BUTTON ❗) */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(contact);
                }}
                className="p-2 rounded-lg bg-slate-700 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 border border-slate-600 transition-all hover:scale-110"
                title="Start chat"
              >
                <MessageCircle className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
