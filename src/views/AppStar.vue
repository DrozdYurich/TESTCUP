<template>
  <div>
    <div class="container">
      <div style="position: relative; width: 1280px; margin: 0 auto">
        <canvas
          ref="gameCanvas"
          width="1280"
          height="720"
          tabindex="0"
        ></canvas>
        <!-- Оверлей с прокачкой и кнопкой -->
        <div v-if="gameOver || !hasPlayed" class="overlay">
          <div class="upgrade-base">
            <h2>Прокачка ракеты</h2>
            <p>Монетки: {{ coins }}</p>
            <div class="upgrades">
              <button
                @click="upgrade('lives')"
                :disabled="coins < CostUpgrade.lives"
              >
                + Жизни ({{ CostUpgrade.lives }} монет)
              </button>
              <button
                @click="upgrade('fuel')"
                :disabled="coins < CostUpgrade.fuel"
              >
                + Топливо ({{ CostUpgrade.fuel }} монет)
              </button>
              <button
                @click="upgrade('ammo')"
                :disabled="coins < CostUpgrade.ammo"
              >
                + Патроны ({{ CostUpgrade.ammo }} монет)
              </button>
            </div>
            <p>
              Жизни: {{ baseRocket.lives + rocketStats.lives }}, Топливо:
              {{ baseRocket.fuel + rocketStats.fuel * 50 }}, Патроны:
              {{ baseRocket.ammo + rocketStats.ammo }}
            </p>
            <button class="start-btn" @click="handleGameButton">
              {{ gameButtonText }}
            </button>
            <p class="game-over" v-if="gameOver && MaxDaySpins > 0">
              Игра окончена! Прокачайте ракету и начните новый запуск. У вас еще
              {{ MaxDaySpins }} игры
            </p>
            <p class="game-over" v-else-if="!gameOver && MaxDaySpins > 0">
              Привет! Прокачайте ракету и начните игру. У вас
              {{ MaxDaySpins }} игры
            </p>
            <p
              class="game-over"
              v-else-if="MaxDaySpins === 0 && coins >= CostSpin"
            >
              У вас осталось 0 игр. Вы можете начать еще одну игру за
              {{ CostSpin }} монет
            </p>
            <p
              class="game-over"
              v-else-if="MaxDaySpins === 0 && coins < CostSpin"
            >
              У вас осталось 0 игр. Вы можете начать еще одну игру за
              {{ CostSpin }} монет если пополните баланс
            </p>
            <div>Передвижение: стрелки вправо/влево. Стрельба: пробел.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";

const gameCanvas = ref(null);
let ctx = null;
let ProveSpaceButton = true;
let baseRocket;
let CostUpgrade;

const lastShotTime = ref(Date.now());
const reloadDuration = 1000; // 1 секунда

const MaxDaySpins = ref(2);
const CostSpin = ref(10);
const CoefSpin = ref(1);

const PersonStatus = ref("VIP");

// Базовые параметры ракеты
if (PersonStatus.value === "common") {
  baseRocket = {
    lives: 3,
    fuel: 150,
    ammo: 5,
  };
  CostUpgrade = {
    lives: 10,
    fuel: 10,
    ammo: 10,
  };
} else {
  baseRocket = {
    lives: 5,
    fuel: 200,
    ammo: 10,
  };
  CostUpgrade = {
    lives: 7,
    fuel: 7,
    ammo: 7,
  };
}

// Прокачка
const rocketStats = reactive({
  lives: 0,
  fuel: 0,
  ammo: 0,
});

// Текущие параметры ракеты для раунда
const rocket = reactive({
  x: 620,
  y: 600,
  width: 60,
  height: 120,
  lives: baseRocket.lives,
  fuel: baseRocket.fuel,
  ammo: baseRocket.ammo,
});

const coins = ref(10);
const gameRunning = ref(false);
const gameOver = ref(false);
const hasPlayed = ref(false);

