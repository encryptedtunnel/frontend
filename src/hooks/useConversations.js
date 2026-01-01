import { useEffect, useState } from "react";
import conversationService from "../services/conversationService";

export const useConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setConversations(await conversationService.listConversations());
      } catch {
        setError("Failed to load conversations");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { conversations, loading, error };
};
