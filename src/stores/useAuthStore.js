import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./useUserStore";
import { useRoleStore } from "./useRoleStore";
import axios from "axios";
export const useAuthStore = defineStore("auth", () => {
  const accsesstoken = ref(localStorage.getItem("jwtTokenAccsess"));
  const refreshtoken = ref(localStorage.getItem("jwtTokenRefresh"));
  const userStore = useUserStore();
  const roleStore = useRoleStore();
  function setAccsessToken(newToken) {
    accsesstoken.value = newToken;
    localStorage.setItem("jwtTokenAccsess", newToken);
  }
  function setRefreshToken(newToken) {
    refreshtoken.value = newToken;
    localStorage.setItem("jwtTokenRefresh", newToken);
  }
  function removeToken() {
    accsesstoken.value = null;
    refreshtoken.value = null;
    localStorage.removeItem("jwtTokenAccsess");
    localStorage.removeItem("jwtTokenRefresh");
  }
  let refreshInterval = null;

  async function refreshTokens() {
    if (!accsesstoken.value || !refreshtoken.value) {
      stopTokenRefresh();
      return false;
    }
    try {
      if (!refreshtoken.value) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(
        "http://10.8.0.23:8000/auth/jwt/refresh/",
        {
          refresh: refreshtoken.value,
        }
      );

      if (!response.data.access || !response.data.refresh) {
        throw new Error("Invalid token refresh response");
      }

      setAccsessToken(response.data.access);
      setRefreshToken(response.data.refresh);

      return true;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // При ошибке обновления выполняем выход
      logout();
      return false;
    }

    // return new Promise((resolve) => {
    //   setAccsessToken("accsess" + Date.now());
    //   setRefreshToken("refresh" + Date.now());
    //   resolve(true);
    // });
  }
  function startTokenRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    refreshTokens().then(() => {
      refreshInterval = setInterval(refreshTokens, 3000000);
    });
  }

  function stopTokenRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      refreshInterval = null;
    }
  }
  if (accsesstoken.value && refreshtoken.value) {
    startTokenRefresh();
  } else {
    stopTokenRefresh();
  }
  function logout() {
    removeToken();
    userStore.removeUser();
    roleStore.removeRole();
    stopTokenRefresh();
  }
  const getTokenAccsess = computed(() => accsesstoken.value);
  const getTokenRefresh = computed(() => refreshTokens.value);
  const isAuth = computed(() => !!accsesstoken.value && !!refreshtoken.value);
  async function login(url, formstate) {
    try {
      const response = await axios.post(url, formstate);
      if (!response?.data) {
        throw new Error("Сервер вернул пустой ответ");
      }
      // if (url.includes("/register/")) {
      //   if (!response.data.user || !response.data.token) {
      //     throw new Error("Ожидайте подтверждения регистраии");
      //   }
      // } else {
      //   if (!response.data.token) {
      //     throw new Error("Не получен токен авторизации");
      //   }
      // }
      console.log(response, "resp");
      userStore.setUser(response.data);
      console.log(response.data.is_root, "root");
      roleStore.setRole(response.data.is_root);

      return true;
    } catch (err) {
      console.error("Auth error:", err);
      if (err.response) {
        // Сервер вернул ошибку
        errorMessage =
          err.response.data?.non_field_errors?.[0] ||
          err.response.data?.detail ||
          err.response.data?.message ||
          err.response.data?.email[0] ||
          err.response.data?.nickname[0] ||
          JSON.stringify(err.response.data);
      } else if (err.request) {
        errorMessage = "Сервер не отвечает";
      } else {
        errorMessage = err.message;
      }
      return false;
    } finally {
    }

    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     setAccsessToken("accsess");
    //     setRefreshToken("refresh");
    //     startTokenRefresh();
    //     resolve(true);
    //   }, 3000);
    // });
  }
  return {
    logout,
    accsesstoken,
    refreshtoken,
    setAccsessToken,
    removeToken,
    getTokenAccsess,
    getTokenRefresh,
    isAuth,
    login,
    setRefreshToken,
  };
});
