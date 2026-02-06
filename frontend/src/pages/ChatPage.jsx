import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      chat page
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ChatPage