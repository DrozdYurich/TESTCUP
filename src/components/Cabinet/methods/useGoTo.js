import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
export default function useGoCaninet() {
  const router = useRouter();
  const authStore = useAuthStore();
  const removetoken = () => {
    authStore.logout();
    router.push({ name: "auth" });
  };
  const goToPD = () => {
    router.push({ name: "pd" });
  };
  const gotoPunct = () => {
    router.push({ name: "cabinet" });
  };
  const gotoProfil = () => {
    router.push({ name: "profilone" });
  };
  const gotoProfilTwo = () => {
    router.push({ name: "profiltwo" });
  };
  const gotoProfilThree = () => {
    router.push({ name: "profilthree" });
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
