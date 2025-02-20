// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useAuth } from '@/composables/useAuth';

export default defineNuxtRouteMiddleware(async (to) => {
  const { checkAuth } = useAuth();
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated && to.path !== '/admin/login') {
    return navigateTo('/admin/login');
  }  

  if (isAuthenticated && to.path === '/admin/login') {
    return navigateTo('/admin');
  }
});