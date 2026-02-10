import React, { useRef, useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useChatStore } from "../stores/useChatStore";
import { LogOut, Volume2, VolumeX, Camera } from "lucide-react";
import toast from "react-hot-toast";

const ProfileHeader = () => {
  const { logout, authUser, updateProfile, onlineUsers } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const fileInputRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!authUser) return null;

  const isOnline = onlineUsers.includes(authUser._id);

  // 🧹 cleanup blob URL
  useEffect(() => {
    return () => {
      if (selectedImg?.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImg);
      }
    };
  }, [selectedImg]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // ⚡ instant preview
    const previewUrl = URL.createObjectURL(file);
    setSelectedImg(previewUrl);

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("profilePic", file);

      await updateProfile(formData);
      // toast.success("Profile updated");
    } catch (err) {
      toast.error("Failed to update profile");
      setSelectedImg(null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4">
      <div className="flex items-center justify-between">
        {/* LEFT SECTION - User Info */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Profile Picture Container */}
          <div className="relative group">
            {/* Main Avatar */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-3 sm:border-4 border-slate-700 shadow-lg overflow-hidden">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="User"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isUploading ? "blur-sm opacity-60" : ""
                }`}
              />
            </div>

            {/* Online Status Indicator */}
            <div className={`absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-slate-800 z-20 ${
              isOnline ? "bg-emerald-500" : "bg-slate-500"
            }`} />

            {/* Upload Overlay */}
            <button
              disabled={isUploading}
              onClick={() => fileInputRef.current.click()}
              className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            >
              {isUploading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              )}
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Text Info */}
          <div>
            <h2 className="text-sm sm:text-lg font-semibold text-white truncate max-w-[120px] sm:max-w-none">
              {authUser.fullName}
            </h2>
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

        {/* RIGHT SECTION - Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              if (isSoundEnabled) {
                toggleSound();
              } else {
                toggleSound();
              }
            }}
            className="p-2 sm:p-2.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 transition-all duration-200"
            title={isSoundEnabled ? "Mute sounds" : "Unmute sounds"}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
            ) : (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 sm:p-2.5 rounded-lg bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 border border-slate-600 transition-all duration-200 group"
            title="Logout"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;