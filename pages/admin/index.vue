<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import { useCookie, useFetch, useRuntimeConfig } from "nuxt/app";

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

// Fetch posts
const { data: posts, refresh } = useFetch<Post[] | Pagination>(`${config.public.apiBase}/api/posts`, {
  headers: { accept: 'application/json' },
});

const postsList = computed<Post[]>(() => {
  if (!posts.value) return [];
  const arr = Array.isArray(posts.value)
    ? posts.value
    : (posts.value as Pagination).data;
  return arr.filter((post: Post | null) => post && post.id !== undefined);
});

const handleDelete = async (postId: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    const csrfToken = String(useCookie('XSRF-TOKEN').value)
    await $fetch(`${config.public.apiBase}/api/posts/${postId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'X-XSRF-TOKEN': csrfToken }
    })
    refresh()
  }
};

const handleLogout = async () => {
  await logout();
  router.push('/admin/login');
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

    <RouterLink to="/admin/editor" class="new-post-btn">
      + New Post
    </RouterLink>

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
              <RouterLink :to="`/admin/editor/${post.id}`" class="edit-btn">Edit</RouterLink>
              <button @click="handleDelete(post.id)" class="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No posts available!</p>
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
  text-decoration: none;
  display: inline-block;
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

.actions a, .actions button {
  padding: 0.4rem 0.8rem;
  margin: 0 0.3rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
}

.edit-btn {
  background-color: #ff8565;
  color: white;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
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