<template>
  <main class="error-page">
    <div class="error-container">
      <!-- Код ошибки -->
      <p class="error-code">404</p>

      <!-- Заголовок -->
      <h1 class="error-title">Страница не найдена</h1>

      <!-- Описание -->
      <p class="error-description">
        Извините, но запрашиваемая страница не существует или была удалена.
      </p>

      <!-- Кнопка "На главную" -->
      <RouterLink :to="{ name: 'home' }" class="theme-button mt-6">
        Вернуться на главную
      </RouterLink>
    </div>
  </main>
</template>

<script setup></script>

<style scoped>
.error-page {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-container {
  max-width: 500px;
  text-align: center;
  margin: auto;
}

.error-code {
  font-size: 2rem;
  font-weight: bold;
  color: var(--card-border-color); /* Золотой */
}

.error-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--text-color);
  margin-top: 1rem;
}

.error-description {
  font-size: 1rem;
  color: var(--card-subtext-color);
  margin-top: 1.5rem;
}

.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.theme-button:hover {
  filter: brightness(90%);
}
</style>
