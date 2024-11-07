// src/plugins/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api', // 백엔드 API 주소
  withCredentials: true,
});

export default instance;
