// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwtToken') || null,
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    clearToken() {
      this.token = null
      localStorage.removeItem('jwtToken')
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
})
