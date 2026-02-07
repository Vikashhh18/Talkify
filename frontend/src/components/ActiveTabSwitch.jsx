import { useChatStore } from "../stores/useChatStore";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex gap-2 p-2 m-2 bg-slate-800/40 rounded-lg">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all
          ${
            activeTab === "chats"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-slate-400 hover:bg-slate-700/40"
          }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all
          ${
            activeTab === "contacts"
              ? "bg-cyan-500/20 text-cyan-400"
              : "text-slate-400 hover:bg-slate-700/40"
          }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;
