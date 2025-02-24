<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie } from 'nuxt/app'
import PostForm from '@/components/Admin/PostForm.vue'

definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const config = useRuntimeConfig()

const handleSubmit = async (formData: FormData) => {
  try {
    // Get CSRF token
    await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: { 'Origin': String(config.public.baseUrl) }
    })

    const csrfToken = String(useCookie('XSRF-TOKEN').value)
    
    // Create new post
    await $fetch(`${config.public.apiBase}/api/posts`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    })

    router.push('/admin')
  } catch (error: any) {
    console.error('Submission error:', error)
  }
}

const handleCancel = () => {
  router.push('/admin')
}
</script>

<template>
  <div class="editor-container">
    <PostForm 
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<style scoped>
.editor-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
}
</style>