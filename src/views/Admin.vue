<!-- src/views/Admin.vue -->
<template>
  <div class="container mt-5">
    <h2>관리자 페이지</h2>
    <div class="mt-4">
      <h4>SEO 설정</h4>
      <form @submit.prevent="saveSEO">
        <div class="mb-3">
          <label for="metaTitle" class="form-label">메타 타이틀</label>
          <input type="text" id="metaTitle" v-model="seo.metaTitle" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="metaDescription" class="form-label">메타 설명</label>
          <textarea id="metaDescription" v-model="seo.metaDescription" class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">저장</button>
      </form>
    </div>

    <div class="mt-5">
      <h4>본문 내용 수정</h4>
      <EditorComponent :initialContent="bodyContent" @update-content="updateBodyContent" />
      <button class="btn btn-success mt-3" @click="saveBodyContent">본문 저장</button>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import EditorComponent from '@/components/EditorComponent.vue'
import { useSEOStore } from '@/stores/seo'
import { getPageByUrl, updatePage } from '@/services/pageService'

export default {
  name: 'Admin',
  components: {
    EditorComponent,
  },
  setup() {
    const seoStore = useSEOStore()

    const seo = ref({
      metaTitle: '',
      metaDescription: '',
    })

    const bodyContent = ref('')

    // 페이지 ID를 동적으로 가져오는 방법 (예: URL을 기반으로)
    // 여기서는 홈 페이지 'home' URL을 사용하여 로드
    const loadData = async () => {
      try {
        const response = await getPageByUrl('home') // 'home' 페이지 URL
        const page = response.data

        const titleMeta = page.metas.find(meta => meta.name === 'title')
        const descriptionMeta = page.metas.find(meta => meta.name === 'description')

        seo.metaTitle = titleMeta ? titleMeta.content : ''
        seo.metaDescription = descriptionMeta ? descriptionMeta.content : ''

        const mainSection = page.sections.find(section => section.title === 'body')
        bodyContent.value = mainSection ? mainSection.content : ''

        // 상태 업데이트
        seoStore.updateSEO({
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
        })
        seoStore.updateBodyContent(bodyContent.value)
      } catch (error) {
        console.error('데이터 로드 오류:', error)
        alert('데이터를 로드하는 데 실패했습니다.')
      }
    }

    onMounted(() => {
      loadData()
    })

    const saveSEO = async () => {
      try {
        const pageId = 1 // 'home' 페이지의 ID를 정확히 지정 (DB 확인 필요)
        const pageData = {
          url: 'home',
          metas: [
            { name: 'title', property: null, content: seo.metaTitle, itemprop: null },
            { name: 'description', property: null, content: seo.metaDescription, itemprop: null },
          ],
          sections: [
            { title: 'body', content: bodyContent.value, section_order: 1 },
          ],
        }
        await updatePage(pageId, pageData) // 'home' 페이지 ID를 정확히 지정
        seoStore.updateSEO({
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
        })
        alert('SEO 설정이 저장되었습니다.')
      } catch (error) {
        console.error('SEO 저장 오류:', error)
        alert('SEO 설정 저장에 실패했습니다.')
      }
    }

    const saveBodyContent = async () => {
      try {
        const pageId = 1 // 'home' 페이지의 ID를 정확히 지정 (DB 확인 필요)
        const pageData = {
          url: 'home',
          metas: [
            { name: 'title', property: null, content: seo.metaTitle, itemprop: null },
            { name: 'description', property: null, content: seo.metaDescription, itemprop: null },
          ],
          sections: [
            { title: 'body', content: bodyContent.value, section_order: 1 },
          ],
        }
        await updatePage(pageId, pageData)
        seoStore.updateBodyContent(bodyContent.value)
        alert('본문 내용이 저장되었습니다.')
      } catch (error) {
        console.error('본문 저장 오류:', error)
        alert('본문 내용 저장에 실패했습니다.')
      }
    }

    const updateBodyContent = (newContent) => {
      bodyContent.value = newContent
      // bodyContent는 EditorComponent에서 업데이트됨
    }

    return {
      seo,
      saveSEO,
      bodyContent,
      updateBodyContent,
      saveBodyContent,
    }
  },
}
</script>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
