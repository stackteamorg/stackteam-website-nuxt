<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Header from "@/components/Header.vue";
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<template>
  <div>
  <TopBar v-if="!isAdminRoute" />
  <Header v-if="!isAdminRoute" />
  <div>
    <NuxtPage />
  </div>
  <Footer v-if="!isAdminRoute" />
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>