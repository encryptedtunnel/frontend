// src/services/conversationService.js
import apiClient from "./apiClient";

class ConversationService {
  async listConversations() {
    try {
      const response = await apiClient.get("/chat/conversations");
      return response.data; // only raw data
    } catch (error) {
      if (!error.response) {
        throw new Error("Network error. Please check your connection.");
      }

      const { status, data } = error.response;

      // Throw a custom error object
      const err = new Error(data?.message || "An error occurred");
      err.status = status;
      err.details = data;
      throw err;
    }
  }
}

export default new ConversationService();
