// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["~/access/css/main.css"],
  modules: ["@nuxt/ui"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    GEMINI_KEY: process.env.GEMINI_KEY,
    public: {
      GEMINI_KEY: process.env.GEMINI_KEY,
    },
  },
});
