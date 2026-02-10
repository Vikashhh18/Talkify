import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../stores/useChatStore";

function MessageInput() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);

  const { sendMessage } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    sendMessage({
      text: text.trim(),
      image: imagePreview,
    });

    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // focus back on input
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 0);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.onerror = () => toast.error("Failed to load image");
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-full">
      {/* Image Preview */}
      {imagePreview && (
        <div className="max-w-4xl mx-auto mb-3 px-3 sm:px-4">
          <div className="relative inline-block">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-slate-600">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 hover:bg-slate-600 border border-slate-600 transition"
              aria-label="Remove image"
            >
              <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="w-full max-w-4xl mx-auto px-3 sm:px-4"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Image Upload */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-2.5 sm:p-3 rounded-lg border transition ${
              imagePreview
                ? "bg-cyan-600/20 border-cyan-500/30 text-cyan-400"
                : "bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600"
            }`}
          >
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Text Input */}
          <input
            ref={textInputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />

          {/* Send */}
          <button
            type="submit"
            disabled={!text.trim() && !imagePreview}
            className={`p-3 rounded-xl transition ${
              text.trim() || imagePreview
                ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default MessageInput;
