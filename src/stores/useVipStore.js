import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useVipStore = defineStore("vip", () => {
  const vipData = localStorage.getItem("vip");
  const vip = ref(null);
  const vipData1 = localStorage.getItem("vip1");
  const vip1 = ref(null);
  try {
    if (vipData) {
      vip.value = JSON.parse(vipData); // Только если данные есть
    }
  } catch (e) {
    localStorage.removeItem("vip"); // Очищаем битые данные
  }
  try {
    if (vipData1) {
      vip1.value = JSON.parse(vipData1); // Только если данные есть
    }
  } catch (e) {
    localStorage.removeItem("vip"); // Очищаем битые данные
  }
  function setvip(newUser) {
    vip.value = newUser;
    localStorage.setItem("vip", JSON.stringify(newUser));
  }
  function setvip1(newUser) {
    vip.value = newUser;
    localStorage.setItem("vip1", JSON.stringify(newUser));
  }
  function removevip() {
    vip.value = null;
    localStorage.removeItem("vip");
  }
  function removevip1() {
    vip.value = null;
    localStorage.removeItem("vip1");
  }

  const getvip = computed(() => vip.value);
  const getvip1 = computed(() => vip1.value);
  return {
    removevip1,
    getvip1,
    setvip1,
    setvip,
    getvip,
    removevip,
  };
});
