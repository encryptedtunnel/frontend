import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="flex items-center gap-2 p-2 border-t border-white/10 bg-bg-dark">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 rounded-full bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
        placeholder="Type a message..."
      />

      <button
        onClick={handleSend}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
        aria-label="Send"
      >
        <span className="material-symbols-outlined text-2xl">send</span>
      </button>
    </div>
  );
}