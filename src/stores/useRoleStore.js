import { ref, computed } from "vue";
import { defineStore } from "pinia";
export const useRoleStore = defineStore("role", () => {
  const role = ref(JSON.parse(localStorage.getItem("role")));
  function setRole(newRole) {
    role.value = newRole;
    localStorage.setItem("role", newRole);
  }
  function removeRole() {
    role.value = null;
    localStorage.removeItem("role");
  }
  const getRole = computed(() => role.value);
  return {
    setRole,
    getRole,
    removeRole,
  };
});
