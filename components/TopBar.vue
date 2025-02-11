<template>
    <div class="tf__topbar" dir="rtl">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <p v-if="topBar">
              {{ topBar.content }}
              <a v-if="topBar.link" :href="topBar.link">
                {{ topBar.button_name }}
                <i class="fi fi-rr-arrow-small-left"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRuntimeConfig } from 'nuxt/app';
  
  // اینترفیس پاسخ API برای TopBar
  interface TopBarResponse {
    id: number;
    content: string;
    button_name: string;
    link: string;
    created_at: string;
    updated_at: string;
  }
  
  const topBar = ref<TopBarResponse | null>(null);
  const config = useRuntimeConfig();
  
  const fetchTopBar = async () => {
    try {
      const response: TopBarResponse = await $fetch(`${config.public.apiBase}/top-bar`);
      topBar.value = response;
    } catch (error) {
      console.error('خطا در دریافت اطلاعات نوار بالا:', error);
    }
  };
  
  onMounted(fetchTopBar);
  </script>  