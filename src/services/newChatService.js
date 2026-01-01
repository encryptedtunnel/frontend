import apiClient from "./apiClient";

class NewChatService {
  async createConversation(Username) {
    try {
      const response = await apiClient.post("/chat/conversations", {
        target:Username
      });

      return response.data;
    } catch (error) {

      console.log("RAW API ERROR:", {
    message: error.message,
    status: error.response?.status,
    data: error.response?.data,
    config: error.config,
  });

      if (!error.response) {
        throw new Error("Network error");
      }

      const err = new Error(error.response.data?.message || "Create chat failed");
      err.status = error.response.status;
      throw err;
    }
  }
}

export default new NewChatService();