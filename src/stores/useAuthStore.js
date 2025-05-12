import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const accsesstoken = ref(localStorage.getItem("jwtTokenAccsess"));
  const refreshtoken = ref(localStorage.getItem("jwtTokenRefresh"));
  const role = ref(localStorage.getItem("role"));
  const user = ref(localStorage.getItem("user"));

  function setAccsessToken(newToken) {
    accsesstoken.value = newToken;
    localStorage.setItem("jwtTokenAccsess", newToken);
  }
  function setRefreshToken(newToken) {
    refreshtoken.value = newToken;
    localStorage.setItem("jwtTokenRefresh", newToken);
  }

  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  function setRole(newRole) {
    role.value = newRole;
    localStorage.setItem("role", newRole);
    console.log("role", role.value);
  }
  function removeRole() {
    role.value = null;
    localStorage.removeItem("role");
    console.log("role", role.value);
  }
  function removeToken() {
    accsesstoken.value = null;
    refreshtoken.value = null;
    console.log(accsesstoken.value, "tokenAcc");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtTokenAccsess");
    localStorage.removeItem("jwtTokenRefresh");
  }
  function removeUser() {
    user.value = null;
    localStorage.removeItem("user");
    localStorage.removeItem("request");
  }
  let refreshInterval = null;

  async function refreshTokens() {
    // try {
    //   if (!refreshtoken.value) {
    //     throw new Error("No refresh token available");
    //   }

    //   const response = await axios.post("/api/auth/refresh/", {
    //     refresh: refreshtoken.value,
    //   });

    //   if (!response.data.access || !response.data.refresh) {
    //     throw new Error("Invalid token refresh response");
    //   }

    //   setAccsessToken(response.data.access);
    //   setRefreshToken(response.data.refresh);

    //   return true;
    // } catch (error) {
    //   console.error("Token refresh failed:", error);
    //   // При ошибке обновления выполняем выход
    //   logout();
    //   return false;
    // }
    return new Promise((resolve) => {
      if (accsesstoken.value && refreshtoken.value) {
        setAccsessToken("accsess" + Date.now());
        setRefreshToken("refresh" + Date.now());
        console.log("token", accsesstoken.value, refreshtoken.value);
        resolve(true);
      }
    });
  }
  function startTokenRefresh() {
    if (refreshInterval) {
      clearInterval(refreshInterval);
    }
    refreshTokens().then(() => {
      refreshInterval = setInterval(refreshTokens, 10000);
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
  }
  function logout() {
    removeToken();
    removeUser();
    removeRole();
    stopTokenRefresh();
  }
  const getUser = computed(() => user.value);
  const getToken = computed(() => accsesstoken.value);
  const isAuth = computed(() => !!accsesstoken.value && !!refreshtoken.value);
  async function login(url, formstate) {
    // try {
    //   const response = await axios.post(url, formstate);
    //   if (!response?.data) {
    //     throw new Error("Сервер вернул пустой ответ");
    //   }
    //   if (url.includes("/register/")) {
    //     if (!response.data.user || !response.data.token) {
    //       throw new Error("Ожидайте подтверждения регистраии");
    //     }
    //   } else {
    //     if (!response.data.token) {
    //       throw new Error("Не получен токен авторизации");
    //     }
    //   }
    //   setAccsessToken(response.data.token);
    //   setUser(response.data.user);
    //   if (response.data.role) {
    //     setRole(response.data.role.id);
    //   } else if (response.data.user?.role) {
    //     setRole(response.data.user.role.id || response.data.user.role);
    //   }
    //   return true;
    // } catch (err) {
    //   console.error("Auth error:", err);
    //   if (err.response) {
    //     // Сервер вернул ошибку
    //     errorMessage =
    //       err.response.data?.non_field_errors?.[0] ||
    //       err.response.data?.detail ||
    //       err.response.data?.message ||
    //       err.response.data?.email[0] ||
    //       err.response.data?.nickname[0] ||
    //       JSON.stringify(err.response.data);
    //   } else if (err.request) {
    //     errorMessage = "Сервер не отвечает";
    //   } else {
    //     errorMessage = err.message;
    //   }
    //   return false;
    // } finally {
    // }

    return new Promise((resolve) => {
      setTimeout(() => {
        setAccsessToken("accsess");
        setRefreshToken("refresh");
        setUser({ name: "Test User" });
        setRole(1);
        startTokenRefresh();
        resolve(true);
      }, 3000);
    });
  }
  return {
    logout,
    removeRole,
    accsesstoken,
    removeUser,
    refreshtoken,
    setAccsessToken,
    removeToken,
    getToken,
    isAuth,
    login,
    setRole,
    setUser,
    setRefreshToken,
    getUser,
  };
});
