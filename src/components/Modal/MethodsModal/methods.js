import { useDialog } from "primevue";
import ProductListModal from "../ProductListModal.vue";
import ListModal from "../ListModal.vue";

export default function useModalMethods() {
  const dialog = useDialog();
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
  return { showDialogProduct, showDialogList };
}
