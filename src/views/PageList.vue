<template>
    <div>
      <!-- 페이지 헤더 -->
      <header class="masthead" :style="{ backgroundImage: `url(${headerImage})` }">
        <div class="container position-relative px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <div class="page-heading">
                <h1>{{ subCategoryName }}</h1>
                <span class="subheading">관련된 모든 페이지</span>
              </div>
            </div>
          </div>
        </div>
      </header>
  
      <!-- 메인 컨텐츠 -->
      <main class="mb-4">
        <div class="container px-4 px-lg-5">
          <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
              <div v-for="page in pages" :key="page.id" class="page-section">
                <h2>{{ page.title }}</h2>
                <div v-html="page.content"></div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import axios from '@/plugins/axios';
  import headerImage from '@/assets/img/home-bg.jpg';
  
  export default {
    name: 'PageList',
    data() {
      return {
        headerImage,
        pages: [],
        subCategoryName: '',
      };
    },
    mounted() {
      const subCategoryId = this.$route.params.subCategoryId;
      this.fetchPages(subCategoryId);
      this.fetchSubCategoryName(subCategoryId);
    },
    methods: {
      async fetchPages(subCategoryId) {
        try {
          const response = await axios.get(`/pages/subcategory/${subCategoryId}`);
          this.pages = response.data;
        } catch (error) {
          console.error('페이지 목록을 가져오는 데 실패했습니다:', error);
        }
      },
      async fetchSubCategoryName(subCategoryId) {
        try {
          const response = await axios.get(`/sub-categories/${subCategoryId}`);
          this.subCategoryName = response.data.name;
        } catch (error) {
          console.error('SubCategory 정보를 가져오는 데 실패했습니다:', error);
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
  .page-section {
    margin-bottom: 2rem;
  }
  </style>
  