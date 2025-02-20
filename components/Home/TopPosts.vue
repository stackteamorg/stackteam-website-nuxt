<template>
    <section class="tf__content_creator pt_100 pb_100" dir="rtl">
        <div class="container">
            <div class="row">
                <div class="col-xl-8 col-md-8 m-auto">
                    <div class="tf__common_heading">
                        <h6>مقالات جدید دنیای تکنولوژی</h6>
                        <h2 class="tf__common_heading_color">آخرین مقالات و تحلیل‌ها</h2>
                    </div>
                </div>
            </div>
            <div class="tf__content_creator_top">
                <div class="row" v-if="pinnedPosts.length > 0">
                    <div class="col-xl-4 col-lg-5 m-auto">
                        <div class="tf__content_creator_top_img">
                            <img :src="pinnedPosts[0].image" :alt="pinnedPosts[0].title" class="img-fluid w-100" />
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-5 mx-auto">
                        <div class="tf__content_creator_top_text">
                            <h4>{{ pinnedPosts[0].title }}</h4>
                            <p>{{ truncateExcerpt(pinnedPosts[0].excerpt, 150) }}</p>
                            <ul></ul> <!-- Empty UL added here -->
                            <a :href="`/blog/${pinnedPosts[0].slug}`" class="tf__common_btn">
                                مشاهده مقاله
                                <i class="fi fi-rr-arrow-small-left"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tf__content_creator_bottom">
                <div class="row">
                    <div class="col-xl-6 col-lg-6" v-for="(post) in pinnedPosts.slice(1)" :key="post.id">
                        <div class="tf__single_content_creator_bottom">
                            <div class="tf__single_content_creator_bottom_img">
                                <img :src="post.image" :alt="post.title" class="img-fluid w-100" />
                            </div>
                            <div class="tf__single_content_creator_bottom_text">
                                <h4>{{ post.title }}</h4>
                                <p>{{ truncateExcerpt(post.excerpt, 100) }}</p>
                                <a :href="`/blog/${post.slug}`" class="tf__common_btn tf__common_btn2">
                                    مشاهده مقاله
                                    <i class="fi fi-rr-arrow-small-left"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from 'nuxt/app';

interface PinnedPost {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    image: string;
    created_at: string;
    updated_at: string;
}

const pinnedPosts = ref<PinnedPost[]>([]);
const config = useRuntimeConfig();

const truncateExcerpt = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

const fetchPinnedPosts = async () => {
    try {
        const response: PinnedPost[] = await $fetch(`${config.public.apiBase}/api/pinned-posts`);
        pinnedPosts.value = response;
    } catch (error) {
        console.error('خطا در دریافت مقالات ثابت:', error);
    }
};

onMounted(fetchPinnedPosts);
</script>