<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const editorRef = ref<HTMLElement | null>(null)
let editor: Editor | null = null

onMounted(() => {
  if (!editorRef.value) return
  
  editor = new Editor({
    el: editorRef.value,
    initialValue: props.modelValue,
    previewStyle: 'vertical',
    height: '500px',
    events: {
      change: () => {
        const content = editor?.getMarkdown() || ''
        emit('update:modelValue', content)
      }
    }
  })
})

onBeforeUnmount(() => {
  editor?.destroy()
})

watch(() => props.modelValue, (newVal) => {
  if (newVal !== editor?.getMarkdown()) {
    editor?.setMarkdown(newVal)
  }
})
</script>

<template>
  <div ref="editorRef" class="markdown-editor" />
</template>

<style>
.markdown-editor {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Fix z-index issues */
.toastui-editor-dropdown-toolbar {
  z-index: 100 !important;
}
</style>