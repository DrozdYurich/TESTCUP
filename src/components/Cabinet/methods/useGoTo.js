import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
export default function useGoCaninet() {
  const router = useRouter();
  const removetoken = () => {
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
  return {
    removetoken,
    goToPD,
    gotoProfil,
    gotoPunct,
  };
}
