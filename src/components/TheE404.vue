<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 py-24 sm:py-32 lg:px-8"
  >
    <p class="text-base font-semibold text-orange-600">404</p>
    <h1
      class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl"
    >
      Страница не найдена
    </h1>
    <p class="mt-6 text-base text-gray-600 max-w-lg text-center">
      Извините, но запрашиваемая страница не существует или была удалена
    </p>
    <div class="mt-10">
      <RouterLink
        :to="{ name: 'home' }"
        class="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus:outline-none"
        >Вернутся на главную</RouterLink
      >
    </div>
  </main>
</template>
<script setup></script>
<style scoped></style>
