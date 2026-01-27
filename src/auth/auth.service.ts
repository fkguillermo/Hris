const TOKEN_KEY = "token";

export const AuthService = {
  login(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  logout() {
    localStorage.clear();
  },
};
