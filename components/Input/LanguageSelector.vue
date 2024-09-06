<template>
  <span
    class="cursor-pointer rounded-full space-x-1 pl-2 dark:bg-[#000000] border-neutral-500 dark:border-none border flex items-center flex-row"
  >
    <USelect
      v-model="selectedLanguage"
      name="languages"
      icon="i-heroicons-language"
      size="sm"
      color="white"
      :options="languages"
      @change="setLanguage()"
      class="[&_select]:bg-transparent [&_select]:dark:bg-black [&_*]:dark:text-gray-400 [&_select]:ring-0 [&_select:focus]:ring-0"
    />
  </span>
</template>

<script lang="ts" setup>
const props = defineProps<{
  languages: string[];
}>();
const { languages } = toRefs(props);

const selectedLanguage = ref(languages.value[0]);

const emit = defineEmits(["setSelectedLanguage"]);
const setLanguage = () => {
  emit("setSelectedLanguage", selectedLanguage.value);
};
</script>
