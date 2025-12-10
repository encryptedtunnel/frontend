import { useState, useEffect } from "react";
import { chats as mockChats } from "../data/chats";
import ChatListItem from "../components/ChatListItem";
import ChatWindow from "../components/ChatWindow";
import { useNavigate, useParams } from "react-router-dom";

export default function Inbox() {
  const nav = useNavigate();
  const params = useParams();
  const chatId = params.id ? Number(params.id) : null;

  const loadChats = () => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : mockChats;
  };

  const [chats, setChats] = useState(loadChats);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const selectedChat = chats.find((c) => c.id === chatId) || null;

  const handleSendMessage = (id, text) => {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== id) return chat;

        const updatedMessages = [
          ...chat.messages,
          {
            fromMe: true,
            text,
            time: "Now",
          },
        ];

        return {
          ...chat,
          messages: updatedMessages,
          lastMessage: text,
          time: "Now",
        };
      })
    );
  };

  const handleSelectChat = (chat) => {
    nav(`/chat/${chat.id}`);
  };

  const handleBack = () => {
    nav("/inbox");
  };

  console.log("Chats:",chats);

  return (
    <div className="flex h-screen bg-bg-dark text-white">

      <aside
        className={`
          bg-bg-dark border-r border-white/10
          md:w-1/3 w-full
          ${chatId ? "hidden md:block" : "block"}
        `}
      >

        <div className="p-4 h-16 border-b border-white/10">
          <h1 className="text-2xl font-bold">Chats</h1>
        </div>

        <div className="overflow-y-auto space-y-2 h-[calc(100vh-72px)] px-3 py-4">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isActive={selectedChat?.id === chat.id}
              onClick={() => handleSelectChat(chat)}
            />
          ))}
        </div>
      </aside>


      <main
        className={`
          flex-1 flex flex-col h-full w-full
          ${selectedChat ? "flex md:flex" : "hidden md:flex"}
        `}
      >
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <div className="flex items-center justify-center w-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </main>
    </div>
  );
}