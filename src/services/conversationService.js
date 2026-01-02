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
  async createConversation(target) {
    try {
      const response = await apiClient.post("/chat/conversations", {
        target,
      });

      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (!error.response) {
        return {
          success: false,
          status: null,
          message: "Network error. Please check your connection.",
        };
      }
      const { status, data } = error.response;
      switch (status) {
        case 409:
          return {
            success: false,
            status: 409,
            message: "this chat already exists.",
            details: data,
          };
        case 400:
          return {
            success: false,
            status,
            message: data?.detail || "An error occurred.",
            details: data,
          };

        default:
          return {
            success: false,
            status,
            message: data?.detail || "An error occurred.",
            details: data,
          };
      }
    }
  }
}

export default new ConversationService();
