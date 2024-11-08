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
import headerImage from '@/assets/img/home-bg.jpg'

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
        // 백엔드에서 로그인 API 호출
        const response = await api.post('/auth/login', credentials.value)

        // 토큰을 로컬스토리지에 저장
        const token = response.data.token
        if (token) {
          localStorage.setItem('jwtToken', token)  // 로컬스토리지에 JWT 토큰 저장
          authStore.setToken(token)  // 상태 관리 스토어에 토큰 저장 (필요시)

          // 성공 시 관리자 페이지로 리다이렉트
          router.push('/admin')  // 권한에 맞는 페이지로 이동
        } else {
          throw new Error('토큰이 반환되지 않았습니다.')
        }
      } catch (error) {
        // 에러 메시지 처리
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
