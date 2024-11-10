// src/services/api.js
import axios from "axios";

const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL || "http://localhost:8080/api", // 기본값 설정
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true, // 쿠키 기반 인증 시 필요
});

// 요청 인터셉터: 로컬스토리지에서 토큰을 직접 가져옴
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터: 401 Unauthorized 처리
api.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    if (error.response && error.response.status === 401) {
      // Token 만료 시 처리
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login'; // 직접 리다이렉트
    }
    return Promise.reject(error);
  }
);

export default api;
