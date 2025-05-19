import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const userData = localStorage.getItem("user");
  const user = ref(null);

  try {
    if (userData) {
      user.value = JSON.parse(userData); // Только если данные есть
    }
  } catch (e) {
    localStorage.removeItem("user"); // Очищаем битые данные
  }
  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  function removeUser() {
    user.value = null;
    localStorage.removeItem("user");
  }
  function updateUser(updatedFields) {
    if (user.value && typeof updatedFields === "object") {
      user.value = { ...user.value, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(user.value));
    }
  }
  const getUser = computed(() => user.value);
  return {
    setUser,
    getUser,
    removeUser,
    updateUser,
  };
});
