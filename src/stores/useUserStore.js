import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref(localStorage.getItem("user"));
  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  function removeUser() {
    user.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("request");
  }
  const getUser = computed(() => user.value);
  return {
    setUser,
    getUser,
    removeUser,
  };
});
