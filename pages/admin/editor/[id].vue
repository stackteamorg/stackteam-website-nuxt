<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRuntimeConfig, useCookie, useFetch } from 'nuxt/app'
import PostForm from '@/components/Admin/PostForm.vue'

definePageMeta({
  middleware: 'auth'
})

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  category_id?: string;
  post_type: string;
  status?: string;
}

interface Tag {
  name: string;
  slug: string;
}

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const postId = route.params.id as string
const post = ref<Post | null>(null)

// Fetch post data
const { data } = await useFetch<Post>(`${config.public.apiBase}/api/posts/${postId}`, {
  headers: { accept: 'application/json' }
})
post.value = data.value

const handleSubmit = async (formData: FormData) => {
  try {
    // Get CSRF token
    await $fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: { 'Origin': String(config.public.baseUrl) }
    })

    const csrfToken = String(useCookie('XSRF-TOKEN').value)
    
    // Update post
    await $fetch(`${config.public.apiBase}/api/posts/${postId}`, {
      method: 'PUT',
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
      v-if="post"
      :post="post"
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