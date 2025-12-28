import { useState, useEffect } from "react";
import { chats as mockChats } from "../data/chats";
import ChatListItem from "../components/ChatListItem";
import ChatWindow from "../components/ChatWindow";
import NewChat from "../pages/NewChat";
import { useNavigate, useParams } from "react-router-dom";

export default function Inbox() {
  const nav = useNavigate();
  const { id } = useParams();

  const chatId = id === "new" ? "new" : id ? Number(id) : null;

  const [chats, setChats] = useState(mockChats);

  const selectedChat =
    chatId && chatId !== "new"
      ? chats.find((c) => c.id === chatId)
      : null;

  const handleSelectChat = (chat) => {
    nav(`/chat/${chat.id}`);
  };

  const handleBack = () => {
    nav("/inbox");
  };

  return (
    <div className="flex h-screen w-full overflow-x-hidden bg-bg-dark text-white">

      <aside
        className={`
          relative
          bg-bg-dark border-r border-white/10
          md:w-1/3 w-full
          shrink-0
          ${chatId ? "hidden md:block" : "block"}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h1 className="text-2xl font-bold">Chats</h1>

          <button
            onClick={() => nav("/chat/new")}
            className="
              fixed
              bottom-6
              left-6
              z-50
              w-14 h-14
              rounded-full
              bg-primary
              text-white
              flex items-center justify-center
              shadow-lg
              md:absolute md:bottom-6 md:left-6
  "
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-72px)] px-3 py-4 space-y-1">
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
          flex-1
          min-w-0
          flex flex-col
          h-full
          overflow-x-hidden
          ${chatId ? "flex" : "hidden md:flex"}
        `}
      >
        {chatId === "new" ? (
          <NewChat onBack={handleBack} />
        ) : selectedChat ? (
          <ChatWindow chat={selectedChat} onBack={handleBack} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </main>
    </div>
  );
}