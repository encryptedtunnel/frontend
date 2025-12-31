import { useState } from "react";

export default function NewChat({ onCreateChat }) {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const handleNext = () => {
    if (!userId.trim() || !message.trim()) return;
    onCreateChat(userId.trim(), message.trim());
  };

  return (
    <div className="flex flex-col h-full bg-bg-dark text-white">
      
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-bold">New Message</h2>
        <button
          onClick={handleNext}
          className="text-primary font-semibold"
        >
          Next
        </button>
      </div>

      <div className="p-4 border-b border-white/10">
        <input
          className="w-full bg-transparent outline-none text-white"
          placeholder="Enter user ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <div className="flex-1" />

      <footer className="sticky bottom-0 w-full bg-bg-dark border-t border-white/10 px-3 py-2">
  <div className="flex items-center gap-2">

    <input
      className="
        flex-1
        rounded-full
        px-4
        py-2
        bg-white/10
        text-white
        outline-none
        focus:ring-2
        focus:ring-primary
      "
      placeholder="Type first message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
    />

    <button
      onClick={handleNext}
      className="
        w-11
        h-11
        min-w-[44px]
        rounded-full
        bg-primary
        flex
        items-center
        justify-center
      "
    >
      <span className="material-symbols-outlined text-white">
        send
      </span>
    </button>

  </div>
</footer>
    </div>
  );
}