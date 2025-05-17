import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Auth from "@/views/Auth.vue";
import Login from "@/views/Login.vue";
import PunctOne from "@/views/PunctOne.vue";
import PunctTwo from "@/views/PunctTwo.vue";
import Three from "@/views/Three.vue";
import TheCabinet from "@/components/Cabinet/TheCabinet.vue";
import PDInfo from "@/components/Cabinet/PDInfo.vue";
import CabinetLayout from "@/components/Cabinet/CabinetLayout.vue";
import TheProfil from "@/components/Cabinet/TheProfil.vue";
import TheProfilTwo from "@/components/Cabinet/TheProfilTwo.vue";
import TheProfilThree from "@/components/Cabinet/TheProfilThree.vue";
import TheE404 from "@/components/TheE404.vue";
import AppForgotPassword from "@/components/Forgor/AppForgotPassword.vue";

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
      component: CabinetLayout,
      children: [
        { path: "", name: "cabinet", component: TheCabinet },
        { path: "/cabinet/pd", name: "pd", component: PDInfo },
        { path: "/cabinet/profilone", name: "profilone", component: TheProfil },
        {
          path: "/cabinet/profiltwo",
          name: "profiltwo",
          component: TheProfilTwo,
        },
        {
          path: "/cabinet/profilthree",
          name: "profilthree",
          component: TheProfilThree,
        },
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
      path: "/forgot",
      name: "forgot",
      component: AppForgotPassword,
      meta: {
        layout: "Auth",
        auth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        layout: "Auth",
        auth: false,
      },
    },
    {
      path: "/:any(.*)",
      name: "e404",
      component: TheE404,
    },
  ],
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
export default router;
