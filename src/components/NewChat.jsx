import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewChatService from "../services/newChatService";

export default function NewChat({ onCreated }) {
  const nav = useNavigate();

  const [Username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = Username.trim();

  const handleNext = async () => {
    if (!canSubmit || loading) return;

    try {
      setLoading(true);

      const conversation = await NewChatService.createConversation(
        Username
      );

      if (onCreated) {
        await onCreated();
      }

      nav(`/chat/${conversation.id}`);
    } catch (err) {
      alert(err.message || "Failed to create chat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full bg-bg-dark text-white">
      <div className="flex items-center p-4 border-b border-white/10 justify-between w-full">
        <button
          className="md:hidden text-primary"
          onClick={() => nav("/inbox")}
        >
          <span className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>

        <h2 className="text-lg font-bold flex-1 text-center">
          New Message
        </h2>

        <button
          onClick={handleNext}
          disabled={!canSubmit}
          className={`font-bold ${
            canSubmit ? "text-primary" : "text-primary/40"
          }`}
        >
          Next
        </button>
      </div>

      <div className="px-4 py-3 border-b border-white/10 w-full">
        <div className="flex items-center gap-2 w-full">
          <p className="text-white shrink-0">To:</p>
          <input
            className="flex-1 w-full bg-transparent outline-none text-white placeholder-gray-400"
            placeholder="Enter user ID"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNext()}
          />
        </div>
      </div>

      <div className="flex-1 w-full" />
    </div>
  );
}