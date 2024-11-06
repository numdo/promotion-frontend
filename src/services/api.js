// src/services/api.js
import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api' // 백엔드 주소

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키 기반 인증 시 필요
})

// 요청 인터셉터: JWT 토큰을 헤더에 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 응답 인터셉터: 토큰 만료 등 처리
api.interceptors.response.use((response) => {
  return response
}, (error) => {
  // 예: 401 Unauthorized 처리
  if (error.response && error.response.status === 401) {
    // 로그아웃 처리 또는 로그인 페이지로 리다이렉트
    window.location.href = '/login'
  }
  return Promise.reject(error)
})

export default api
