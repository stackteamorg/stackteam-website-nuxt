// composables/useAuth.ts
import { navigateTo, useCookie, useState, useRuntimeConfig } from 'nuxt/app';
import { readonly } from 'vue';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const apiBase = String(config.public.apiBase); // Ensure type safety
  const baseUrl = String(config.public.baseUrl); // Explicitly cast to string

  const csrfToken = String(useCookie('XSRF-TOKEN').value);
  const user = useState<any | null>('user', () => null);

  const checkAuth = async (): Promise<boolean> => {
    try {
      await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: 'include',
        headers: {
          'Origin': baseUrl, // No more TypeScript errors! 🎉
        }
      });

      const response = await $fetch<any>(`${apiBase}/api/user`, {
        credentials: 'include',
        headers: {
          'Origin': baseUrl,
          'Accept': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
        }
      });

      user.value = response;
      return true;
    } catch (error: any) {
      const status = error.response?.status || error.statusCode;
      if (status === 302 || status === 401) {
        user.value = null;
        return false;
      }
      user.value = null;
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await $fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: 'include',
        headers: {
          'Origin': baseUrl
        }
      });

      await $fetch(`${apiBase}/login`, {
        method: 'POST',
        body: { email, password },
        credentials: 'include',
        headers: {
          'Origin': baseUrl,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      return await checkAuth();
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    await $fetch(`${apiBase}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Origin': baseUrl,
        'X-XSRF-TOKEN': csrfToken
      }
    });
    user.value = null;
    await navigateTo('/login');
  };

  return {
    user: readonly(user),
    checkAuth,
    login,
    logout
  };
};