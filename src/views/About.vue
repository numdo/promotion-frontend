<!-- src/views/About.vue -->
<template>
  <div>
    <!-- Page Header -->
    <header class="masthead" :style="{ backgroundImage: `url(${aboutBg})` }">
      <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <div class="page-heading">
              <h1>{{ pageData.title }}</h1>
              <!-- 필요에 따라 서브헤딩 추가 -->
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
          <div class="col-md-10 col-lg-8 col-xl-7">
            <!-- content를 출력 -->
            <div v-html="pageData.content"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import aboutBg from '@/assets/img/about-bg.jpg';
import axios from '@/plugins/axios';

export default {
  name: 'About',
  data() {
    return {
      aboutBg,
      pageData: {
        title: '',
        content: '',
      },
    };
  },
  mounted() {
    this.fetchPageData();
  },
  methods: {
    async fetchPageData() {
      try {
        const response = await axios.get('/pages/1'); // 페이지 ID를 적절히 변경
        this.pageData = response.data;
      } catch (error) {
        console.error('페이지 데이터를 가져오는 데 실패했습니다:', error);
      }
    },
  },
};
</script>

<style scoped>
.masthead {
  background-size: cover;
  background-position: center;
}
</style>
