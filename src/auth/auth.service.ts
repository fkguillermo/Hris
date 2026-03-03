import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "./auth.types";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

export const AuthService = {
  login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);

    const decoded: any = jwtDecode(token);

    const user: AuthUser = {
      employeeId: Number(decoded.sub),
      canProcess: decoded.canProcess === "True",
      canApprove: decoded.canApprove === "True",
      canPost: decoded.canPost === "True",
    };

    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser(): AuthUser | null {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.clear();
  },
};
