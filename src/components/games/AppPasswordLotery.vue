<template>
  <div class="flex flex-col">
    <div v-if="loading">
      <ProgressBar
        class="custom-progressbar"
        mode="indeterminate"
        style="height: 5px"
      />
    </div>
    <div class="phone-container">
      <div class="phone">
        <div class="screen">
          <svg class="lines">
            <path
              v-for="(line, index) in lines"
              :key="index"
              :d="line"
              stroke="rgb(255,160,0)"
              stroke-width="8"
              fill="none"
            />
          </svg>
          <div class="points-container">
            <div
              v-for="point in 9"
              :key="point"
              class="point"
              :class="{ active: selectedPoints.includes(point) }"
              @click="selectPoint(point)"
              :style="getPointPosition(point)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-3">
      <Button severity="warn" :disabled="!CheckSixPoint" @click="rublBy"
        >Купить за рубли</Button
      >
      <Button severity="warn" :disabled="!CheckSixPoint" @click="coinBy"
        >Купить за ЛотКоин</Button
      >
      <Button severity="warn" @click="Reset">Сбросить</Button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Button, ProgressBar } from "primevue";
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastStore } from "@/stores/useToastStore";
import { storeToRefs } from "pinia";
import { useLoteryStore } from "@/stores/useLoteryStore";
import { useUserStore } from "@/stores/useUserStore";
const { getTokenAccsess } = storeToRefs(useAuthStore());
const { getLotery } = storeToRefs(useLoteryStore());
const toastStore = useToastStore();
const token = computed(() => {
  return getTokenAccsess.value;
});
const lotery = computed(() => {
  return getLotery.value;
});
const selectedPoints = ref([]); // Вывод
const paths = reactive(new Set());
const cellSize = ref(0);
const showResult = ref(false);
const screenRef = ref(null);

function GetString() {}

const calculateSizes = () => {
  if (!screenRef.value) return;

  const { width, height } = screenRef.value.getBoundingClientRect();
  // Используем минимальный размер для квадратной сетки
  const gridSize = Math.min(width, height);
  cellSize.value = gridSize / 3;
};

const getPosition = (id) => {
  const row = Math.floor((id - 1) / 3);
  const col = (id - 1) % 3;
  return {
    x: col * cellSize.value + cellSize.value / 2,
    y: row * cellSize.value + cellSize.value / 2,
  };
};

const getPointPosition = (id) => {
  const pos = getPosition(id);
  return {
    left: `${pos.x}px`,
    top: `${pos.y}px`,
    transform: "translate(-50%, -50%)",
    width: `${cellSize.value * 0.3}px`,
    height: `${cellSize.value * 0.3}px`,
  };
};

const areAdjacent = (a, b) => {
  const rowA = Math.floor((a - 1) / 3);
  const colA = (a - 1) % 3;
  const rowB = Math.floor((b - 1) / 3);
  const colB = (b - 1) % 3;
  return Math.abs(rowA - rowB) <= 1 && Math.abs(colA - colB) <= 1;
};

const lines = computed(() => {
  const linesArray = [];
  for (let i = 1; i < selectedPoints.value.length; i++) {
    const start = getPosition(selectedPoints.value[i - 1]);
    const end = getPosition(selectedPoints.value[i]);
    linesArray.push(`M ${start.x} ${start.y} L ${end.x} ${end.y}`);
  }
  return linesArray;
});

const selectPoint = (point) => {
  if (showResult.value) return;

  const lastPoint = selectedPoints.value[selectedPoints.value.length - 1];

  // Разрешаем выбирать любые точки кроме повторного выбора предыдущей
  if (selectedPoints.value.length > 0 && point === lastPoint) {
    return;
  }

  if (selectedPoints.value.length === 0) {
    selectedPoints.value.push(point);
    return;
  }

  const pathKey = [lastPoint, point].sort().join("-");

  if (!areAdjacent(lastPoint, point) || paths.has(pathKey)) {
    return;
  }

  selectedPoints.value.push(point);
  paths.add(pathKey);

  // Всегда показываем результат после 5 точек
  if (selectedPoints.value.length === 6) {
    showResult.value = true;
  }
};

onMounted(() => {
  const observer = new ResizeObserver(() => {
    calculateSizes();
    // Принудительное обновление после изменения размеров
    requestAnimationFrame(() => {
      screenRef.value = document.querySelector(".screen");
      calculateSizes();
    });
  });
  observer.observe(document.querySelector(".phone-container"));
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateSizes);
});
const loading = ref();
const getrublBy = async () => {
  try {
    console.log(lotery.value[0].id, "token");
    console.log(selectedPoints.value, "tick");
    loading.value = true;
    const response = await axios.post(
      "/lott/participants/",
      {
        lottery_id: lotery.value[0].id,
        ticket: selectedPoints.value.join(""),
        value_type: "real",
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    history.value = response.data;
    toastStore.showSuccessToast("Вы приобрели билет на лотерею");
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    toastStore.showErrorToast("Произошла системная ошибка");
    console.error("Error fetching regions:", error);
    throw error;
  }
};
const getCoinBy = async () => {
  try {
    console.log(lotery.value[0].id, "token");
    loading.value = true;
    const response = await axios.post(
      "/lott/participants/",
      {
        lottery_id: lotery.value[0].id,
        ticket: selectedPoints.value.join(""),
        value_type: "virtual",
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    history.value = response.data;
    toastStore.showSuccessToast("Вы приобрели билет на лотерею");
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    toastStore.showErrorToast("Произошла системная ошибка");
    console.error("Error fetching regions:", error);
    throw error;
  }
};
function Reset() {
  selectedPoints.value = [];
  paths.clear();
  showResult.value = false;
}

const CheckSixPoint = computed(() => {
  if (selectedPoints.value.length < 6) {
    return false;
  } else {
    return true;
  }
});
function rublBy() {
  getrublBy();
  Reset();
}
function coinBy() {
  getCoinBy();
  Reset();
}
</script>

<style>
.phone-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  padding: 20px;
}

.phone {
  width: 90vmin;
  height: 90vmin;
  max-width: 500px;
  max-height: 500px;
  background: rgb(255, 218, 23);
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 2vmin;
}

.screen {
  width: 100%;
  height: auto;
  height: calc(100%);
  background: white;
  border-radius: 20px;
  overflow: visible;
  position: relative;
}

.point {
  position: absolute;
  width: 24px;
  height: 24px;
  background: #ddd;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
}

.point:hover {
  background: rgb(255, 218, 23);
  transform: translate(-50%, -50%) scale(1.2);
  box-shadow: 0 0 10px rgba(33, 150, 243, 0.5);
}

.point.active {
  background: rgb(255, 218, 23) !important;
  transform: translate(-50%, -50%) scale(1.1);
}

.point.active:hover {
  transform: translate(-50%, -50%) scale(1.3);
}

.lines {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.result {
  text-align: center;
  margin-top: 15px;
  font-size: 18px;
  color: #333;
}

path {
  shape-rendering: crispEdges;
}
</style>
