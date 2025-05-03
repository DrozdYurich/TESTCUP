import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("jwtToken"));
  const role = ref(localStorage.getItem("role"));
  const user = ref(localStorage.getItem("user"));

  function setToken(newToken) {
    token.value = newToken;
    localStorage.setItem("jwtToken", newToken);
  }

  function setUser(newUser) {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }
  function setRole(newRole) {
    role.value = newRole.id;
    localStorage.setItem("role", newRole);
  }
  function removeToken() {
    token.value = null;
    localStorage.removeItem("jwtToken");
  }
  const getUser = computed(() => user.value);
  const getToken = computed(() => token.value);
  const isAuth = computed(() => !!token.value);
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
    //   setToken(response.data.token);
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
        setToken("1111");
        setUser({ name: "Test User" }); // Добавьте это для полноты теста
        resolve(true); // Возвращаем успешный результат
      }, 3000);
    });
  }
  return {
    token,
    setToken,
    removeToken,
    getToken,
    isAuth,
    login,
    setRole,
    setUser,
    getUser,
  };
});
