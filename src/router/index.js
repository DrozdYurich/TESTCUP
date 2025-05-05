import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Auth from "@/components/Auth/Auth.vue";
import Login from "@/components/Auth/Login.vue";
import PunctOne from "@/components/One/PunctOne.vue";
import PunctTwo from "@/components/Two/PunctTwo.vue";
import Three from "@/components/Three/Three.vue";
import TheCabinet from "@/components/Cabinet/TheCabinet.vue";
import PDInfo from "@/components/Cabinet/PDInfo.vue";

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
      path: "/one",
      name: "one",
      component: PunctOne,
      meta: {
        layout: "Main",
        auth: false,
      },
    },
    {
      path: "/two",
      name: "two",
      component: PunctTwo,
      meta: {
        layout: "Main",
        auth: false,
      },
    },
    {
      path: "/three",
      name: "three",
      component: Three,
      meta: {
        layout: "Main",
        auth: false,
      },
    },
    {
      path: "/cabinet",
      children: [
        { path: "", name: "cabinet", component: TheCabinet },
        { path: "/cabinet/pd", name: "pd", component: PDInfo },
      ],
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
export default router;
