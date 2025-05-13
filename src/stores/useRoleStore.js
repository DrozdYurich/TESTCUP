import { ref, computed } from "vue";
import { defineStore } from "pinia";
export const useRoleStore = defineStore("role", () => {
  const role = ref(localStorage.getItem("role"));
  function setRole(newRole) {
    console.log(newRole, "newRole");
    role.value = newRole;
    localStorage.setItem("role", newRole);
    console.log("role", role.value);
  }
  function removeRole() {
    role.value = null;
    localStorage.removeItem("role");
    console.log("role", role.value);
  }
  const getRole = computed(() => role.value);
  return {
    setRole,
    getRole,
    removeRole,
  };
});
