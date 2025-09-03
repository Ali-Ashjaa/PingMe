import { useChatStore } from "../store/useChatStore.js"
import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();


  const isOnline = Array.isArray(onlineUsers) && selectedUser
    ? onlineUsers.includes(selectedUser._id)
    : false

  return (
    <div className="p-2.5 max-h-full">
      <div>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-base-300 p-3 text-sm font-medium shadow-sm transition-colors">
          <img
            src={selectedUser?.profilePic || "./avatar.png"}
            alt={selectedUser?.fullName || "User"}
            className="size-10"
          />

          <span>{selectedUser?.fullName || "Unknown User"}</span>

          <p className="flex items-center">
            {Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id)
              ? "Online"
              : "Offline"}
            <button className="pl-3" onClick={() => setSelectedUser(null)}>
              <X />
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
