import ActiveTabSwitch from "../components/ActiveTabSwitch";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ChatContainer from "../components/ChatContainer";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import ProfileHeader from "../components/ProfileHeader";
import { useChatStore } from "../stores/useChatStore";
// import { useChatStore } from "../store/useChatStore";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-6xl h-[800px]">
        <BorderAnimatedContainer>
          {/* MAIN WRAPPER */}
          <div className="flex h-full rounded-2xl overflow-hidden">

            {/* LEFT SIDEBAR */}
            <aside className="w-80 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/40 flex flex-col">
              {/* PROFILE */}
              <ProfileHeader />

              {/* TABS */}
              <ActiveTabSwitch />

              {/* LIST */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-slate-700">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </aside>

            {/* CHAT AREA */}
            <main className="flex-1 bg-slate-900/60 backdrop-blur-xl flex flex-col">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </main>

          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default ChatPage;
