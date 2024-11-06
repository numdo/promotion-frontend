// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Bootstrap CSS 및 JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/css/styles.css'
import './assets/js/scripts.js'

// Pinia 및 Head 관리
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(createHead())

app.mount('#app')
