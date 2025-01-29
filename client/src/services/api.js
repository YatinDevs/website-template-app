import axios from "axios";
import { BASE_URL } from "../config/config";
import useAuthStore from "../store/authStore";
import { refreshToken } from "./auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies (refreshToken) are sent
});

let isRefreshing = false;
let subscribers = [];

const onRefreshed = (newToken) => {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
};

api.interceptors.request.use(
  async (config) => {
    const { refreshTokenAction, accessToken, isAuthenticated } = useAuthStore(
      (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        refreshTokenAction: state.refreshTokenAction,
      })
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newAccessToken = await refreshTokenAction();
        useAuthStore.getState().setAccessToken(newAccessToken);
        onRefreshed(newAccessToken);
      } catch (error) {
        console.error("Token refresh failed", error);
        useAuthStore.getState().logout(); // Log out user on failure
      } finally {
        isRefreshing = false;
      }
    }

    return new Promise((resolve) => {
      subscribers.push((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  },
  (error) => Promise.reject(error)
);

export default api;
