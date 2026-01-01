import React from 'react'
import { useConversations } from "../hooks/useConversations";
import ChatListItem from "../components/ChatListItem";

const SideBar = ({activeChat, setActiveChat}) => {
    const { conversations, error, loading } = useConversations()
    
    return <aside
        className={`
          bg-bg-dark border-r border-white/10
          md:w-1/3 w-full
          ${activeChat ? "hidden md:block" : "block"}
        `}
    >
        <header className="p-4 h-16 border-b border-white/10">
            <h1 className="text-2xl font-bold">Chats</h1>
        </header>

        <div className="overflow-y-auto space-y-2 h-[calc(100vh-72px)] px-3 py-4">
            {conversations.map((c) => (
                <ChatListItem
                    key={c.id}
                    chat={c}
                    isActive={activeChat && activeChat.id === c.id}
                    onClick={() => setActiveChat(c)}
                />
            ))}
        </div>
    </aside>


}
export default SideBar  