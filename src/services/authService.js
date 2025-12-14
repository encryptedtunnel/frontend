import apiClient from "./apiClient";

class AuthService {
  TOKEN_KEY = "access-token";

  async login(username, password) {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);

      const response = await apiClient.post("/auth/login", bodyFormData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response?.data?.access_token) {
        this._setToken(response.data.access_token);
        return {
          success: true,
          status: response.status,
          data: response.data,
        };
      }

      return {
        success: false,
        status: response.status,
        message: "Unexpected response from server.",
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

      if (status === 404) {
        return {
          success: false,
          status: 401,
          message: "Invalid username or password.",
          details: data,
        };
      }

      return {
        success: false,
        status,
        message: data?.message || "An error occurred.",
        details: data,
      };
    }
  }
  async me() {
    try {
      const response = await apiClient.get("/auth/me");

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

      // Unauthorized → token invalid or expired
      if (status === 401) {
        return {
          success: false,
          status: 401,
          message: "Session expired or unauthorized.",
          details: data,
        };
      }

      return {
        success: false,
        status: status,
        message: data?.message || "An error occurred.",
        details: data,
      };
    }
  }

  _decodeToken(token) {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    const decoded = this._decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    // exp is in seconds, Date.now() is in ms
    const now = Date.now() / 1000;

    return decoded.exp > now;
  }

  async signup(username, display_name, password) {
    try {
      const response = await apiClient.post("/auth/register", {
        username,
        display_name,
        password,
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

      if (status === 409) {
        return {
          success: false,
          status: 409,
          message: "Username already taken.",
          details: data,
        };
      }

      return {
        success: false,
        status,
        message: data?.message || "An error occurred.",
        details: data,
      };
    }
  }

  _setToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  meo(){
    const token = this.getToken();
    if (!token) return false;

    const decoded = this._decodeToken(token);
    return decoded
  }
}

export default new AuthService();
