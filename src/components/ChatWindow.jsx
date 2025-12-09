import { useState, useEffect, useRef } from "react";

export default function ChatWindow({ chat, onBack, onSendMessage }) {
  const [message, setMessage] = useState("");

  const messages = chat.messages;

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(chat.id, message);
    setMessage("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-bg-dark text-white overflow-x-hidden">

      <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-bg-dark sticky top-0 z-10 w-full">
        <button className="md:hidden text-primary flex items-center gap-1" onClick={onBack}>
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
          <span>Back</span>
        </button>
        <h1 className="text-lg font-bold truncate">{chat.name}</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex w-full ${msg.fromMe ? "justify-end" : "justify-start"}`}>
            <div className="flex flex-col max-w-[75%] break-words">
              <p className={`px-4 py-3 rounded-xl text-sm ${
                msg.fromMe ? "bg-primary text-white rounded-br-sm" : "bg-white/10 text-white rounded-bl-sm"
              }`}>
                {msg.text}
              </p>
              <span className="text-xs text-gray-400 mt-1">{msg.time}</span>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </main>

      <footer className="p-3 border-t border-white/10 bg-bg-dark flex items-center gap-2 sticky bottom-0 w-full">
        <input
          className="flex-1 rounded-full px-4 py-2 bg-white/10 text-white outline-none 
                     focus:ring-2 focus:ring-primary placeholder-gray-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl">send</span>
        </button>
      </footer>
    </div>
  );
}