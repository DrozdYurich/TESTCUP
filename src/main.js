import "./assets/main.css";
import "animate.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import AnimateOnScroll from "primevue/animateonscroll";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import App from "./App.vue";
import router from "./router";
import ToastService from "primevue/toastservice";
import { DialogService } from "primevue";
import AOS from "aos";
import "aos/dist/aos.css";
const app = createApp(App);
app.use(createPinia());
app.use(DialogService);
app.directive("animateonscroll", AnimateOnScroll);
app.use(router);
app.use(ToastService);
AOS.init({
  // Здесь можно указать опции, например:
  duration: 800, // длительность анимации в мс
  once: true, // анимация срабатывает только один раз
});
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: "primevue",
        order: "theme, base, primevue",
      },
    },
  },
});

app.mount("#app");
