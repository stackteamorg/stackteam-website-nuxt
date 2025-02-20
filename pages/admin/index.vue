<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useCookie, useFetch, useRuntimeConfig } from "nuxt/app";
import PostForm from '@/components/Admin/PostForm.vue';

// Define interfaces
interface Tag {
  name: string;
  slug: string;
  post_count: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  image: string;
  created_at: string;
  updated_at: string;
  is_pinned?: boolean;
  tags?: Tag[];
  category_name?: string;
  user_name?: string;
  status?: 'draft' | 'published';
  post_type?: string;
}

interface Pagination {
  current_page: number;
  data: Post[];
  per_page: number;
  total: number;
  last_page: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
}

definePageMeta({
  middleware: 'auth'
});

const { user, logout } = useAuth();
const config = useRuntimeConfig();
const router = useRouter();
const showModal = ref(false);
const editingPost = ref<Post | null>(null);

// دریافت پست‌ها از API
const { data: posts, refresh } = useFetch<Post[] | Pagination>(`${config.public.apiBase}/api/posts`, {
  headers: { accept: 'application/json' },
});

// computed که هم آبجکت pagination رو مدیریت کنه و هم المان‌های null رو فیلتر کنه
const postsList = computed<Post[]>(() => {
  if (!posts.value) return [];
  // چک کنید اگر posts.value یک آرایه است یا آبجکت pagination
  const arr = Array.isArray(posts.value)
    ? posts.value
    : (posts.value as Pagination).data;
  // فیلتر کردن المان‌های null یا بدون id
  return arr.filter((post: Post | null) => post && post.id !== undefined);
});

const openEditModal = (post?: Post) => {
  editingPost.value = post || null;
  showModal.value = true;
};

const handleDelete = async (postId: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    await $fetch(`${config.public.apiBase}/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    refresh();
  }
};

const handleLogout = async () => {
  await logout();
  router.push('/admin/login');
};

const submitForm = async (formData: FormData) => {
  try {
    // First, refresh CSRF token
    await $fetch(`${config.public.apiBase}sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: {
        'Origin': String(config.public.baseUrl),
      }
    });

    // Get CSRF token from cookies
    const csrfToken = String(useCookie('XSRF-TOKEN').value);

    const url = editingPost.value 
      ? `${config.public.apiBase}/api/posts/${editingPost.value.id}`
      : `${config.public.apiBase}/api/posts`;

    await $fetch(url, {
      method: editingPost.value ? 'PUT' : 'POST',
      body: formData,
      credentials: 'include',
      headers: {
        'X-XSRF-TOKEN': csrfToken, // Add this header
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Origin': String(config.public.baseUrl),
      }
    });

    showModal.value = false;
    refresh();
  } catch (error: any) {
    console.error('Submission error:', error);
    if (error.response) {
      console.error('Error response:', error.response._data || error.response);
    }
  }
};
</script>

<template>
  <div class="admin-container">
    <header class="admin-header">
      <h1>Posts Management</h1>
      <button @click="handleLogout" class="logout-btn">
        Logout
      </button>
    </header>

    <button @click="openEditModal()" class="new-post-btn">
      + New Post
    </button>

    <div class="posts-table" v-if="postsList.length > 0">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Category</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- فقط المان‌های معتبر را نمایش می‌دهیم -->
          <tr v-for="post in postsList" :key="post.id">
            <td>{{ post.title }}</td>
            <td>
              <span :class="['status', post.status]">
                {{ post.status }}
              </span>
            </td>
            <td>{{ post?.category_name }}</td>
            <td>{{ post.post_type }}</td>
            <td class="actions">
              <button @click="openEditModal(post)" class="edit-btn">Edit</button>
              <button @click="handleDelete(post.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No posts available!</p>
    </div>

    <!-- Post Form Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <PostForm 
          :post="editingPost"
          @submit="submitForm"
          @cancel="showModal = false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eee;
}

.new-post-btn {
  background-color: #ff8565;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: opacity 0.2s;
}

.new-post-btn:hover {
  opacity: 0.9;
}

.posts-table {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: 600;
}

tr:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.status {
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.85rem;
}

.status.draft {
  background-color: #ffe4e4;
  color: #cc0000;
}

.status.published {
  background-color: #e4ffe7;
  color: #00cc2a;
}

.actions button {
  padding: 0.4rem 0.8rem;
  margin: 0 0.3rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ff8565;
  color: white;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
  margin-top: 1050px;
  margin-bottom: 10px;
}

.close {
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.logout-btn {
  background-color: #ff4d4d;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}
</style>
