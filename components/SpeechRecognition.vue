<template>
  <div>
    <Icon
      name="i-heroicons-microphone"
      :size="22"
      class="text-gray-500 dark:text-gray-400"
      @click="handleVoiceRecording()"
    />
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  setSourceText: [sourceText: string];
}>();

function handleVoiceRecording() {
  console.error("I'm almost not do this feature yet");
}
</script>
