<!-- src/views/AdminPage.vue -->

<template>
  <TheHeader :headerImage="headerImage" :title="headerTitle" />

  <div class="d-flex">
    <!-- 사이드바 -->
    <div class="bg-light border-right" id="sidebar-wrapper" style="width: 250px;">
      <div class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom">
        관리자
      </div>
      <div class="list-group list-group-flush">
        <!-- 대분류 리스트 -->
        <a v-for="category in categories" :key="category.id" class="list-group-item list-group-item-action bg-light"
          @click="toggleSubCategories(category.id)" style="cursor: pointer;">
          <i class="fas fa-folder me-2"></i> {{ category.name }}
        </a>
      </div>
    </div>

    <!-- 메인 콘텐츠 -->
    <div id="page-content-wrapper" class="flex-grow-1">
      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button class="btn btn-primary" @click="toggleSidebar">Toggle Menu</button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- 추가적인 네비게이션 아이템 -->
        </div>
      </nav>

      <div class="container-fluid p-4">
        <!-- 중분류 리스트 -->
        <div v-if="selectedCategory">
          <h3>{{ selectedCategory.name }}의 중분류</h3>
          <div class="list-group mb-4">
            <a v-for="sub in subCategories[selectedCategory.id] || []" :key="sub.id"
              class="list-group-item list-group-item-action bg-light" @click="togglePages(sub.id)"
              style="cursor: pointer;">
              <i class="fas fa-folder-open me-2"></i> {{ sub.name }}
            </a>
          </div>
        </div>

        <!-- 페이지 리스트 -->
        <div v-if="selectedSubCategory">
          <h3>{{ selectedSubCategory.name }}의 페이지</h3>
          <div class="list-group">
            <div v-for="page in pages[selectedSubCategory.id] || []" :key="page.id" class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <span @click="selectPage(page)" style="cursor: pointer;">
                  <i class="fas fa-file-alt me-2"></i> {{ page.title }}
                </span>
                <button class="btn btn-danger btn-sm" @click="deletePage(page.id)">삭제</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 페이지 편집 영역 -->
        <div v-if="selectedPage" class="mt-4">
          <h2>{{ selectedPage.title }}</h2>
          <EditorComponent v-model="selectedPage.content" />
          <button class="btn btn-success mt-3" @click="saveContent">저장</button>
        </div>

        <div v-else-if="!selectedPage">
          <p>수정할 페이지를 선택해주세요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios';
import { ref, reactive, onMounted } from 'vue';
import EditorComponent from '@/components/EditorComponent.vue';
import TheHeader from '@/components/TheHeader.vue'; // TheHeader 임포트
import headerImage from '@/assets/img/home-bg.jpg';

