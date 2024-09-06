<template>
  <div class="mt-10 sm:mt-20">
    <a
      v-for="el in categories"
      :key="el.label"
      class="m-1 py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
      href="#"
    >
      <Icon :name="el.icon" :size="18" />
      {{ el.label }}
    </a>
  </div>
</template>

<script lang="ts" setup>
const categories = [
  { icon: "i-heroicons-briefcase", label: "Business" },
  { icon: "i-heroicons-academic-cap", label: "Education" },
  { icon: "i-heroicons-light-bulb", label: "Creative" },
  { icon: "i-heroicons-heart", label: "Health" },
  { icon: "i-heroicons-pencil", label: "Journaling" },
  { icon: "i-heroicons-face-smile", label: "Communication" },
];
</script>
