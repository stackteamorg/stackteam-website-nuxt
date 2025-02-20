<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute,useRuntimeConfig } from 'nuxt/app';

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
    category?: string;
    user_name?: string;
}

interface Tag {
  name: string;
  slug: string;
  post_count: number;
}

interface Pagination {
    current_page: number;
    data: Post[];
    per_page: number;
    total: number;
    last_page: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

const config = useRuntimeConfig();
const route = useRoute();
const allPosts = ref<Post[]>([]);
const tagDetail = ref<Tag>();
const pagination = ref<Pagination>({
    current_page: 1,
    data: [],
    per_page: 12,
    total: 0,
    last_page: 1,
    links: []
});

// Separate pinned posts from regular posts
const pinnedPosts = computed(() => allPosts.value.filter(post => post.is_pinned));
const regularPosts = computed(() => allPosts.value.filter(post => !post.is_pinned));

// Truncate excerpt helper
const truncateExcerpt = (text: string, maxLength: number = 90) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Fetch all posts with pagination
const fetchPosts = async (page: number = 1) => {
    try {
        const response: Pagination = await $fetch(`${config.public.apiBase}/api/posts/tag/${route.params.slug}`, {
            params: {
                page,
                per_page: pagination.value.per_page,
                include_pinned: true // Ensure API includes pinned posts in the response
            }
        });
        
        allPosts.value = response.data;
        pagination.value = response;
    } catch (error) {
        console.error('خطا در دریافت مقالات:', error);
    }
};

const fetchTagDetail = async () => {
  try {
    const response: Tag = await $fetch(`${config.public.apiBase}/api/tag/${route.params.slug}`);
    tagDetail.value = response;
  } catch (error) {
    console.error('خطا در دریافت پست:', error);
  }
};

onMounted(() => {
    fetchPosts()
    fetchTagDetail()
});
</script>

<template>
    <section class="tf__blog pt_165 mb_200" dir="rtl">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 m-auto">
                    <div class="tf__common_heading pb_20">
                        <h6>خانه / بلاگ</h6>
                        <h2 class="tf__common_heading_color">پست های {{ tagDetail?.name }}</h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pinned Posts Section -->
        <div class="tf__blog_iteam pt_60" v-if="pinnedPosts.length > 0">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3 class="mb-4">مقالات ثابت</h3>
                    </div>
                    <div class="col-xl-4 col-md-6" v-for="post in pinnedPosts" :key="post.id">
                        <div class="tf__single_blog">
                            <div class="tf__single_blog_img">
                                <img 
                                    :src="post.image" 
                                    :alt="post.title"
                                    class="img-fluid w-100"
                                />
                            </div>
                            <div class="tf__single_blog_text">
                                <ul class="d-flex flex-wrap">
                                    <li>{{ new Date(post.created_at).toLocaleDateString('fa-IR') }}</li>
                                    <li>{{ Math.ceil(post.content?.length / 1200) || 5 }} دقیقه</li>
                                    <li v-if="post.user_name">{{ post.user_name }}</li>
                                </ul>
                                <NuxtLink 
                                    :to="`/blog/${post.slug}`" 
                                    class="tf__single_blog_heading"
                                >
                                    {{ post.title }}
                                </NuxtLink>
                                <p v-if="post.tags">
                                    <NuxtLink 
                                        v-for="tag in post.tags" 
                                        :key="tag.slug" 
                                        :to="`/blog/tag/${tag.slug}`" 
                                        class="tf__single_blog_link"
                                    >
                                        {{ tag.name }}
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Regular Posts Section -->
        <div class="tf__blog_iteam pt_60">
            <div class="container">
                <div class="row d-flex flex-wrap justify-content-between mb-4">
                    <!-- Search and Filters -->
                    <div class="col-xl-2 col-lg-2">
                        <form class="tf__blog_search">
                            <input type="text" placeholder="جستجو کنید..." class="pr_40" />
                            <button class="tf__search_icon">
                                <i class="fi fi-rr-search"></i>
                            </button>
                        </form>
                    </div>
                    
                    <div class="col-xl-8 col-lg-8">
                        <div class="tf__blog_categories d-flex flex-wrap justify-content-end">
                            <p>
                                نمایش {{ (pagination.current_page - 1) * pagination.per_page + 1 }}-{{ 
                                Math.min(pagination.current_page * pagination.per_page, pagination.total) }} 
                                از {{ pagination.total }} نتیجه
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Posts Grid -->
                <div class="row">
                    <div 
                        class="col-xl-4 col-md-6" 
                        v-for="post in regularPosts" 
                        :key="post.id"
                    >
                        <div class="tf__single_blog">
                            <div class="tf__single_blog_img">
                                <img 
                                    :src="post.image" 
                                    :alt="post.title"
                                    class="img-fluid w-100"
                                />
                            </div>
                            <div class="tf__single_blog_text">
                                <ul class="d-flex flex-wrap">
                                    <li>{{ new Date(post.created_at).toLocaleDateString('fa-IR') }}</li>
                                    <li>{{ Math.ceil(post.content?.length / 1200) || 5 }} دقیقه</li>
                                    <li v-if="post.user_name">{{ post.user_name }}</li>
                                </ul>
                                <NuxtLink 
                                    :to="`/blog/${post.slug}`" 
                                    class="tf__single_blog_heading"
                                >
                                    {{ post.title }}
                                </NuxtLink>
                                <p>{{ truncateExcerpt(post.excerpt) }}</p>
                                <p v-if="post.tags">
                                    <NuxtLink 
                                        v-for="tag in post.tags" 
                                        :key="tag.slug" 
                                        :to="`/blog/tag/${tag.slug}`" 
                                        class="tf__single_blog_link"
                                    >
                                        {{ tag.name }}
                                    </NuxtLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination Controls -->
                <div class="row mt-4">
                    <div class="col-12">
                        <nav aria-label="Page navigation">
                            <ul class="pagination justify-content-center">
                                <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
                                    <button 
                                        class="page-link" 
                                        @click="fetchPosts(pagination.current_page - 1)"
                                    >
                                        قبلی
                                    </button>
                                </li>
                                
                                <li 
                                    class="page-item" 
                                    v-for="page in pagination.last_page" 
                                    :key="page"
                                    :class="{ active: page === pagination.current_page }"
                                >
                                    <button 
                                        class="page-link" 
                                        @click="fetchPosts(page)"
                                    >
                                        {{ page }}
                                    </button>
                                </li>
                                
                                <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
                                    <button 
                                        class="page-link" 
                                        @click="fetchPosts(pagination.current_page + 1)"
                                    >
                                        بعدی
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.page-item.active .page-link {
    background-color: #ff8565 !important;
    border-color: #ff8565 !important;
    color: white !important;
}
</style>