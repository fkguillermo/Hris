import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("https://localhost:7245/api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};
