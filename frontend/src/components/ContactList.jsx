import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../stores/useAuthStore";

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

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <div className="space-y-2">
      {allContacts.map((contact) => {
        const isOnline =
          onlineUsers.includes(contact._id) &&
          contact._id !== authUser?._id;

        return (
          <div
            key={contact._id}
            onClick={() => setSelectedUser(contact)}
            className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* PROFILE PIC + GREEN DOT */}
             <div className="relative w-12 h-12">
  <img
    src={contact.profilePic || "/avatar.png"}
    alt={contact.fullName}
    className="w-full h-full rounded-full object-cover"
  />

  <span
    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full 
      border-2 border-slate-800
      ${isOnline ? "bg-green-500" : "bg-slate-400"}`}
  />
</div>

              <h4 className="text-slate-200 font-medium">
                {contact.fullName}
              </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
