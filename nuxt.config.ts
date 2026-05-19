// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Laurette Store',
      meta: [
        { name: 'description', content: 'Laurette Store' },
      ],
    },
    pageTransition: { name: 'boutique', mode: 'out-in' },
  },


  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
  ],
})