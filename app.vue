<script setup lang="ts">
import Header from "@/components/Header.vue";
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <TopBar />
  <Header />
  <div>
    <NuxtPage />
  </div>
  <Footer />
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