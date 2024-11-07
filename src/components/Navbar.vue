<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="mainNav">
    <div class="container px-4 px-lg-5">
      <router-link class="navbar-brand" to="/">Promotion Site</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        Menu
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ms-auto py-4 py-lg-0">
          <!-- 기존의 하드코딩된 메뉴 항목 -->
          <!-- <li class="nav-item">
            <router-link class="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-lg-3 py-3 py-lg-4" to="/about">About</router-link>
          </li> -->
          <!-- 동적으로 생성되는 메뉴 항목 -->
          <li
            v-for="mainCategory in mainCategories"
            :key="mainCategory.id"
            class="nav-item dropdown"
          >
            <a
              class="nav-link dropdown-toggle px-lg-3 py-3 py-lg-4"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ mainCategory.name }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li
                v-for="subCategory in mainCategory.subCategories"
                :key="subCategory.id"
              >
                <router-link
                  class="dropdown-item"
                  :to="`/pages/subcategory/${subCategory.id}`"
                >
                  {{ subCategory.name }}
                </router-link>
              </li>
            </ul>
          </li>
          <!-- 추가 메뉴 항목 (필요에 따라) -->
          <!-- <li class="nav-item">
            <router-link class="nav-link px-lg-3 py-3 py-lg-4" to="/contact">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link px-lg-3 py-3 py-lg-4" to="/admin">Admin</router-link>
          </li> -->
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from '@/plugins/axios';

export default {
  name: 'Navbar',
  data() {
    return {
      mainCategories: [],
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/main-categories');
        this.mainCategories = response.data;

        // 각 MainCategory에 SubCategories를 추가로 가져옵니다.
        for (let mainCategory of this.mainCategories) {
          const subResponse = await axios.get(
            `/main-categories/${mainCategory.id}/sub-categories`
          );
          mainCategory.subCategories = subResponse.data;
        }
      } catch (error) {
        console.error('카테고리 목록을 가져오는 데 실패했습니다:', error);
      }
    },
  },
};
</script>

<style scoped>
/* 필요 시 추가 스타일 적용 */
</style>
