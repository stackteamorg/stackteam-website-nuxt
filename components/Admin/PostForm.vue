<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { defineProps, defineEmits, reactive, watch, ref, onMounted } from 'vue'
import Editor from '@/components/Admin/Editor.vue'

interface Tag {
  name: string
  slug: string
}

interface Post {
  id?: number
  title?: string
  content?: string
  excerpt?: string
  slug?: string
  image?: string
  created_at?: string
  updated_at?: string
  tags?: Tag[]
  category_id?: string
  post_type?: string
  status?: string
}

interface Category {
  id: number
  name: string
  slug: string
  posts_count: number
  created_at: string
}

const props = defineProps<{ post?: Post | null }>()
const emit = defineEmits(['submit', 'cancel'])
const config = useRuntimeConfig()

const form = reactive({
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category_id: '',
  post_type: 'blog',
  status: 'draft',
  image: null as File | null,
  tags: [] as Tag[],
  open_graph: {
    og_title: '',
    og_description: '',
    og_image: null as File | null,
  },
})

// Deep watch for post changes
watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      form.title = newPost.title || ''
      form.slug = newPost.slug || ''
      form.content = newPost.content || ''
      form.excerpt = newPost.excerpt || ''
      form.category_id = newPost.category_id || ''
      form.post_type = newPost.post_type || 'blog'
      form.status = newPost.status || 'draft'
      form.tags = newPost.tags ? [...newPost.tags] : []
      
      // Preserve existing image if not changed
      if (!form.image) {
        form.image = null
      }
    }
  },
  { immediate: true, deep: true }
)

const categories = ref<Category[]>([])
onMounted(async () => {
  try {
    categories.value = await $fetch<Category[]>(`${config.public.apiBase}/api/categories`)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
})

const addTag = () => {
  form.tags.push({ name: '', slug: '' })
}

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

const handleSubmit = async () => {
  const formData = new FormData()

  // Append basic fields
  formData.append('title', form.title)
  formData.append('slug', form.slug)
  formData.append('content', form.content)
  formData.append('excerpt', form.excerpt)
  formData.append('category_id', form.category_id)
  formData.append('post_type', form.post_type)
  formData.append('status', form.status)
  
  if (form.image) {
    formData.append('image', form.image)
  }

  // Append tags
  form.tags.forEach((tag, index) => {
    formData.append(`tags[${index}][name]`, tag.name)
    formData.append(`tags[${index}][slug]`, tag.slug)
  })

  // Open Graph fields
  if (form.open_graph.og_title) {
    formData.append('open_graph[og_title]', form.open_graph.og_title)
  }
  if (form.open_graph.og_description) {
    formData.append('open_graph[og_description]', form.open_graph.og_description)
  }
  if (form.open_graph.og_image) {
    formData.append('open_graph[og_image]', form.open_graph.og_image)
  }

  emit('submit', formData)
}

const handleFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) {
    form.image = input.files[0]
  }
}

const handleOGFileChange = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.[0]) {
    form.open_graph.og_image = input.files[0]
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="post-form">
    <div class="form-group">
      <label>Title</label>
      <input v-model="form.title" required />
    </div>

    <div class="form-group">
      <label>Slug</label>
      <input v-model="form.slug" required />
    </div>

    <div class="form-group">
      <label>Content</label>
      <ClientOnly>
        <Editor v-model="form.content" />
      </ClientOnly>
    </div>

    <div class="form-group">
      <label>Excerpt</label>
      <textarea v-model="form.excerpt" rows="3"></textarea>
    </div>

    <div class="form-group">
      <label>Category</label>
      <select v-model="form.category_id" required>
        <option value="" disabled>Select a category</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label>Post Type</label>
      <select v-model="form.post_type">
        <option value="blog">Blog</option>
        <option value="services">Services</option>
        <option value="technologies">Technologies</option>
      </select>
    </div>

    <div class="form-group">
      <label>Status</label>
      <select v-model="form.status">
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
    </div>

    <div class="form-group">
      <label>Image</label>
      <input type="file" @change="handleFileChange" />
    </div>

    <div class="form-group">
      <label>Tags (enter name and slug for each)</label>
      <div v-for="(tag, index) in form.tags" :key="index" class="tag-input">
        <input v-model="tag.name" placeholder="Tag Name" class="tag"/>
        <input v-model="tag.slug" placeholder="Tag Slug" class="tag"/>
        <button type="button" @click="removeTag(index)" class="tag-btn">Remove</button>
      </div>
      <button type="button" @click="addTag" class="tag-btn">Add Tag</button>
    </div>

    <div class="form-group">
      <label>Open Graph Title</label>
      <input v-model="form.open_graph.og_title" placeholder="OG Title" />
    </div>

    <div class="form-group">
      <label>Open Graph Description</label>
      <textarea v-model="form.open_graph.og_description" rows="3" placeholder="OG Description"></textarea>
    </div>

    <div class="form-group">
      <label>Open Graph Image</label>
      <input type="file" @change="handleOGFileChange" />
    </div>

    <div class="form-actions">
      <button type="button" @click="$emit('cancel')">Cancel</button>
      <button type="submit">Save Post</button>
    </div>
  </form>
</template>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

input,
textarea,
select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.form-actions button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-actions button[type='submit'] {
  background-color: #ff8565;
  color: white;
}

.form-actions button[type='button'] {
  background-color: #eee;
}

.tag {
  width: 50%;
}

.tag-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin: 5px 0;
}
</style>