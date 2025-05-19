<template>
  <div class="statistic-container">
    <div class="stats-grid">
      <div class="stat-card primary">
        <div class="stat-header">
          <span class="text-[var(--text-color)]">Всего игр</span>
          <i class="pi pi-ticket stat-icon"></i>
        </div>
        <div class="stat-value">{{ stats.totalGames }}</div>
        <div class="stat-subtext">Розыгрыши за всё время</div>
      </div>
      <div class="stat-card success">
        <div class="stat-header">
          <span>Выиграно всего</span>
          <i class="pi pi-dollar stat-icon"></i>
        </div>
        <div class="stat-value">{{ formatMoney(stats.totalWin) }}</div>
        <div class="stat-subtext">Сумма всех призов</div>
      </div>
      <div class="stat-card info">
        <div class="stat-header">
          <span>Участники</span>
          <i class="pi pi-users stat-icon"></i>
        </div>
        <div class="stat-value">{{ stats.totalPlayers }}</div>
        <div class="stat-subtext">Все пользователи</div>
      </div>

      <div class="stat-card warning">
        <div class="stat-header">
          <span>Средний выигрыш</span>
          <i class="pi pi-chart-line stat-icon"></i>
        </div>
        <div class="stat-value">{{ formatMoney(stats.avgWin) }}</div>
        <div class="stat-subtext">На одного игрока</div>
      </div>

      <div class="stat-card danger">
        <div class="stat-header">
          <span>Рекордный выигрыш</span>
          <i class="pi pi-trophy stat-icon"></i>
        </div>
        <div class="stat-value">{{ formatMoney(stats.maxWin) }}</div>
        <div class="stat-subtext">Один участник</div>
      </div>

      <div class="stat-card secondary">
        <div class="stat-header">
          <span>Популярная лотерея</span>
          <i class="pi pi-star-fill stat-icon"></i>
        </div>
        <div class="stat-value">{{ stats.mostPopularLottery.title }}</div>
        <div class="stat-subtext">
          Тираж {{ stats.mostPopularLottery.edition }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

// Пример данных (в реальности можно получать из API)
const stats = reactive({
  totalGames: 150,
  totalWin: 4500000,
  totalPlayers: 89200,
  avgWin: 50672,
  maxWin: 1250000,
  mostPopularLottery: {
    title: "Золотой ключ",
    edition: "LOT-2024",
  },
});

// Форматирование чисел
function formatMoney(value) {
  return value.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });
}
</script>

<style scoped>
.statistic-container {
  max-width: 1000px;
  margin: 1rem auto;
}

.statistic-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-areas:
    "primary success success"
    "info warning secondary"
    "danger danger danger";
  grid-template-columns: 1fr 1fr 1fr; /* Явное определение 3 колонок */
  gap: 1.5rem;
}
.primary {
  grid-area: primary;
}
.success {
  grid-area: success;
}
.info {
  grid-area: info;
}
.warning {
  grid-area: warning;
}
.secondary {
  grid-area: secondary;
}
.danger {
  grid-area: danger;
}
.stat-card {
  background-color: var(--card-background-color);
  border: 4px solid var(--border-color);
  border-left: 14px solid var(--border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.3);
}

/* Цвета для разных типов карточек */
.stat-card.primary .stat-header .stat-icon {
  color: var(--card-border-color);
}
.stat-card.success .stat-header .stat-icon {
  color: #4caf50;
}
.stat-card.info .stat-header .stat-icon {
  color: #2196f3;
}
.stat-card.warning .stat-header .stat-icon {
  color: #ff9800;
}
.stat-card.danger .stat-header .stat-icon {
  color: #e53935;
}
.stat-card.secondary .stat-header .stat-icon {
  color: #9c27b0;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
}

.stat-subtext {
  font-size: 0.875rem;
  color: var(--card-subtext-color);
  margin-top: 0.25rem;
}
</style>
