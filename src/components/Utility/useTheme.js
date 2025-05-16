import { onMounted, ref, watch } from "vue";

export default function useTheme() {
  const isDark = ref(false);
  const THEME_KEY = "user-theme-preference";
  function applyTheme(dark) {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    }
  }
  onMounted(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      isDark.value = saved === "dark";
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      isDark.value = prefersDark;
    }
    applyTheme(isDark.value);
  });

  watch(isDark, (newVal) => {
    applyTheme(newVal);
    localStorage.setItem(THEME_KEY, newVal ? "dark" : "light");
  });
  return { isDark };
}
