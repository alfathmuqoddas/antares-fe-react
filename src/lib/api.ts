import axios from "axios";
import useAuthStore from "@/store/useAuth";

const BASE_URL = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const useAuth = config.headers?.["x-use-auth"] !== "false";

  if (useAuth) {
    const { user } = useAuthStore.getState();
    const token = user?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Remove the internal flag before sending
  delete config.headers?.["x-use-auth"];
  return config;
});

export default api;
