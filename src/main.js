// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import TheHeader from '@/components/TheHeader.vue';
// Bootstrap CSS 및 JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/styles.css'
import './assets/js/scripts.js'

// Pinia 및 Head 관리
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
// main.js 또는 App.vue
import AOS from 'aos';
import 'aos/dist/aos.css';
const app = createApp(App)

app.component('TheHeader', TheHeader);

app.use(AOS.init())
app.use(router)
app.use(createPinia())
app.use(createHead())

app.mount('#app')
