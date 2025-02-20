<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRuntimeConfig } from 'nuxt/app';
import { marked } from 'marked';

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
}

interface Category {
  id: number;
  name: string;
  slug: string;
  posts_count: number;
}

interface PopularPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  created_at: string;
  category_name: string;
  user_name: string;
}

interface Tag {
  name: string;
  slug: string;
  post_count: number;
}

const post = ref<Post | null>(null); // Fixed: post should be a single object, not an array
const categories = ref<Category[]>([]);
const popularPosts = ref<PopularPost[]>([]); // Added for popular posts
const popularTags = ref<Tag[]>([]); // Added for popular tags
const config = useRuntimeConfig();
const route = useRoute();

const fetchPost = async () => {
  try {
    const response: Post = await $fetch(`${config.public.apiBase}/api/posts/${route.params.slug}`);
    post.value = response;
  } catch (error) {
    console.error('خطا در دریافت پست:', error);
  }
};

const fetchCategory = async () => {
  try {
    const response: Category[] = await $fetch(`${config.public.apiBase}/api/categories`);
    categories.value = response;
  } catch (error) {
    console.error('خطا در دریافت دسته‌بندی‌ها:', error);
  }
};

const fetchPopularPosts = async () => {
  try {
    const response: PopularPost[] = await $fetch(`${config.public.apiBase}/api/popular-posts`);
    popularPosts.value = response;
  } catch (error) {
    console.error('خطا در دریافت پست‌های محبوب:', error);
  }
};

const fetchPopularTags = async () => {
  try {
    const response: Tag[] = await $fetch(`${config.public.apiBase}/api/popular-tags`);
    popularTags.value = response;
  } catch (error) {
    console.error('خطا در دریافت تگ‌های محبوب:', error);
  }
};

onMounted(() => {
  fetchPost();
  fetchCategory();
  fetchPopularPosts();
  fetchPopularTags(); // Fetch popular tags
});
</script>

<template>
  <div>
    <section class="tf__about pt_200 pb_25" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-6">
            <div class="tf__common_heading tf__common_heading2">
              <h6>خانه / بلاگ</h6>
              <h2 class="tf__common_heading_color">
                {{ post?.title }}
              </h2>
              <p>
                {{ post?.excerpt }}
              </p>
              <div class="tf__blog_details_author d-flex flex-wrap">
                <ul class="d-flex flex-wrap">
                  <li>
                    <p>نویسنده</p>
                    <h6>{{ post?.user_name }}</h6>
                  </li>
                  <li>
                    <p>تاریخ انتشار</p>
                    <h6>{{ post?.created_at ? new Date(post.created_at).toLocaleDateString('fa-IR') : '' }}</h6>
                  </li>
                  <li>
                    <p>دسته بندی</p>
                    <h6>{{ post?.category_name }}</h6>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-6 col-lg-6">
            <div class="tf__about_img">
              <img :src="post?.image" :alt="post?.title" class="img-fluid w-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="tf__blog_details pt_50 pb_200" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-8">
            <div class="tf__blog_details_left">
              <div class="tf__blog_details_left_text" v-html="marked(String(post?.content))"></div>
              <div class="tf__blog_post_tag d-flex flex-wrap">
                <h6>تگ های پست:</h6>
                <ul class="d-flex flex-wrap" v-if="post?.tags">
                  <li>
                    <NuxtLink
                      v-for="tag in post.tags"
                      :key="tag.slug"
                      :to="`/blog/tag/${tag.slug}`"
                      class="tf__single_blog_link"
                    >
                      {{ tag.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <div class="tf__blog_social_media d-flex flex-wrap justify-content-between">
                <div class="tf__blog_social_link d-flex flex-wrap">
                  <h6>به اشتراک گذاری:</h6>
                  <ul class="d-flex flex-wrap">
                    <li>
                      <a href="#"><i class="fi fi-brands-facebook"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fi fi-brands-twitter"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fi fi-brands-whatsapp"></i></a>
                    </li>
                    <li>
                      <a href="#"><i class="fi fi-brands-telegram"></i></a>
                    </li>
                  </ul>
                </div>
                <ul class="d-flex flex-wrap">
                  <li>
                    <a href="#"><i class="fi fi-rr-link-alt"></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="tf__blog_details_right tf__blog_details_responsib mb-4">
              <h5>جستجو</h5>
              <form>
                <input type="text" placeholder="جستجو کنید..." class="pr_40" />
                <button class="tf__search_icon mt_5">
                  <i class="fi fi-rr-search"></i>
                </button>
              </form>
            </div>
            <div class="tf__blog_details_right mb-4">
              <h5>دسته‌بندی‌ها</h5>
              <ul class="tf__blog_details_categories">
                <li v-for="category in categories" :key="category.id">
                  <NuxtLink :to="`/blog/category/${category.slug}`" class="d-flex justify-content-between">
                    {{ category.name }}<span>({{ category.posts_count }})</span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div class="tf__blog_details_right mb-4">
              <h5>پست‌های محبوب</h5>
              <div class="tf__popular_post d-flex" v-for="popularPost in popularPosts" :key="popularPost.id">
                <div class="tf__popular_post_img">
                  <img :src="popularPost.image" :alt="popularPost.title" />
                </div>
                <div class="tf__popular_post_text">
                  <ul class="d-flex flex-wrap">
                    <li>{{ new Date(popularPost.created_at).toLocaleDateString('fa-IR') }}</li>
                    <li>· {{ popularPost.category_name }}</li>
                  </ul>
                  <NuxtLink :to="`/blog/${popularPost.slug}`">{{ popularPost.title }}</NuxtLink>
                </div>
              </div>
            </div>
            <div class="tf__blog_post_tag tf__blog_details_right">
              <h5>تگ‌ها</h5>
              <ul class="d-flex flex-wrap tf__blog_details_right_link">
                <li v-for="tag in popularTags" :key="tag.slug">
                  <NuxtLink :to="`/blog/tag/${tag.slug}`">{{ tag.name }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tf__blog_details_left_text > * {
  margin: 20px 0;
}
</style>