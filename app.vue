<template>
  <div
    id="MainBg"
    class="max-h-screen h-screen w-full overflow-hidden flex items-center justify-center"
  >
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
#MainBg {
  background: url("/box-bg-green.png") no-repeat center center;
  background-size: cover;
}
</style>
