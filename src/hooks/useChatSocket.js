// src/hooks/useChatSocket.js
import { useEffect, useRef, useState } from "react";

export const useChatSocket = (conversationId, myId, chat) => {
  const [chats, setChats] = chat
  const socketRef = useRef(null);

  useEffect(() => {
    if (!conversationId || !myId) return;

    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/chat/ws/${conversationId}/${myId}`
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setChats((prev) => [...prev, data]);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [conversationId, myId]);

  const sendMessage = (message) => {
    if (!message.trim()) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      setChats((prev) => [
        ...prev,
        { sender_id: myId, content: message, time: new Date().toISOString() },
      ]);
    }
  };

  return { sendMessage };
};
