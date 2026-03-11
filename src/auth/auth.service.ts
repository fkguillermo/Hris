import { jwtDecode } from "jwt-decode";
import type { AuthUser } from "./auth.types";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

export const AuthService = {
  login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);

    const decoded: any = jwtDecode(token);

    const toBool = (v: any) => v === true || v === "True" || v === "true";

    const user: AuthUser = {
      employeeId: Number(decoded.sub),
      canProcess: toBool(decoded.canProcess),
      canApprove: toBool(decoded.canApprove),
      canPost: toBool(decoded.canPost),
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
