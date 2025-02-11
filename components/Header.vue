<template>
  <nav class="navbar navbar-expand-lg tf__main_menu bg-white" dir="rtl">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">استک تیم</a>
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarSupportedContent"
        :aria-expanded="isMenuOpen" aria-label="Toggle navigation">
        <i v-if="!isMenuOpen" class="fi fi-rr-menu-burger"></i>
        <i v-else class="fi fi-rr-cross"></i>
      </button>
      <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav m-auto">
          <li class="nav-item">
            <a class="nav-link active" href="/">صفحه اصلی</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/process">فرآیند همکاری</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">درباره ما</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/technologies">تکنولوژی ها</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">خدمات سایت</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="contact.html">بلاگ</a>
          </li>
        </ul>
        <ul class="tf__menu_btn d-flex flex-wrap align-items-center">
          <li><a href="signup.html" class="tf__menu_2nd_btn">درخواست همکاری</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style>
.navbar-toggler {
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.navbar-collapse {
  transition: all 0.3s ease-in-out;
}

.collapse:not(.show) {
  display: none;
}

@media (max-width: 992px) {
  .navbar-collapse {
    display: block;
  }
}
</style>