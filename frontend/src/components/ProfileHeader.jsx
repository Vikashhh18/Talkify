import React, { useRef, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, onlineUsers } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const fileInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!authUser) return null;

  const isOnline = onlineUsers.includes(authUser._id);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        setIsUploading(true);
        const base64Image = reader.result;
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
        toast.success("Profile updated");
      } catch {
        toast.error("Failed to update profile");
      } finally {
        setIsUploading(false);
      }
    };
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* PROFILE PIC WITH GREEN DOT */}
          <div className="relative w-14 h-14">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />

            {/* ✅ GREEN DOT */}
            <span
              className={`absolute top-1 right-0.5 size-3 rounded-full border-2 border-slate-900 ${
                isOnline ? "bg-green-500" : "bg-gray-500"
              }`}
            />
            
            {/* CLICK OVERLAY */}
            <button
              disabled={isUploading}
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-xs text-white transition"
            >
              {isUploading ? "Uploading..." : "Change"}
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <div>
            <h3 className="text-slate-200 font-medium text-base truncate">
              {authUser.fullName}
            </h3>
            <p className={`text-xs ${isOnline ? "text-green-400" : "text-slate-400"}`}>
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4 items-center">
          <button onClick={logout} className="text-slate-400 hover:text-slate-200">
            <LogOutIcon className="size-5" />
          </button>

          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
            className="text-slate-400 hover:text-slate-200"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
