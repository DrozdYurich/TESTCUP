import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";

export default function useScrollY() {
  const scrollY = ref(0);
  const onScroll = () => {
    scrollY.value = window.scrollY;
  };
  onMounted(() => {
    window.addEventListener("scroll", onScroll);
    onScroll();
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  return { scrollY };
}