const meteors = reactive([]);
const bullets = reactive([]);
const pickups = reactive([]);

let animationFrameId = null;
const keysPressed = reactive({
  ArrowLeft: false,
  ArrowRight: false,
  Space: false,
});

// Звуки

const audioPiu = new Audio();
const AudioPiuUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Piu.mp3",
  import.meta.url
).href;
audioPiu.src = AudioPiuUrl;

const audioAlert = new Audio();
const AudioAlertUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Alert.mp3",
  import.meta.url
).href;
audioAlert.src = AudioAlertUrl;

const audioBurst = new Audio();
const AudioBurstUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Burst.mp3",
  import.meta.url
).href;
audioBurst.src = AudioBurstUrl;

const audioBurstRocket = new Audio();
const AudioBurstRocketUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/BurstRocket.mp3",
  import.meta.url
).href;
audioBurstRocket.src = AudioBurstRocketUrl;

const audioFuelLost = new Audio();
const AudioFuelLostUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/FuelLost.mp3",
  import.meta.url
).href;
audioFuelLost.src = AudioFuelLostUrl;

const audioFlyingRocket = new Audio();
const AudioFlyingRocketUrl = new URL(
  "@/assets/FlyingRocket.mp3",
  import.meta.url
).href;
audioFlyingRocket.src = AudioFlyingRocketUrl;

const audioMoney = new Audio();
const AudioMoneyUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Money.mp3",
  import.meta.url
).href;
audioMoney.src = AudioMoneyUrl;

// SVG изображения
const rocketImg = new Image();
const rocketUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Rocket.png",
  import.meta.url
).href;
rocketImg.src = rocketUrl;

const meteorImg = new Image();
const meteorUrl = new URL(
  "/home/drozd/Общедоступные/front/TESTCUP/src/assets/img/Meteorit.png",
  import.meta.url
).href;
meteorImg.src = meteorUrl;

const coinImg = new Image();
coinImg.src =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64"><circle fill="gold" cx="32" cy="32" r="30"/></svg>';

const bulletImg = new Image();
bulletImg.src =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 64 128"><rect fill="yellow" width="10" height="20"/></svg>';

// Кнопка: текст зависит от состояния
const gameButtonText = computed(() => {
  if (!hasPlayed.value) return "Начать игру";
  if (gameOver.value && !gameRunning.value) return "Продолжить игру";
  return "Игра идёт...";
});

// Изменение стоимости в заваисимости от уровня рокеты

function AddCostSpin() {
  CostSpin.value += Math.floor(CostSpin.value * CoefSpin.value);
}

function AddCostStatus(param) {
  CostUpgrade[param] += Math.floor(
    CostUpgrade[param] * 2 * (rocketStats[param] + 1)
  );
}
// Прокачка
function upgrade(param) {
  if (coins.value >= CostUpgrade[param]) {
    coins.value -= CostUpgrade[param];
    rocketStats[param] += 1;
  }
  AddCostStatus(param);
}

// Применить прокачку к параметрам ракеты
function applyRocketStats() {
  rocket.lives = baseRocket.lives + rocketStats.lives;
  rocket.fuel = baseRocket.fuel + rocketStats.fuel * 50;
  rocket.ammo = baseRocket.ammo + rocketStats.ammo;
}

// Одна кнопка: старт или продолжить
function handleGameButton() {
  audioBurstRocket.pause();
  audioFuelLost.pause();
  if (MaxDaySpins.value > 0) {
    MaxDaySpins.value--;
    if (gameRunning.value) return;
    rocket.x = 620;
    rocket.y = 500;
    applyRocketStats();
    resetGameObjects();
    gameRunning.value = true;
    gameOver.value = false;
    hasPlayed.value = true;
    gameLoop();
    gameCanvas.value.focus();
  } else if (MaxDaySpins.value === 0 && coins.value >= CostSpin.value) {
    coins.value -= CostSpin.value;
    CoefSpin.value++;
    AddCostSpin();
    if (gameRunning.value) return;
    rocket.x = 620;
    rocket.y = 500;
    applyRocketStats();
    resetGameObjects();
    gameRunning.value = true;
    gameOver.value = false;
    hasPlayed.value = true;
    gameLoop();
    gameCanvas.value.focus();
  } else {
    alert("Монетки закончились, пополните баланс");
  }
}

