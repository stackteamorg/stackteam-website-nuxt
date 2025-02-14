<template>
  <nav class="navbar navbar-expand-lg tf__main_menu bg-white" dir="rtl">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">استک تیم</NuxtLink>
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarSupportedContent"
        :aria-expanded="isMenuOpen" aria-label="Toggle navigation">
        <i v-if="!isMenuOpen" class="fi fi-rr-menu-burger"></i>
        <i v-else class="fi fi-rr-cross"></i>
      </button>
      <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto">
          <li v-for="link in navLinks" :key="link.to" class="nav-item">
            <NuxtLink :to="link.to" class="nav-link" :class="{ active: route.path === link.to }">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
        <ul class="tf__menu_btn d-flex flex-wrap align-items-center">
          <li>
            <NuxtLink to="/signup" class="tf__menu_2nd_btn">درخواست همکاری</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

const navLinks = [
  { to: "/", label: "صفحه اصلی" },
  { to: "/process", label: "فرآیند همکاری" },
  { to: "/about", label: "درباره ما" },
  { to: "/technologies", label: "تکنولوژی‌ها" },
  { to: "/services", label: "خدمات ما" },
  { to: "/blog", label: "بلاگ" },
];
</script>