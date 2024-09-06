<template>
  <textarea
    :rows="5"
    :id="id"
    class="py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400"
    :placeholder="placeholder"
    :disabled="isDisabled"
    v-model="model"
    >{{ model }}</textarea
  >
</template>

<script setup lang="ts">
const props = defineProps({
  id: String,
  placeholder: String,
  isDisabled: Boolean,
});
const { id, placeholder, isDisabled } = toRefs(props);

const model = defineModel("input", {
  type: String,
  default: "",
});

const emits = defineEmits(["onChange", "changeDisabled"]);

watch(
  () => isDisabled.value,
  () => {
    if (isDisabled.value) {
      setTimeout(() => emits("changeDisabled", false), 1000);
    }
  }
);
</script>

<style></style>