// Сброс объектов, но не монет и прокачки
function resetGameObjects() {
  meteors.splice(0, meteors.length);
  bullets.splice(0, bullets.length);
  pickups.splice(0, pickups.length);
  cancelAnimationFrame(animationFrameId);
  clearCanvas();
}

function gameLoop() {
  if (!gameRunning.value) return;

  update();
  draw();
  audioFlyingRocket.loop = true;
  audioFlyingRocket.play();
  if (rocket.lives === 1) audioAlert.play();

  if (rocket.fuel <= 0 || rocket.lives <= 0) {
    audioAlert.pause();
    audioBurst.pause();
    audioFlyingRocket.pause();
    if (rocket.lives <= 0) {
      audioBurstRocket.pause();
      audioBurstRocket.currentTime = 0;
      audioBurstRocket.play();
    } else if (rocket.fuel <= 0) {
      audioFuelLost.pause();
      audioFuelLost.currentTime = 0;
      audioFuelLost.play();
    }

    gameOver.value = true;
    gameRunning.value = false;
    return;
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function update() {
  rocket.fuel -= 0.15;
  if (rocket.fuel < 0) rocket.fuel = 0;

  if (keysPressed.ArrowLeft) rocket.x = Math.max(0, rocket.x - 8);
  if (keysPressed.ArrowRight)
    rocket.x = Math.min(gameCanvas.value.width - rocket.width, rocket.x + 8);

  if (keysPressed.Space) {
    shoot();
    keysPressed.Space = false;
  }

  for (let i = meteors.length - 1; i >= 0; i--) {
    const m = meteors[i];
    m.y += m.speed;
    if (m.y > gameCanvas.value.height) {
      meteors.splice(i, 1);
      continue;
    }
    if (rectIntersect(m, rocket)) {
      meteors.splice(i, 1);
      rocket.lives--;
      audioBurst.currentTime = 0;
      audioBurst.play();
      if (rocket.lives < 0) rocket.lives = 0;
    }
  }

  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.y -= b.speed;
    if (b.y + b.height < 0) {
      bullets.splice(i, 1);
      continue;
    }
    for (let j = meteors.length - 1; j >= 0; j--) {
      if (rectIntersect(b, meteors[j])) {
        meteors.splice(j, 1);
        bullets.splice(i, 1);
        audioBurst.currentTime = 0;
        audioBurst.play();
        coins.value += 1;
        break;
      }
    }
  }

  for (let i = pickups.length - 1; i >= 0; i--) {
    const p = pickups[i];
    p.y += p.speed;
    if (p.y > gameCanvas.value.height) {
      pickups.splice(i, 1);
      continue;
    }
    if (rectIntersect(p, rocket)) {
      audioMoney.pause();
      audioMoney.currentTime = 0;
      audioMoney.play();
      coins.value += 2;
      pickups.splice(i, 1);
    }
  }

  if (Math.random() < 0.03) {
    meteors.push({
      x: Math.random() * (gameCanvas.value.width - 30),
      y: -30,
      width: 30,
      height: 30,
      speed: 2 + Math.random() * 2,
    });
  }
  if (Math.random() < 0.015) {
    pickups.push({
      x: Math.random() * (gameCanvas.value.width - 20),
      y: -20,
      width: 20,
      height: 20,
      speed: 1.5,
    });
  }
}

function draw() {
  clearCanvas();

  // === STATUS BAR ===
  // Размеры и позиции
  const barX = 20;
  const barY = 20;
  const barWidth = 200;
  const barHeight = 24;
  const spacing = 10;

  // === Дальше ваш старый draw ===

  if (rocketImg.complete) {
    ctx.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
  } else {
    ctx.fillStyle = "blue";
    ctx.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);
  }

  meteors.forEach((m) => {
    if (meteorImg.complete) {
      ctx.drawImage(meteorImg, m.x, m.y, m.width, m.height);
    } else {
      ctx.fillStyle = "gray";
      ctx.fillRect(m.x, m.y, m.width, m.height);
    }
  });

  bullets.forEach((b) => {
    if (bulletImg.complete) {
      ctx.drawImage(bulletImg, b.x, b.y, b.width, b.height);
    } else {
      ctx.fillStyle = "yellow";
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
  });

  pickups.forEach((p) => {
    if (coinImg.complete) {
      ctx.drawImage(coinImg, p.x, p.y, p.width, p.height);
    } else {
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.arc(
        p.x + p.width / 2,
        p.y + p.height / 2,
        p.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  });

  // Жизни (красная полоса)
  ctx.fillStyle = "#333";
  ctx.fillRect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = "#e74c3c";
  const maxLives = baseRocket.lives + rocketStats.lives;
  ctx.fillRect(barX, barY, barWidth * (rocket.lives / maxLives), barHeight);
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = "#fff";
  ctx.font = "bold 16px Arial";
  ctx.fillText(`Жизни: ${rocket.lives} / ${maxLives}`, barX + 8, barY + 17);

  // Топливо (зелёная полоса)
  ctx.fillStyle = "#333";
  ctx.fillRect(barX, barY + barHeight + spacing, barWidth, barHeight);
  ctx.fillStyle = "#27ae60";
  const maxFuel = baseRocket.fuel + rocketStats.fuel * 50;
  ctx.fillRect(
    barX,
    barY + barHeight + spacing,
    barWidth * (rocket.fuel / maxFuel),
    barHeight
  );
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(barX, barY + barHeight + spacing, barWidth, barHeight);
  ctx.fillStyle = "#fff";
  ctx.fillText(
    `Топливо: ${Math.round(rocket.fuel)} / ${maxFuel}`,
    barX + 8,
    barY + barHeight + spacing + 17
  );

  // Патроны (жёлтая полоса)
  ctx.fillStyle = "#333";
  ctx.fillRect(barX, barY + 2 * (barHeight + spacing), barWidth, barHeight);
  ctx.fillStyle = "#f1c40f";
  const maxAmmo = baseRocket.ammo + rocketStats.ammo;
  ctx.fillRect(
    barX,
    barY + 2 * (barHeight + spacing),
    barWidth * (rocket.ammo / maxAmmo),
    barHeight
  );
  ctx.strokeStyle = "#fff";
  ctx.strokeRect(barX, barY + 2 * (barHeight + spacing), barWidth, barHeight);
  ctx.fillStyle = "#fff";
  ctx.fillText(
    `Патроны: ${rocket.ammo} / ${maxAmmo}`,
    barX + 8,
    barY + 2 * (barHeight + spacing) + 17
  );

  ctx.fillText("Монетки - " + coins.value, barX, barY * 7);

  // Круг перезарядки
  const reloadProgress = (Date.now() - lastShotTime.value) / reloadDuration;
  if (reloadProgress < 1) {
    const circleX = barX + barWidth + 25;
    const circleY = barY + 2 * (barHeight + spacing) + barHeight / 2;
    const radius = 12;

    // Фон круга
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    // Прогресс
    ctx.beginPath();
    ctx.arc(
      circleX,
      circleY,
      radius,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * reloadProgress
    );
    ctx.strokeStyle = "#27ae60";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);
}

function rectIntersect(a, b) {
  return !(
    b.x > a.x + a.width ||
    b.x + b.width < a.x ||
    b.y > a.y + a.height ||
    b.y + b.height < a.y
  );
}

function shoot() {
  const now = Date.now();
  if (rocket.ammo > 0 && now - lastShotTime.value >= reloadDuration) {
    audioPiu.play();
    bullets.push({
      x: rocket.x + rocket.width / 2 - 5,
      y: rocket.y,
      width: 10,
      height: 20,
      speed: 7,
    });
    rocket.ammo--;
    lastShotTime.value = now;
  }
}

function handleKeyDown(e) {
  if (e.code === "ArrowLeft") keysPressed.ArrowLeft = true;
  if (e.code === "ArrowRight") keysPressed.ArrowRight = true;
  if (e.code === "Space" && ProveSpaceButton) {
    e.preventDefault();
    keysPressed.Space = true;
    ProveSpaceButton = false;
  }
}

function handleKeyUp(e) {
  if (e.code === "ArrowLeft") keysPressed.ArrowLeft = false;
  if (e.code === "ArrowRight") keysPressed.ArrowRight = false;
  if (e.code === "Space") {
    e.preventDefault();
    keysPressed.Space = false;
    ProveSpaceButton = true;
  }
}

onMounted(() => {
  ctx = gameCanvas.value.getContext("2d");
  gameCanvas.value.focus();

  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});
</script>

<style scoped>
.container {
  max-width: 1280px;
  margin: 0 auto;
}

/* === Основной оверлей === */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
}

.upgrade-base {
  background-color: var(--card-background-color);
  border-left: 6px solid var(--card-border-left); /* Золотая полоса слева */
  box-shadow: var(--box-shadow);
  padding: 2rem 3rem;
  text-align: center;
  border-radius: 16px;
  max-width: 600px;
  transition: all 0.3s ease;
  color: var(--text-color);
}

.upgrade-base h2 {
  font-size: 2rem;
  color: var(--card-color-content);
  margin-bottom: 1rem;
}

/* === Кнопки прокачки и старт === */
.upgrades button {
  margin: 0 0.5rem;
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--button-bg);
  color: black;
  transition: all 0.3s ease;
}
.upgrades button:hover:not(:disabled) {
  transform: scale(1.05);
  background-color: gold;
}

.upgrades button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.start-btn {
  margin-top: 1.5rem;
  padding: 0.7rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: var(--card-color-content);
  color: black;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
}
.start-btn:hover {
  background-color: gold;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 215, 0, 0.6);
}

