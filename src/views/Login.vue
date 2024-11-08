<!-- src/views/Login.vue -->
<template>
  <TheHeader :headerImage="headerImage" :title="headerTitle" />
  <main class="mb-4">
    <div class="container px-4 px-lg-5">
      <div class="container mt-5">
        <h2>관리자 로그인</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="userId" class="form-label">아이디</label>
            <input type="text" id="userId" v-model="credentials.userId" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">비밀번호</label>
            <input type="password" id="password" v-model="credentials.password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">로그인</button>
          <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  </main>

</template>

<script>
import api from '@/services/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import headerImage from '@/assets/img/home-bg.jpg';

export default {
  name: 'Login',
  setup() {
    const credentials = ref({
      userId: '',
      password: '',
    })
    const errorMessage = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const login = async () => {
      try {
        const response = await api.post('/auth/login', credentials.value)
        const token = response.data.token
        localStorage.setItem('jwtToken', token)
        authStore.setToken(token)
        // 성공 시 홈 또는 관리자 페이지로 이동
        router.push('/admin')
      } catch (error) {
        errorMessage.value = error.response?.data?.message || '로그인에 실패했습니다.'
      }
    }

    return {
      credentials,
      errorMessage,
      login,
    }
  },
}
</script>

<style scoped>
.container {
  max-width: 400px;
}
</style>