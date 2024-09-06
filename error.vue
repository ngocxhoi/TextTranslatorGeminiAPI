<template>
  <section class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="mb-2 text-9xl font-bold">
      {{ error?.statusCode }}
    </h1>
    <p class="mb-10 text-xl sm:text-3xl">{{ error?.statusMessage }}</p>
    <button
      @click="handleError()"
      class="px-4 py-2 text-white bg-red-400 rounded-md text-lg cursor-pointer"
    >
      Go home
    </button>

    <details v-if="error?.message" class="text-center my-10">
      <summary class="cursor-pointer">Details error</summary>
      <p class="my-2 text-xl sm:text-lg text-yellow-400">
        {{ error.message }}
      </p>
    </details>
  </section>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const { error } = toRefs(props);

const handleError = () => clearError({ redirect: "/" });
</script>

<style></style>
