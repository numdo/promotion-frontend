<!-- src/components/EditorComponent.vue -->

<template>

  <!-- 에디터의 DOM 요소를 참조 -->
  <div ref="editorContainer"></div>

  <!-- 작성한 내용의 HTML을 표시 -->
  <div v-html="testHtml"></div>
</template>

<script setup>
import { onMounted, ref, watch, onUnmounted } from 'vue';
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

// 부모 컴포넌트로부터 전달받는 prop 정의
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});

// 부모 컴포넌트로 이벤트를 보내기 위한 emit 정의
const emit = defineEmits(['update:modelValue']);

// 에디터를 참조할 DOM 요소
const editorContainer = ref(null);

// 에디터 인스턴스를 저장할 변수
const editorInstance = ref(null);

// 작성한 내용의 HTML을 저장할 변수
const testHtml = ref('');

// 에디터 초기화 및 설정
onMounted(() => {
  editorInstance.value = new Editor({
    el: editorContainer.value, // 에디터를 마운트할 DOM 요소
    height: '500px',
    initialEditType: 'wysiwyg', // 'wysiwyg' 또는 'markdown' 선택 가능
    previewStyle: 'vertical',
    initialValue: props.modelValue, // 초기 내용 설정
    useCommandShortcut: true,
    events: {
      change: () => {
        const markdown = editorInstance.value.getMarkdown(); // Markdown 형식으로 내용 가져오기
        emit('update:modelValue', markdown); // 부모 컴포넌트로 내용 업데이트 이벤트 전송
        updateTestHtml(); // HTML 업데이트
      },
    },
  });

  // 초기 HTML 내용 설정
  updateTestHtml();
});

// 작성한 내용을 HTML로 변환하여 표시
const updateTestHtml = () => {
  if (editorInstance.value) {
    testHtml.value = editorInstance.value.getHTML();
  }
};

// 부모로부터 전달받은 modelValue가 변경될 때 에디터 내용 업데이트
watch(
  () => props.modelValue,
  (newContent) => {
    if (editorInstance.value && newContent !== editorInstance.value.getMarkdown()) {
      editorInstance.value.setMarkdown(newContent);
      updateTestHtml();
    }
  }
);

// 컴포넌트 언마운트 시 에디터 인스턴스 정리
onUnmounted(() => {
  if (editorInstance.value) {
    editorInstance.value.destroy();
    editorInstance.value = null;
  }
});
</script>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
