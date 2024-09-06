<template>
  <div
    class="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#afd89d] dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]"
  ></div>

  <div class="relative overflow-hidden h-screen">
    <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
      <div class="text-center">
        <h1
          class="text-4xl sm:text-6xl font-bold text-[#afd89d] dark:text-neutral-200"
        >
          Trans<span class="text-[#f87315]">Speak</span>
        </h1>

        <p class="mt-3 dark:text-neutral-400">
          TransSpeak: Using Bing, Play with word.
        </p>

        <div class="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
          <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
            <div
              class="elative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700 shadow-gray-900/20"
            >
              <InputTextArea
                :isDisabled="isDisabled"
                @changeDisabled="turnOfDisabled"
                id="source-language"
                v-model:input="sourceText"
                placeholder="Source Language"
                @input="debounce()"
              />
              <div class="flex flex-row justify-between w-full mt-2">
                <span class="cursor-pointer flex space-x-2 flex-row">
                  <SpeechRecognition @setSourceText="setSourceTextFun" />
                  <Icon
                    name="i-heroicons-speaker-wave"
                    size="22"
                    @click="handleAudioPlayback(sourceText, 0)"
                    :class="{ 'text-primary-500': isSpeakSourceText }"
                    class="text-gray-500 dark:text-gray-400"
                  />
                  <!-- <FileUpload handleFileUpload="{handleFileUpload}" /> -->
                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-clipboard"
                    size="22"
                    @click="handleInputPaste"
                  />
                  <span v-if="pasted" class="text-xs text-green-500"
                    >Pasted!</span
                  >
                </span>
                <span class="text-sm pr-4 text-gray-500 dark:text-gray-400">
                  {{ sourceText.length }} / 2000
                </span>
              </div>
            </div>

            <div
              class="relative z-10 flex flex-col space-x-3 p-3 border rounded-lg shadow-lg dark:bg-neutral-900 dark:border-neutral-700 shadow-gray-900/20"
            >
              <InputTextArea
                id="target-language"
                v-model:input="targetText"
                @onChange="onChange()"
                placeholder="Target Language"
              />
              <div class="flex flex-row justify-between w-full mt-2">
                <span
                  class="cursor-pointer flex items-center space-x-2 flex-row"
                >
                  <InputLanguageSelector
                    @setSelectedLanguage="setSelectedLanguage"
                    :languages="languages"
                  />
                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-speaker-wave"
                    size="22"
                    @click="handleAudioPlayback(targetText, 1)"
                    :class="{ 'text-primary-500': isSpeakTargetText }"
                  />
                </span>
                <div
                  class="flex flex-row items-center space-x-2 pr-4 cursor-pointer"
                >
                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-clipboard-document"
                    size="22"
                    @click="handleCopyToClipboard(targetText)"
                    :class="{ 'text-primary-500': copied }"
                  />
                  <span v-if="copied" class="text-xs text-green-500"
                    >Copied!</span
                  >

                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-hand-thumb-up"
                    size="22"
                    @click="handleLike()"
                  />
                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-hand-thumb-down"
                    size="22"
                    @click="handleDislike()"
                  />

                  <Icon
                    class="text-gray-500 dark:text-gray-400"
                    name="i-heroicons-star"
                    size="22"
                    @click="handleFavorite()"
                    :class="{ 'text-yellow-500': favorite }"
                  />
                </div>
              </div>
            </div>
          </div>

          <SvgDecorations />
        </div>

        <CategoryLinks />
        <ColorMode />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
enum TypeSpeak {
  Source = 0,
  Target = 1,
}

const config = useRuntimeConfig();

const refValue = ref<string>("");
const sourceText = ref<string>("");
const copied = ref<boolean>(false);
const pasted = ref<boolean>(false);
const favorite = ref<boolean>(false);
const languages = ref<string[]>([
  "Spanish",
  "English",
  "French",
  "German",
  "Chinese",
]);
const isDisabled = ref<boolean>(false);
const selectedLanguage = ref<string>("Spanish");
const targetText = ref<string | undefined>("");
const isSpeakSourceText = ref<boolean>(false);
const isSpeakTargetText = ref<boolean>(false);

function onChange() {}

async function handleDebounceType() {
  const data = await useTranslate(sourceText.value, selectedLanguage.value);
  targetText.value = data;
}

const debounce = useDebounce(handleDebounceType, 1000);

function setSelectedLanguage(language: string) {
  selectedLanguage.value = language;
  debounce();
}

function turnOfDisabled(bool: boolean) {
  isDisabled.value = bool;
}

function handleAudioPlayback(text: string = "", type: TypeSpeak): void {
  if (type == 0) isSpeakSourceText.value = true;
  else isSpeakTargetText.value = true;
  const speak = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(speak);
  setTimeout(() => {
    isSpeakSourceText.value = false;
    isSpeakTargetText.value = false;
  }, 2000);
}

function handleCopyToClipboard(text: string = "") {
  navigator.clipboard.writeText(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}
async function handleInputPaste(event: any) {
  pasted.value = true;
  // const text = (event.target as HTMLInputElement).value;
  // sourceText.value = text;
  const text = await navigator.clipboard.readText();
  if (sourceText.value) {
    sourceText.value = sourceText.value.trim() + " " + text;
  } else sourceText.value = text;

  setTimeout(() => (pasted.value = false), 2000);

  debounce();
}

function handleLike() {}

function handleDislike() {}

function handleFavorite() {
  favorite.value = !favorite.value;
}

function setSourceTextFun(sourceText: string) {}

// That below function is for limit text input
// watch(
//   () => sourceText.value,
//   () => {
//     if (sourceText.value.length > 20) {
//       isDisabled.value = true;
//       sourceText.value = sourceText.value.slice(0, -1);
//       console.log(sourceText.value);
//     } else isDisabled.value = false;
//   }
// );
</script>

<style></style>
