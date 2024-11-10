// src/stores/auth.js
import { defineStore } from "pinia";

function base64DecodeUnicode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL Safe 변환
  const pad = str.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
    }
    str += new Array(5 - pad).join('=');
  }
  const binaryString = atob(str);
  const chars = [];
  for (let i = 0; i < binaryString.length; i++) {
    chars.push("%" + ("00" + binaryString.charCodeAt(i).toString(16)).slice(-2));
  }
  return decodeURIComponent(chars.join(""));
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    userId: null,
    role: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUserId: (state) => state.userId,
    getRole: (state) => state.role,
  },

  actions: {
    setToken(tokenInfo) {
      this.accessToken = tokenInfo.accessToken;
      this.refreshToken = tokenInfo.refreshToken;
      localStorage.setItem('accessToken', tokenInfo.accessToken);
      localStorage.setItem('refreshToken', tokenInfo.refreshToken);

      // JWT 토큰 디코딩하여 사용자 정보 설정
      const payload = JSON.parse(base64DecodeUnicode(tokenInfo.accessToken.split(".")[1]));
      this.userId = payload.userId;
      this.role = payload.role;
    },
    signout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.userId = null;
      this.role = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "auth",
        storage: localStorage,
      },
    ],
  },
});
