// src/services/api.js
import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router';

const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL || "http://localhost:8080/api", // 기본값 설정
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  withCredentials: true, // 쿠키 기반 인증 시 필요
});

// 요청 인터셉터: Pinia에 토큰이 있으면 헤더에 포함
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 응답 인터셉터: 401 Unauthorized 처리
api.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const authStore = useAuthStore();
    const router = useRouter();

    if (error.response && error.response.status === 401) {
      authStore.signout();
      router.push("/login"); // 로그인 페이지로 리다이렉트
    }

    return Promise.reject(error);
  }
);

export default api;
