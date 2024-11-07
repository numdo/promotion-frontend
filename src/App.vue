<!-- src/App.vue -->
<template>
  <div id="app">
    <Navbar />
    <div id="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/earlyaccess/nanumgothic.css');
/* 전역 스타일 추가 */
/* 화면 전체를 차지하도록 설정 */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 콘텐츠 영역이 남은 공간을 차지하도록 설정 */
#content {
  flex: 1;
}
</style>
