import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePlatezhStore = defineStore("carts", () => {
  const carts = ref(JSON.parse(localStorage.getItem("carts")) || []);
  function addCart(newCart) {
    carts.value.push(newCart);
    updateLocalStorage();
  }
  function removeCart() {
    carts.value = null;
    localStorage.removeItem("carts");
  }
  function updateLocalStorage() {
    localStorage.setItem("carts", JSON.stringify(carts.value));
  }

  // Получаем все карты (вычисляемое свойство)
  const getCarts = computed(() => carts.value);

  return {
    removeCart,
    carts,
    addCart,
    getCarts,
  };
});
