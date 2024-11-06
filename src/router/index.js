// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Post from '@/views/Post.vue'
import Posts from '@/views/Posts.vue' // 새로 추가
import Contact from '@/views/Contact.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login.vue' // 로그인 페이지 추가
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/posts', name: 'Posts', component: Posts }, // 새로 추가
  { path: '/post/:id', name: 'Post', component: Post },
  { path: '/post', redirect: '/posts' }, // '/post'로 접근 시 '/posts'로 리다이렉트
  { path: '/contact', name: 'Contact', component: Contact },
  // { path: '/admin', name: 'Admin', component: Admin },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  // 404 페이지 등 추가 가능
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 관리자 페이지 보호를 위한 네비게이션 가드 (예시)
router.beforeEach((to, from, next) => {
  if (to.name === 'ADMIN' && !isAuthenticated()) {
    alert('관리자 페이지에 접근할 권한이 없습니다.')
    next('/')
  } else {
    next()
  }
})

// 간단한 인증 상태 확인 함수 (실제 애플리케이션에서는 더 복잡함)
function isAuthenticated() {
  return !!localStorage.getItem('authToken')
}

export default router
