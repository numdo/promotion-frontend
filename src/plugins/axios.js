// src/api/index.js
import axios from 'axios';

// API 기본 URL 설정
const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // Spring Boot 백엔드 서버 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 추가: JWT 토큰 자동 첨부
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // 로컬스토리지에서 토큰을 가져옴
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // 요청 헤더에 JWT 토큰 추가
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
