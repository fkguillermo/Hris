import axios from "axios";
import { AuthService } from "../auth/auth.service";

const api = axios.create({
  baseURL: "https://localhost:7245/api",
});

api.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
