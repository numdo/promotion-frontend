// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import TheHeader from '@/components/TheHeader.vue';
// Bootstrap CSS 및 JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/css/styles.css';
import './assets/js/scripts.js';

// Pinia 및 Head 관리
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createHead } from '@vueuse/head';

// AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.component('TheHeader', TheHeader);

// Pinia 설정
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate); // Pinia Persisted State 플러그인 사용
app.use(pinia);

// Head 설정
const head = createHead();
app.use(head);

// Vue Router 설정
app.use(router);

// AOS 초기화 (별도 호출)
AOS.init();

app.mount('#app');
