// store/authStore.js
import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  // Login action
  login: async (email, password) => {
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      set({
        user: response.data.userDetails,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  // Signup action
  signup: async (username, email, password) => {
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        email,
        password,
      });
      set({
        user: response.data.userDetails,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  },

  // Logout action
  logout: async () => {
    try {
      await axios.post("/api/auth/logout");
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  },

  // Refresh token action
  refreshToken: async () => {
    try {
      const { refreshToken } = get();
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await axios.post("/api/auth/refresh-token", {
        refreshToken,
      });
      set({ accessToken: response.data.accessToken });
      return response.data.accessToken; // Return the new access token
    } catch (error) {
      console.error("Token refresh failed:", error);
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      }); // Clear state on failure
      throw error;
    }
  },
}));

export default useAuthStore;
