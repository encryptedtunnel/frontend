import { useState, useRef, useEffect } from "react";
import { useChats } from "../hooks/useChats";
import authService from "../services/authService";
import useEncryption from "../hooks/useEncryption";
import NewChat from "./NewChat";

const ChatWindow = ({ conversation, setConversation }) => {
    if (!conversation) {
        return <NewChat setConversation={setConversation} />
    }


    const [message, setMessage] = useState("");
    const myId = authService.meo()["sub"];
    const bottomRef = useRef(null);

    const { encrypt, decrypt, ready } = useEncryption(conversation.participant_username)
    const { messages, loading, error, sendMessage } = useChats(conversation.id, myId, encrypt, decrypt, ready);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        await sendMessage(message);
        setMessage("");
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <main className={`flex-1 flex flex-col ${conversation ? "flex" : "hidden md:flex"}`}>
            <div className="flex flex-col h-full w-full bg-bg-dark text-white overflow-x-hidden">
                <header className="h-16 flex items-center gap-3 px-4 py-4 border-b border-white/10 bg-bg-dark sticky top-0 z-10 w-full">
                    <button className="text-primary py-3 flex items-center gap-1" onClick={() => setConversation()}>
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                        <span>Back</span>
                    </button>
                    <h1 className="text-xl font-bold truncate">{conversation.participant_display_name}</h1>
                </header>

                <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex w-full ${msg.sender_id === myId ? "justify-end" : "justify-start"}`}>
                            <div className="flex flex-col max-w-[75%]">
                                <p className={`px-4 py-3 rounded-xl text-sm ${msg.sender_id === myId ? "bg-primary text-white" : "bg-white/10 text-white"}`}>
                                    {msg.content}
                                </p>
                                <span className="text-xs text-gray-400 mt-1">{msg.created_at}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </main>

                <footer className="p-3 border-t border-white/10 bg-bg-dark flex items-center gap-2 sticky bottom-0 w-full">
                    <input
                        className="flex-1 rounded-full px-4 py-2 bg-white/10 text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-primary"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <button onClick={handleSend} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">send</span>
                    </button>
                </footer>
            </div>

        </main>
    );
};

export default ChatWindow;