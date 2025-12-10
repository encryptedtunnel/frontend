import axios from "axios";
import apiClient from "./apiClient";

class AuthService {
  TOKEN_KEY = "access-token";

  async login(username, password) {
    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    const response = await apiClient.post("/auth/login", bodyFormData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    if (response.data?.access_token) {
      const token = response.data.access_token;
      this._setToken(token);
    }
    return response.data;
  }

  async isAuthenticated() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try{
      const response = await apiClient.get("/auth/me", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return true;
    }catch (err) {
      if (axios.isAxiosError(err)){
        if (err.status == 401){ return false}
        throw err
      }
    }
      

  }

  _setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

export default new AuthService();
