// src/stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('jwtToken') || '',  // 로컬스토리지에서 초기화
  }),

  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('jwtToken', token)  // 토큰을 로컬스토리지에 저장
    },

    removeToken() {
      this.token = ''
      localStorage.removeItem('jwtToken')  // 로컬스토리지에서 토큰 제거
    },

    isAuthenticated() {
      return !!this.token  // 토큰이 있는지 여부로 인증 상태 확인
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.token,  // 로그인 상태 확인
  }
})
