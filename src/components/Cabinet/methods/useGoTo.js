import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
export default function useGoCaninet() {
  const router = useRouter();
  const authStore = useAuthStore();
  const removetoken = () => {
    authStore.removeToken();
    router.push("/auth");
  };
  const goToPD = () => {
    router.push("/cabinet/pd");
  };
  const gotoPunct = () => {
    router.push("/cabinet");
  };
  const gotoProfil = () => {
    router.push("/cabinet/profilone");
  };
  const gotoProfilTwo = () => {
    router.push("/cabinet/profiltwo");
  };
  const gotoProfilThree = () => {
    router.push("/cabinet/profilthree");
  };
  return {
    gotoProfilThree,
    gotoProfilTwo,
    removetoken,
    goToPD,
    gotoProfil,
    gotoPunct,
  };
}
