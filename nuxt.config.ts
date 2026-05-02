// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/font/stylesheet.css', '~/assets/css/main.css'],
  devServer: {
    port: 3002
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000',
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
    }
  },
  imports: {
    dirs: ['composables/**', 'utils/**']
  },
  experimental: {
    appManifest: false,
    payloadExtraction: false,
  },
  vite: {
    server: {
      hmr: {
        overlay: false
      },
      watch: {
        usePolling: true,
        interval: 1000
      }
    },
    optimizeDeps: {
      include: [
        'axios', 
        'lucide-vue-next', 
        'firebase/auth',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'firebase/app'
      ]
    }
  },
  nitro: {
    compressPublicAssets: true,
    timing: true
  },
  app: {
    head: {
      title: 'Dobi Cakes | Premium Handcrafted Cakes',
      meta: [
        { name: 'description', content: 'Dobi Cakes — Premium handcrafted cakes for every celebration. Order custom birthday, wedding, and occasion cakes online.' },
        { name: 'theme-color', content: '#1a1a1a' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap' }
      ]
    }
  }
})
