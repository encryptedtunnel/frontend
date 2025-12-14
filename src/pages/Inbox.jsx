import { useState, useEffect } from "react";
import ChatWindow from "../components/ChatWindow";
import SideBar from "../components/SideBar";

export default function Inbox() {
  const [activeChat, setActiveChat] = useState("")


  return <div className="flex h-screen bg-bg-dark text-white">
    <SideBar activeChat={activeChat} setActiveChat={setActiveChat} />
    <ChatWindow conversation={activeChat} setConversationId={setActiveChat}/>
  </div>
}
