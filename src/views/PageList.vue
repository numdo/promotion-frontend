<!-- src/views/PageList.vue -->
<template>
  <div>
    <!-- 페이지 헤더 -->
    <TheHeader :headerImage="headerImage" :title="headerTitle" />

    <!-- 메인 컨텐츠 -->
    <main class="mb-4">
      <div class="container px-4 px-lg-5">
        <div class="row">
          <!-- 사이드바 -->
          <div class="col-md-2">
            <div class="sidebar">
              <div class="sidebar-header">
                <h2>{{ subCategoryName }}</h2>
              </div>
              <a v-for="page in pages" :key="page.id" class="nav-link" :class="{ active: page.id === selectedPage.id }"
                @click="selectPage(page)" style="cursor: pointer;">
                <i class="fas fa-angle-right"></i> {{ page.title }}
              </a>
            </div>
          </div>

          <!-- 메인 컨텐츠 영역 -->
          <div class="col-md-9">
            <div v-if="selectedPage">
              <h2>{{ selectedPage.title }}</h2>
              <div v-html="selectedPage.content"></div>
            </div>
            <div v-else>
              <p>페이지를 선택해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
//   import TheHeader from '@/components/TheHeader.vue';
import headerImage from '@/assets/img/home-bg.jpg';

export default {
  name: 'PageList',
  // components: {
  //   TheHeader,
  // },
  data() {
    return {
      headerImage: headerImage,
      pages: [],
      subCategoryName: '',
      selectedPage: null,
      headerTitle: '',

    };
  },
  watch: {
    '$route.params.subCategoryId'(newSubCategoryId) {
      this.fetchPages(newSubCategoryId);
      this.fetchSubCategoryName(newSubCategoryId);
      this.selectedPage = null; // 선택된 페이지 초기화
    },
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
        if (this.pages.length > 0) {
          this.selectedPage = this.pages[0]; // 첫 번째 페이지를 기본 선택
          this.updateHeaderTitle(this.selectedPage.title);
        }
      } catch (error) {
        console.error('페이지 목록을 가져오는 데 실패했습니다:', error);
      }
    },
    async fetchSubCategoryName(subCategoryId) {
      try {
        const response = await axios.get(`/sub-categories/${subCategoryId}`);
        this.subCategoryName = response.data.name;
        this.headerTitle = this.subCategoryName;
      } catch (error) {
        console.error('SubCategory 정보를 가져오는 데 실패했습니다:', error);
      }
    },
    selectPage(page) {
      this.selectedPage = page;
      this.updateHeaderTitle(page.title);
    },
    updateHeaderTitle(title) {
      this.headerTitle = title;
    },
  },
};
</script>

<style scoped>
/* 사이드바 스타일 */
.nav-link {
  color: #000;
  font-size: 16px;
  position: relative;
  padding-left: 0;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  text-decoration: none;
}

.nav-link:hover {
  color: #0085a1;
  text-decoration: none;
}

.nav-link.active {
  color: #0085a1;
  font-weight: bold;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 100%;
  height: 2px;
  background-color: #0085a1;
}

.nav {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.nav h5 {
  font-weight: bold;
  margin-bottom: 20px;
}

.col-md-9 h2 {
  margin-top: 0;
}
.sidebar-header{
  margin-bottom: 1rem;
}
</style>