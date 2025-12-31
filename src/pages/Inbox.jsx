import { useState, useEffect } from "react";
import { chats as mockChats } from "../data/chats";
import ChatListItem from "../components/ChatListItem";
import ChatWindow from "../components/ChatWindow";
import NewChat from "../pages/NewChat";
import CheckAuth from "../components/CheckAuth";
import { useNavigate, useParams } from "react-router-dom";

export default function Inbox() {
  const nav = useNavigate();
  const { id } = useParams();

  const loadChats = () => {
    const saved = localStorage.getItem("chats");
    return saved ? JSON.parse(saved) : mockChats;
  };

  const [chats, setChats] = useState(loadChats);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const selectedChat =
    id && id !== "new" ? chats.find((c) => c.id === Number(id)) : null;

  const handleCreateChat = (userId, firstMessage) => {
    const newChat = {
      id: Date.now(),
      name: userId,
      username: userId,
      unread: 0,
      lastMessage: firstMessage,
      time: "Now",
      messages: [
        {
          fromMe: true,
          text: firstMessage,
          time: "Now",
        },
      ],
    };

    setChats((prev) => [newChat, ...prev]);
    nav(`/chat/${newChat.id}`);
  };

  const handleSendMessage = (chatId, text) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { fromMe: true, text, time: "Now" },
              ],
              lastMessage: text,
              time: "Now",
            }
          : chat
      )
    );
  };

  return (
    <div className="relative flex h-screen bg-bg-dark text-white overflow-hidden">
      <CheckAuth />

      <aside
        className={`
          relative
          bg-bg-dark border-r border-white/10
          md:w-1/3 w-full
          ${id ? "hidden md:block" : "block"}
        `}
      >
        <div className="p-4 h-16 border-b border-white/10">
          <h1 className="text-2xl font-bold">Chats</h1>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-64px)] px-3 py-4">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              onClick={() => nav(`/chat/${chat.id}`)}
              isActive={Number(id) === chat.id}
            />
          ))}
        </div>
          <button
            onClick={() => nav("/chat/new")}
            className="
              absolute
              bottom-6
              left-6
              w-14
              h-14
              rounded-full
              bg-primary
              flex
              items-center
              justify-center
              shadow-xl
              hover:scale-105
              transition
              z-40
            "
          >
            <span className="material-symbols-outlined text-white text-2xl">
              edit
            </span>
          </button>
      </aside>

      <main
        className={`
          flex-1 flex flex-col
          ${id ? "flex" : "hidden md:flex"}
        `}
      >
        {id === "new" ? (
          <NewChat onCreateChat={handleCreateChat} />
        ) : selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            onSendMessage={handleSendMessage}
            onBack={() => nav("/inbox")}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat
          </div>
        )}
      </main>
    </div>
  );
}