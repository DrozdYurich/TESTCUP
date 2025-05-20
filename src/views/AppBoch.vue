<template>
  <div
    style="
      max-width: 700px;
      margin: auto;
      text-align: center;
      user-select: none;
      position: relative;
    "
  >
    <!-- Добавлена строка с балансом -->
    <div class="balance" style="margin-bottom: 15px; font-size: 20px">
      💰 Баланс: {{ balance }} рублей
    </div>
    <h2>Игра Яблочки</h2>

    <div style="position: relative; width: 700px">
      <div class="game-area">
        <table ref="tableRef" style="border: none">
          <tbody>
            <tr
              v-for="(row, rowIndex) in cells"
              :key="rowIndex"
              :style="{
                backgroundColor:
                  currentLevel === rowIndex ? '#e0ffe0' : 'transparent',
                fontWeight: currentLevel === rowIndex ? 'bold' : 'normal',
              }"
            >
              <td
                class="coef-cell"
                style="
                  background: none;
                  box-shadow: none;
                  color: #388e3c;
                  font-weight: bold;
                  font-size: 32px;
                  text-align: center;
                  width: 54px;
                  padding-right: 8px;
                "
              >
                x{{ rowCoefficients[rowIndex].toFixed([2]) }}
              </td>
              <td
                v-for="(cell, cellIndex) in row"
                :key="cellIndex"
                @click="handleCellClick(rowIndex, cellIndex)"
                :style="{
                  cursor:
                    currentLevel === rowIndex && gameActive
                      ? 'pointer'
                      : 'default',
                  backgroundColor: getCellColor(rowIndex, cellIndex),
                  color: '#fff',
                  userSelect: 'none',
                  textAlign: 'center',
                  fontSize: '24px',
                  width: '75px',
                  height: '75px',
                  position: 'relative',
                }"
              >
                <Transition name="barrel-fade">
                  <img
                    v-if="isBarrelPlaced(rowIndex, cellIndex)"
                    :src="getBarrelImageByLevel(rowIndex)"
                    alt="Бочонок"
                    style="width: 75px; height: 75px; pointer-events: none"
                    key="barrel"
                  />
                  <span v-else>
                    {{ getCellSymbol(rowIndex, cellIndex) }}
                  </span>
                </Transition>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Падающий бочонок поверх всего поля -->
        <div
          v-if="fallenBarrel"
          class="fallen-barrel-overlay"
          :style="getFallenBarrelStyle"
        >
          <img
            :src="getBarrelImageByLevel(fallenBarrel.level)"
            alt="Падающий бочонок"
            class="fallen-barrel-img"
          />
        </div>
      </div>

      <div class="controls-below-table">
        <label class="bet-label">
          Ставка:
          <input
            type="number"
            v-model.number="betAmount"
            :disabled="gameActive"
            min="10"
            class="bet-input"
          />
        </label>
        <button @click="startGame" :disabled="gameActive" class="main-button">
          Начать игру
        </button>
        <button
          @click="collectWinnings"
          :disabled="!gameActive || winnings === 0"
          class="collect-button"
        >
          Забрать деньги
        </button>
      </div>

      <div v-if="gameActive" class="message-container">
        <div class="current-winnings value-transition">
          Текущий бочонок: {{ maxLevels - currentLevel }} / {{ maxLevels
          }}<br />
          Текущий выигрыш: {{ winnings }} рублей
        </div>
      </div>
      <div v-else class="message-container">
        <div class="message-text">{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from "vue";
import barrel1 from "@/assets/img/Barrels/barrel1.png";
import barrel2 from "@/assets/img/Barrels/barrel2.png";
import barrel3 from "@/assets/img/Barrels/barrel3.png";
import barrel4 from "@/assets/img/Barrels/barrel4.png";
import barrel5 from "@/assets/img/Barrels/barrel5.png";
import barrel6 from "@/assets/img/Barrels/barrel6.png";
import barrel7 from "@/assets/img/Barrels/barrel7.png";
import barrel8 from "@/assets/img/Barrels/barrel8.png";
import barrel9 from "@/assets/img/Barrels/barrel9.png";
import barrel10 from "@/assets/img/Barrels/barrel10.png";

const rowCoefficients = [2.75, 2.5, 2.25, 2.0, 1.75, 1.5, 1.25, 1.0, 0.75, 0.5]; // Пример коэффициентов
// Если нужно, поменяйте значения под вашу механику

const maxLevels = 10;
const cellsPerLevel = 5;
const ripeApplesPerLevel = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

const barrels = [
  barrel1,
  barrel2,
  barrel3,
  barrel4,
  barrel5,
  barrel6,
  barrel7,
  barrel8,
  barrel9,
  barrel10,
];

const balance = ref(1000);
const betAmount = ref(10);
const currentLevel = ref(maxLevels - 1);
const winnings = ref(0);
const gameActive = ref(false);
const message = ref('Нажмите "Начать игру"');

const cells = ref([]);
const openedLevels = ref([]);

const placedBarrels = ref([]);
const selectedCell = ref({ level: null, index: null });

const showCorrectAnimation = ref(false);
const showFallAnimation = ref(false);
const animationPlaying = ref(false);
const fallenBarrel = ref(null); // { level, index }

const tableRef = ref(null);

watch(betAmount, (val) => {
  if (val < 10) betAmount.value = 10;
});

function generateLevelCells(levelIndex) {
  const ripeCount = ripeApplesPerLevel[maxLevels - 1 - levelIndex];
  const arr = Array(ripeCount)
    .fill(true)
    .concat(Array(cellsPerLevel - ripeCount).fill(false));
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startGame() {
  if (balance.value < betAmount.value) {
    message.value = "Недостаточно средств на балансе!";
    return;
  }
  balance.value -= betAmount.value;
  cells.value = [];
  for (let i = 0; i < maxLevels; i++) {
    cells.value.push(generateLevelCells(i));
  }
  currentLevel.value = maxLevels - 1;
  winnings.value = 0;
  message.value = "";
  openedLevels.value = [];
  placedBarrels.value = [];
  selectedCell.value = { level: null, index: null };
  fallenBarrel.value = null;
  gameActive.value = true;
  showCorrectAnimation.value = false;
  showFallAnimation.value = false;
  animationPlaying.value = false;
}

function handleCellClick(levelIndex, cellIndex) {
  if (!gameActive.value || animationPlaying.value) return;
  if (levelIndex !== currentLevel.value) return;
  if (selectedCell.value.level !== null) return;

  selectedCell.value = { level: levelIndex, index: cellIndex };
  animationPlaying.value = true;

  const isRipe = cells.value[levelIndex][cellIndex];
  if (isRipe) {
    showCorrectAnimation.value = true;
    setTimeout(onCorrectAnimationEnd, 100);
  } else {
    showFallAnimation.value = true;
    setTimeout(onFallAnimationEnd, 100);
  }
}

function onCorrectAnimationEnd() {
  if (!openedLevels.value.includes(currentLevel.value)) {
    openedLevels.value.push(currentLevel.value);
  }
  if (currentLevel.value === 0) {
    balance.value += winnings.value; // Добавляем полный выигрыш
    message.value = `Поздравляем! Вы выиграли ${winnings.value} рублей!`;
    gameActive.value = false;
  }
  placedBarrels.value.push({
    level: currentLevel.value,
    index: selectedCell.value.index,
  });

  winnings.value =
    betAmount.value / 4 +
    ((maxLevels - currentLevel.value) * betAmount.value) / 4;

  if (currentLevel.value === 0) {
    message.value = `Поздравляем! Вы выиграли ${winnings.value} рублей!`;
    gameActive.value = false;
  } else {
    currentLevel.value--;
  }
  selectedCell.value = { level: null, index: null };
  showCorrectAnimation.value = false;
  animationPlaying.value = false;
}

function onFallAnimationEnd() {
  // Сохраняем выбранную клетку перед сбросом
  const lastSelected = { ...selectedCell.value };

  message.value = "Вы выбрали огрызок. Игра окончена.";
  winnings.value = 0;
  gameActive.value = false;
  selectedCell.value = { level: null, index: null };
  fallenBarrel.value = lastSelected; // Устанавливаем fallenBarrel
  showFallAnimation.value = false;
  animationPlaying.value = false;
}

function collectWinnings() {
  if (gameActive.value && winnings.value > 0) {
    balance.value += winnings.value; // Добавляем выигрыш к балансу
    alert(
      `Вы забрали ${winnings.value} рублей. Новый баланс: ${balance.value} ₽`
    );
    // Сброс игры
    gameActive.value = false;
    winnings.value = 0;
    message.value = 'Игра окончена. Нажмите "Начать игру" для новой партии.';
    selectedCell.value = { level: null, index: null };
    fallenBarrel.value = null;
  }
}

function getCellColor(levelIndex, cellIndex) {
  // Сначала проверяем проигрыш
  if (
    !gameActive.value &&
    fallenBarrel.value &&
    fallenBarrel.value.level === levelIndex &&
    fallenBarrel.value.index === cellIndex
  ) {
    return "#FF0000"; // Красный
  }

  // Затем проверяем правильные бочонки
  if (isBarrelPlaced(levelIndex, cellIndex)) {
    return "#4CAF50"; // Зеленый
  }

  return "#A0522D"; // Базовый цвет
}

function getCellSymbol(levelIndex, cellIndex) {
  if (openedLevels.value.includes(levelIndex) || !gameActive.value) {
    return cells.value[levelIndex][cellIndex] ? "" : "";
  }
  return "";
}

function isBarrelPlaced(levelIndex, cellIndex) {
  return placedBarrels.value.some(
    (b) => b.level === levelIndex && b.index === cellIndex
  );
}

function getBarrelImageByLevel(levelIndex) {
  return barrels[maxLevels - 1 - levelIndex];
}

// === Для overlay-позиционирования падающего бочонка ===
function getCellPosition(level, index) {
  if (!tableRef.value) return { top: 0, left: 0 };
  const rows = tableRef.value.querySelectorAll("tr");
  if (!rows[level]) return { top: 0, left: 0 };
  // +1, потому что первый td — коэффициент
  const cell = rows[level].children[index + 1];
  if (!cell) return { top: 0, left: 0 };
  const rect = cell.getBoundingClientRect();
  const tableRect = tableRef.value.getBoundingClientRect();
  return {
    top: rect.top - tableRect.top,
    left: rect.left - tableRect.left,
  };
}

const getFallenBarrelStyle = computed(() => {
  if (!fallenBarrel.value) return {};
  const { level, index } = fallenBarrel.value;
  const pos = getCellPosition(level, index);
  return {
    position: "absolute",
    top: `${pos.top}px`,
    left: `${pos.left}px`,
    width: "75px",
    height: "75px",
    pointerEvents: "none",
    zIndex: 20, // высокий z-index
  };
});

onMounted(() => {
  // Если поле ещё не инициализировано (например, после обновления страницы)
  if (!cells.value.length) {
    for (let i = 0; i < maxLevels; i++) {
      cells.value.push(generateLevelCells(i));
    }
  }
});
</script>

<style scoped>
.game-area {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}

.controls-below-table {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 700px;
  margin: 18px auto 0 auto;
  flex-wrap: wrap;
}

.main-button,
.collect-button {
  min-width: 160px;
  padding: 10px 0;
  font-size: 24px;
}

.barrel-fade-enter-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.barrel-fade-leave-active {
  transition: opacity 0.3s ease;
}
.barrel-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.barrel-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.barrel-fade-leave-from {
  opacity: 1;
}
.barrel-fade-leave-to {
  opacity: 0;
}

/* Overlay падающий бочонок */
.fallen-barrel-overlay {
  animation: fall-side-overlay 1s forwards;
  transform-origin: 100% 100%;
}
.fallen-barrel-img {
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes fall-side-overlay {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(45deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: rotate(90deg) scale(1);
    opacity: 1;
  }
}

.animation-overlay {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  pointer-events: none;
  z-index: 10;
}
.animation-overlay img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

table {
  border-collapse: separate;
  border-spacing: 8px; /* Контроль расстояния между ячейками */
  margin: -8px; /* Компенсируем лишние отступы */
}

/* Строки */
tbody tr {
  transition: background 0.3s;
  border-radius: 16px;
}

tbody tr[style*="background-color: #e0ffe0"] {
  background: linear-gradient(90deg, #e0ffe0 60%, #c1ffd1 100%);
  box-shadow: 0 2px 12px #a6ffb8a3;
}

/* Ячейки */
td {
  background: linear-gradient(145deg, #a0522d 60%, #c68642 100%);
  width: 90px !important;
  height: 90px !important;
  font-size: 32px;
  padding: 0 !important; /* Убираем внутренние отступы */
  box-sizing: border-box;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 10px #a0522d44;
  font-size: 26px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  outline: none;
  border: 1px !important;
  user-select: none;
  overflow: hidden;
}

td:hover {
  background: linear-gradient(145deg, #c68642 60%, #a0522d 100%);
  box-shadow: 0 6px 18px #c6864288;
  transform: scale(1.08);
  z-index: 2;
}

/* Открытые/правильные ячейки */
td[style*="background-color: #4CAF50"] {
  background: linear-gradient(145deg, #4caf50 70%, #388e3c 100%) !important;
  box-shadow: 0 0 16px #4caf5077;
  color: #fff;
  font-weight: 700;
}

td[style*="background-color: #FF0000"] {
  background: linear-gradient(145deg, #ff4d4d 70%, #c0392b 100%) !important;
  box-shadow: 0 0 20px #ff4d4daa;
  color: #fff;
  font-weight: 700;
  animation: shake 0.35s;
}

@keyframes shake {
  0% {
    transform: translateX(0px);
  }
  20% {
    transform: translateX(-6px);
  }
  40% {
    transform: translateX(6px);
  }
  60% {
    transform: translateX(-4px);
  }
  80% {
    transform: translateX(4px);
  }
  100% {
    transform: translateX(0px);
  }
}

/* Изображения внутри ячеек */
td img {
  width: 100px;
  height: 100px;
  pointer-events: none;
  user-select: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px #00000022;
  background: #fff6;
  margin: 0 auto;
  display: block;
  transition: transform 0.2s;
}

td:active {
  transform: scale(0.96);
}

/* Адаптивность */
@media (max-width: 500px) {
  td {
    width: 44px !important;
    height: 44px !important;
  }
  td img {
    width: 100px;
    height: 100px;
  }
  table {
    border-spacing: 1px;
    margin: -5px;
  }
}

.balance {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: #2c3e50;
}

/* Общие стили текста */
h2 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

/* Стили для кнопок */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(145deg, #4caf50, #45a049);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(145deg, #45a049, #3d8b40);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.7;
}

/* Стили для инпута */
input[type="number"] {
  padding: 10px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 24px;
  width: auto;
  margin-right: 10px;
  transition: all 0.3s ease;
  outline: none;
}

input[type="number"]:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
}

input[type="number"]:disabled {
  background: #f8f9fa;
  border-color: #d3d3d3;
}

/* Стили для сообщений и выигрыша */
.message-container {
  padding: 18px 22px;
  border-radius: 14px;
  margin-top: 22px;
  background: linear-gradient(135deg, #e0ffe0 60%, #f8f9fa 100%);
  border: 2px solid #b7e7b7;
  box-shadow: 0 4px 14px #a3e63522;
  color: #256029;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px #fff;
}

.current-winnings {
  font-size: 34px;
  color: #27ae60;
  font-weight: 800;
  text-shadow: 0 2px 8px #b7e7b799;
  margin-bottom: 4px;
  letter-spacing: 0.04em;
  transition: color 0.4s, text-shadow 0.4s;
}

/* Улучшенный баланс */
.balance {
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white !important;
  border-radius: 12px;
  padding: 12px 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
}

.balance::after {
  content: " ₽";
  font-weight: bold;
}

/* Анимация для изменяющихся чисел */
.value-transition {
  font-size: 32;
  transition: all 0.5s cubic-bezier(0.5, 1.5, 0.5, 1);
  will-change: color, text-shadow, font-size;
}

.bet-label {
  font-weight: 700;
  color: #388e3c;
  font-size: 34px;
  letter-spacing: 0.03em;
  text-shadow: 0 1px 2px #b7e7b7;
  display: flex;
  align-items: center;
}

.bet-input {
  margin-left: 10px;
  padding: 10px 18px;
  border: 2px solid #b7e7b7;
  border-radius: 10px;
  font-size: 32px;
  font-family: inherit;
  font-weight: 600;
  background: #f8fff8;
  color: #2c3e50;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 8px #b7e7b733;
}

.bet-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px #b7e7b788;
  outline: none;
}

/* Специфичные стили для кнопки "Забрать" */
.collect-button {
  width: 100%;
  align-self: center;
  background: linear-gradient(145deg, #f1c40f, #f39c12);
}

.collect-button:hover {
  background: linear-gradient(145deg, #f39c12, #e67e22);
}
</style>
