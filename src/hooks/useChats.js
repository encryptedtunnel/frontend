import { useEffect, useState, useRef, useCallback } from "react";
import chatService from "../services/chatService";

export const useChats = (conversationId, myId, encrypt, decrypt, ready) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const socketRef = useRef(null);
  // Fetch messages from API
  const fetchMessages = useCallback(async () => {
    try {
      if (!conversationId) return;
      if (!ready) return;
      setLoading(true);
      const data = await chatService.listMessages(conversationId);

      const decryptedMessages = await Promise.all(
        data.map(async (msg) => {
          const cipher = JSON.parse(msg.content);
          const plaintext = await decrypt(cipher);
          return { ...msg, content: plaintext };
        })
      );
      setMessages(decryptedMessages);
    } catch (err) {
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [conversationId, ready]);

  // Connect WebSocket
  useEffect(() => {
    if (!conversationId || !myId || !ready) return;
    socketRef.current = new WebSocket(
      `${import.meta.env.VITE_API_BASE_URL_WS}/chat/ws/${conversationId}/${myId}`
    );

    socketRef.current.onmessage = async (event) => {
      const newMessage = JSON.parse(event.data);
      console.log(JSON.parse(newMessage.content))
      const plaintext = await decrypt(JSON.parse(newMessage.content));
      setMessages((prev) => [...prev, {...newMessage, content: plaintext}]);
    };

    socketRef.current.onopen = () => console.log("WebSocket connected");
    socketRef.current.onerror = (err) => console.error("WebSocket error", err);
    socketRef.current.onclose = () => console.log("WebSocket closed");

    return () => socketRef.current?.close();
  }, [conversationId, myId, ready]);

  const sendMessage = async (content) => {
    if (!content.trim()) return;
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const cipher = await encrypt(content);
      socketRef.current.send(JSON.stringify(cipher));
    }
  };
  // Fetch initial messages once
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages, ready]);

  return { messages, loading, error, sendMessage, refetch: fetchMessages };
};
