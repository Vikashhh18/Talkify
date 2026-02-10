import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../stores/useChatStore";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="h-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="h-full bg-slate-800 rounded-xl sm:rounded-2xl shadow-xl border border-slate-700 overflow-hidden">
          <div className="h-full flex">
            {/* LEFT SIDEBAR */}
            <div className={`
              ${selectedUser ? 'hidden lg:flex' : 'flex'} 
              w-full lg:w-96 
              flex-col 
              border-r border-slate-700
              bg-gradient-to-b from-slate-800 to-slate-900
            `}>
              {/* Profile Header */}
              <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4">
                <ProfileHeader />
              </div>
              
              {/* Active Tabs */}
              <div className="px-4 sm:px-6 pb-2">
                <ActiveTabSwitch />
              </div>
              
              {/* Divider */}
              <div className="px-4 sm:px-6 pt-2">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
              </div>
              
              {/* Scrollable List */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 custom-scrollbar">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* CHAT AREA */}
            <div className={`
              ${!selectedUser ? 'hidden lg:flex' : 'flex'} 
              flex-1 
              flex-col
              bg-gradient-to-b from-slate-800 to-slate-900
            `}>
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
                  <NoConversationPlaceholder />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile back button removed (now handled inside chat header) */}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ChatPage;