export default {
  name: 'AdminPage',
  components: {
    EditorComponent,
    TheHeader, // TheHeader 등록
  },
  setup() {
    const categories = ref([]);
    const subCategories = reactive({});
    const pages = reactive({});
    const selectedCategory = ref(null);
    const selectedSubCategory = ref(null);
    const selectedPage = ref(null);
    const editorContent = ref('');
    const headerTitle = ref('관리자 페이지');
    const headerImageUrl = headerImage;
    const currentEditingPageId = ref(null); // 현재 편집 중인 페이지 ID

    // 사이드바 토글
    const toggleSidebar = () => {
      const sidebar = document.getElementById('sidebar-wrapper');
      sidebar.classList.toggle('toggled');
    };

    // 대분류 클릭 시 중분류 로드 및 선택
    const toggleSubCategories = (categoryId) => {
      if (selectedCategory.value && selectedCategory.value.id === categoryId) {
        selectedCategory.value = null;
        selectedSubCategory.value = null;
        selectedPage.value = null;
      } else {
        selectedCategory.value = categories.value.find(cat => cat.id === categoryId);
        selectedSubCategory.value = null;
        selectedPage.value = null;
        fetchSubCategories(categoryId);
      }
    };

    // 중분류 클릭 시 페이지 로드 및 선택
    const togglePages = (subCategoryId) => {
      if (selectedSubCategory.value && selectedSubCategory.value.id === subCategoryId) {
        selectedSubCategory.value = null;
        selectedPage.value = null;
      } else {
        selectedSubCategory.value = subCategories[selectedCategory.value.id].find(sub => sub.id === subCategoryId);
        selectedPage.value = null;
        fetchPages(subCategoryId);
      }
    };

    // 페이지 선택
    const selectPage = (page) => {
      selectedPage.value = page;
      editorContent.value = page.content;
      currentEditingPageId.value = page.id;
      headerTitle.value = page.title;
    };

    // 데이터 가져오기
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/main-categories');
        console.log('대분류 데이터:', response.data); // 디버깅용
        categories.value = response.data;
      } catch (error) {
        console.error('대분류를 가져오는 데 실패했습니다:', error);
      }
    };

    const fetchSubCategories = async (categoryId) => {
      try {
        const response = await axios.get(`/main-categories/${categoryId}/sub-categories`);
        subCategories[categoryId] = response.data;
      } catch (error) {
        console.error('중분류를 가져오는 데 실패했습니다:', error);
      }
    };

    const fetchPages = async (subCategoryId) => {
      try {
        const response = await axios.get(`/pages/subcategory/${subCategoryId}`);
        pages[subCategoryId] = response.data;
      } catch (error) {
        console.error('페이지를 가져오는 데 실패했습니다:', error);
      }
    };

    // 에디터에서 변경된 내용 처리
    const handleUpdateContent = (newContent) => {
      editorContent.value = newContent;
    };

    // 페이지 내용 저장
    const saveContent = async () => {
      if (!selectedPage.value) {
        alert('저장할 페이지를 선택해주세요.');
        return;
      }

      try {
        await axios.put(`/pages/${selectedPage.value.id}`, { content: editorContent.value });
        alert('페이지 내용이 성공적으로 저장되었습니다.');
        // 선택한 페이지의 내용을 업데이트
        selectedPage.value.content = editorContent.value;
        currentEditingPageId.value = null;
      } catch (error) {
        console.error('페이지 내용을 저장하는 데 실패했습니다:', error);
        alert('페이지 내용을 저장하는 데 실패했습니다.');
      }
    };

    // 페이지 삭제
    const deletePage = async (pageId) => {
      if (!confirm('정말로 이 페이지를 삭제하시겠습니까?')) return;

      try {
        await axios.delete(`/pages/${pageId}`);
        alert('페이지가 성공적으로 삭제되었습니다.');
        // 삭제 후 해당 페이지를 리스트에서 제거
        const subId = selectedSubCategory.value.id;
        pages[subId] = pages[subId].filter(page => page.id !== pageId);
        if (selectedPage.value && selectedPage.value.id === pageId) {
          selectedPage.value = null;
          editorContent.value = '';
          headerTitle.value = '관리자 페이지';
        }
      } catch (error) {
        console.error('페이지를 삭제하는 데 실패했습니다:', error);
        alert('페이지를 삭제하는 데 실패했습니다.');
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      subCategories,
      pages,
      selectedCategory,
      selectedSubCategory,
      selectedPage,
      editorContent,
      headerTitle,
      headerImage: headerImageUrl,
      toggleSidebar,
      toggleSubCategories,
      togglePages,
      selectPage,
      handleUpdateContent,
      saveContent,
      deletePage,
      currentEditingPageId,
    };
  },
};
</script>

<style scoped>
/* 관리자 페이지 레이아웃 */
#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -250px;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper.toggled {
  margin-left: 0;
}

#page-content-wrapper {
  width: 100%;
}

.toggled #sidebar-wrapper {
  margin-left: 0;
}

/* Sidebar 스타일 */
.sidebar-heading {
  font-size: 1.5rem;
  font-weight: bold;
}

.list-group-item {
  border: none;
  padding: 0.75rem 1.25rem;
}

.list-group-item:hover {
  background-color: #e9ecef;
}

.list-group-item.active {
  background-color: #0d6efd;
  color: #fff;
}

.list-group-item i {
  margin-right: 10px;
}

/* Toast UI Editor 커스터마이징 */
.toastui-editor-defaultUI {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

/* 버튼 스타일 */
.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  background-color: #157347;
  border-color: #146c43;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
