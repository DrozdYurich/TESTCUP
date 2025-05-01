import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Auth from "@/components/Auth/Auth.vue";
import Login from "@/components/Auth/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        layout: "Main",
        auth: false,
      },
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
      meta: {
        layout: "Auth",
        auth: false,
      },
    },
    {
      path: "/login",
      name: "name",
      component: Login,
      meta: {
        layout: "Auth",
        auth: false,
      },
    },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const authRequired = to.meta.auth;
//   if (authRequired && authStore.isAuth) {
//     next();
//   } else if (authRequired && !authStore.isAuth) {
//     next("/auth");
//   } else {
//     next();
//   }
// });
export default router;
