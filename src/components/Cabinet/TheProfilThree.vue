<template>
  <div
    class="flex flex-col md:flex-row"
    data-aos="fade-up"
    data-aos-anchor-placement="top-center"
  >
    <div class="flex flex-1 gap-3 overflow-hidden">
      <!-- Левая часть с возможностью скролла -->
      <div
        class="adm flex-1 overflow-y-auto max-h-[calc(100vh-120px)]"
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
      >
        <div v-if="loading" class="progressbar-wrapper">
          <ProgressBar
            class="custom-progressbar"
            mode="indeterminate"
            style="height: 5px"
          />
        </div>
        <h1 class="text-3xl mb-4 font-bold">Администрирование</h1>
        <div>
          <TheAdminChange
            v-for="loter in lotteries"
            :key="loter.id"
            :lottery="loter"
          />
        </div>
      </div>

      <!-- Правая часть — фиксированная сверху -->
      <div
        class="slide card bg-[var(--card-background-color)] border-l-4 border-[var(--card-border-left)] shadow-md rounded-xl p-6 transition-all duration-300 hover:shadow-lg w-full sm:w-72 sticky top-6 self-start"
      >
        <div v-if="loadingT">
          <ProgressBar mode="indeterminate" style="height: 5px" />
        </div>
        <h2 class="text-lg font-semibold mb-4 text-[var(--card-text-color)]">
          Интервал лотереи
        </h2>

        <Form
          v-slot="$form"
          :resolver="resolver"
          :initialValues="initialValues"
          @submit="onFormSubmit"
          class="flex flex-col gap-4 w-full"
        >
          <div class="flex flex-col gap-3">
            <!-- Слайдер -->
            <Slider
              name="slider"
              v-model="initialValues.slider"
              :min="1"
              :max="30"
              class="w-full accent-[var(--card-color-content)]"
            />

            <!-- Отображение значения -->
            <div
              class="text-center text-sm font-medium text-[var(--card-subtext-color)]"
            >
              {{ initialValues.slider }} мин.
            </div>

            <!-- Сообщение об ошибке -->
            <Message
              v-if="$form.slider?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="text-xs text-red-500"
            >
              {{ $form.slider.error?.message }}
            </Message>
          </div>

          <!-- Кнопка отправки -->
          <Button
            type="submit"
            severity="secondary"
            label="Сохранить"
            class="mt-2 bg-[var(--button-bg)] text-[var(--text-color)] hover:bg-yellow-400"
          />
        </Form>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import TheAdminChange from "./Admin/TheAdminChange.vue";
import { useAuthStore } from "@/stores/useAuthStore";
import { computed, onMounted, reactive, ref } from "vue";
import { Button, ProgressBar } from "primevue";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";
import { Form } from "@primevue/forms";
import { Message, Slider } from "primevue";
import { useToastStore } from "@/stores/useToastStore";
const toasStore = useToastStore();
const { getTokenAccsess } = useAuthStore();
const token = computed(() => {
  return getTokenAccsess;
});

const lotteries = ref([]);
const initialValues = ref({
  slider: 0,
});

const schema = computed(() => {
  const baseSchema = {
    slider: yup.number().required("Укажите значение").min(1).max(60),
  };

  return yup.object().shape(baseSchema);
});
const resolver = computed(() => yupResolver(schema.value));
const loading = ref();
const loadingT = ref();
const getLoter = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8001/lotteries/");
    console.log(response.data);
    lotteries.value = response.data;
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
const getLag = async () => {
  try {
    console.log(token.value, "token");
    loading.value = true;
    const response = await axios.get("http://10.8.0.23:8001/time-lag/");
    console.log(response.data);
    initialValues.value.slider = response.data.time_lag;
    loading.value = false;
    return response.data;
  } catch (error) {
    loading.value = false;
    console.error("Error fetching regions:", error);
    throw error;
  }
};
const onFormSubmit = async (formData) => {
  try {
    loadingT.value = true;

    if (formData.valid) {
      const response = await axios.patch("http://10.8.0.23:8001/time-lag/", {
        time_lag: initialValues.value.slider,
      });
      loadingT.value = false;
      toasStore.showSuccessToast("Вы успешно изменили интервал лотереи");
      console.log(response);
    } else {
      toasStore.showErrorToast("Укажите значение");
    }
  } catch (error) {
    loadingT.value = false;
    toasStore.showErrorToast("Произошла системная ошибка");
    console.error("Error fetching regions:", error);
    throw error;
  }
};
onMounted(() => {
  getLag();
  getLoter();
});
</script>

<style>
.adm {
  flex: 0.7;
}

.p-slider-range {
  background: var(--border-color);
}
.slide {
  flex: 0.25;
}
.adm {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.slide.card {
  /* Фиксируем верхнее положение */
  position: sticky;
  top: 1.5rem; /* Можно регулировать отступ сверху */
  align-self: flex-start;
}
</style>
