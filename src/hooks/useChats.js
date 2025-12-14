import { useEffect, useState, useRef, useCallback } from "react";
import chatService from "../services/chatService";

export const useChats = (conversationId, myId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  // Fetch messages from API 
  const fetchMessages = useCallback(async () => {
    try {
      if (!conversationId) return; 
      setLoading(true);
      const data = await chatService.listMessages(conversationId);
      setMessages(data);
    } catch (err) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  // Connect WebSocket
  useEffect(() => {
    if (!conversationId || !myId) return;

    socketRef.current = new WebSocket(
      `ws://127.0.0.1:8000/chat/ws/${conversationId}/${myId}`
    );

    socketRef.current.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      setMessages((prev) => [...prev, newMessage]);
    };

    socketRef.current.onopen = () => console.log("WebSocket connected");
    socketRef.current.onerror = (err) => console.error("WebSocket error", err);
    socketRef.current.onclose = () => console.log("WebSocket closed");

    return () => socketRef.current?.close();
  }, [conversationId, myId]);

  const sendMessage = (content) => {
    if (!content.trim()) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(content);
    }
  };

  // Fetch initial messages once
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, sendMessage, refetch: fetchMessages };
};
