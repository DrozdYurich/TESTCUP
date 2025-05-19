import { useDialog } from "primevue";
import ProductListModal from "../ProductListModal.vue";
import ListModal from "../ListModal.vue";
import ForgotToPasswd from "../ForgotToPasswd.vue";
import ChangePassd from "../ChangePassd.vue";
import AddCartPlatezh from "../AddCartPlatezh.vue";
import AppOutCam from "../AppOutCam.vue";
import AppInCam from "../AppInCam.vue";
import AppInCamVirt from "../AppInCamVirt.vue";

export default function useModalMethods() {
  const dialog = useDialog();
  function showChangePasswd() {
    dialog.open(ChangePassd, {
      props: {
        header: "Изменение пароля",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showInCam() {
    dialog.open(AppInCam, {
      props: {
        header: "Пополнение",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showInCamVirt() {
    dialog.open(AppInCamVirt, {
      props: {
        header: "Виртуальное пополнение",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showOutCam() {
    dialog.open(AppOutCam, {
      props: {
        header: "Пополнение",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showAddPlatezh() {
    dialog.open(AddCartPlatezh, {
      props: {
        header: "Добавьте карту",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showForgotToPasswd() {
    dialog.open(ForgotToPasswd, {
      props: {
        header: "Восстановление пароля",
        style: {
          width: "40vw",
          backgroundColor: "white",
          border: "none",
          color: "black",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showDialogProduct() {
    dialog.open(ProductListModal, {
      props: {
        header: "Список продуктов",
        style: {
          width: "30vw",
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "80vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  function showDialogList() {
    dialog.open(ListModal, {
      props: {
        header: "Список списков",
        style: {
          width: "80vw",
        },
        breakpoints: {
          "960px": "75vw",
          "640px": "90vw",
        },
        modal: true,
        draggable: false,
      },
    });
  }
  return {
    showDialogProduct,
    showDialogList,
    showForgotToPasswd,
    showChangePasswd,
    showAddPlatezh,
    showInCam,
    showOutCam,
    showInCamVirt,
  };
}
