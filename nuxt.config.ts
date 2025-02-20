// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app
  : {
      pageTransition
  : { name
  : 'page', mode
  : 'out-in' }
    },

  buildModules: [
    '@nuxt/typescript-build',
  ],

  css: [
    '@/public/main.css'
  ],
  runtimeConfig: {
      public: {
          apiBase: process.env.NUXT_PUBLIC_API_BASE,
          baseUrl: process.env.BASE_URL
      }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost'
      },
      '/sanctum': {
        target: process.env.NUXT_PUBLIC_API_BASE,
        changeOrigin: true,
        secure: false,
        cookieDomainRewrite: 'localhost'
      }
    }
  }
})