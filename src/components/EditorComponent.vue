<!-- src/components/EditorComponent.vue -->
<template>
  <div>
    <toast-ui-editor
      ref="editor"
      :initialValue="initialContent"
      :previewStyle="'vertical'"
      :height="'400px'"
      :initialEditType="'markdown'"
      :useCommandShortcut="true"
      @change="onChange"
    ></toast-ui-editor>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Editor } from '@toast-ui/editor'

export default {
  name: 'EditorComponent',
  components: {
    'toast-ui-editor': Editor,
  },
  props: {
    initialContent: {
      type: String,
      default: '',
    },
  },
  emits: ['update-content'],
  setup(props, { emit }) {
    const editor = ref(null)

    const onChange = () => {
      const editedContent = editor.value.getInstance().getMarkdown()
      emit('update-content', editedContent)
    }

    return {
      editor,
      onChange,
    }
  },
}
</script>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
