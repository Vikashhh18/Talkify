import { useChatStore } from "../stores/useChatStore";
import { MessageSquare, User } from "lucide-react";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex gap-2 p-1.5 bg-slate-700/50 rounded-xl">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex items-center justify-center gap-2 sm:gap-3 flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
          activeTab === "chats"
            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow"
            : "text-slate-400 hover:text-white hover:bg-slate-600/50"
        }`}
      >
        <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Chats</span>
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex items-center justify-center gap-2 sm:gap-3 flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
          activeTab === "contacts"
            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow"
            : "text-slate-400 hover:text-white hover:bg-slate-600/50"
        }`}
      >
        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span>Contacts</span>
      </button>
    </div>
  );
}

export default ActiveTabSwitch;