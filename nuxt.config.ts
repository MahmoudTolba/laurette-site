// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Laurette Store',
      link: [
        { rel: "icon", type: "image/png", href: "/logo.png" },

        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' },
      ],
      meta: [
        { name: 'description', content: 'Laurette Store' },
      ],
    },
    pageTransition: { name: 'boutique', mode: 'out-in' },
  },
  ssr: true,

  modules: [
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
  ],
  supabase: {
    redirect: false,
  },
})