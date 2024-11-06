// src/services/authService.js
import api from '@/services/api'

// 로그인
export const login = (credentials) => {
  return api.post('/auth/login', credentials)
}
