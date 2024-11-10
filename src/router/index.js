// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login.vue' // 로그인 페이지 추가
import PageList from '@/views/PageList.vue';
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/pages/subcategory/:subCategoryId',
    name: 'PageList',
    component: PageList,
  },
  // 404 페이지 등 추가 가능
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log(authStore);
  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    // 인증되지 않으면 로그인 페이지로 리다이렉트
    alert('로그인 후에 접근하세요');
    next({name:"login"})
  } else {
    next('/admin')
  }
})

export default router