/* === Канвас игры === */
canvas {
  border: 4px solid var(--card-border-left);
  background-color: #000;
  display: block;
  margin: 0 auto;
  outline: none;
  border-radius: 12px;
}

/* === Статус-бар сверху === */
.status-bar {
  position: relative;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  margin: 1rem auto;
  max-width: 900px;
}

.bar {
  flex: 1;
  background-color: #1a1a1a;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
  position: relative;
}

.bar-fill {
  height: 24px;
  position: relative;
  z-index: 1;
}
.bar-fill::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    90deg,
    transparent 25%,
    rgba(255, 255, 255, 0.1)
  );
  animation: progressAnim 1s linear infinite;
}
@keyframes progressAnim {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 50px 0;
  }
}

.bar-life .bar-fill {
  background: linear-gradient(to right, #e74c3c, #c0392b);
}
.bar-fuel .bar-fill {
  background: linear-gradient(to right, #27ae60, #16a085);
}
.bar-ammo .bar-fill {
  background: linear-gradient(to right, #f1c40f, #f39c12);
}

.bar-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.reload-circle {
  position: absolute;
  top: 50px;
  left: 300px;
  width: 30px;
  height: 30px;
  border: 3px solid #444;
  border-top-color: #27ae60;
  border-radius: 50%;
  animation: reload-spin 1s linear infinite;
  display: inline-block;
}
@keyframes reload-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.game-over {
  margin-top: 1.5rem;
  color: var(--card-color-content);
  font-size: 1.2rem;
  font-weight: bold;
}

.instructions {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--card-subtext-color);
}
</style>
