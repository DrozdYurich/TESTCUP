// stores/toastStore.js
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";

export const useToastStore = defineStore("toast", () => {
  const toast = useToast();
  const showToast = (options) => {
    toast.add({
      life: 3000,
      ...options,
    });
  };
  const showSuccessToast = (message, detail = "") => {
    showToast({
      severity: "success",
      summary: message,
      detail,
    });
  };
  const showErrorToast = (message, detail = "") => {
    showToast({
      severity: "error",
      summary: message,
      detail,
    });
  };
  return {
    showToast,
    showSuccessToast,
    showErrorToast,
  };
});
