// src/services/chatService.js
import apiClient from "./apiClient";

class ChatService {
  // Fetch messages for a given conversation
  async listMessages(conversationId) {
    if (!conversationId) {
      throw new Error("conversationId is required");
    }

    try {
      const response = await apiClient.get(`/chat/msges/${conversationId}`);
      return response.data; // only raw data
    } catch (error) {
      if (!error.response) {
        throw new Error("Network error. Please check your connection.");
      }

      const { status, data } = error.response;

      const err = new Error(data?.message || "Failed to load messages");
      err.status = status;
      err.details = data;
      throw err;
    }
  }
}

export default new ChatService();
