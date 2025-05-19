<template>
  <div class="payment-card-container">
    <div class="cards-wrapper">
      <h2 class="payment-title">Мои платежные карты</h2>
      <div class="cards-list">
        <div v-for="(card, index) in carts" :key="index" class="card-item">
          <div class="flex flex-col w-full">
            <div class="card-header">
              <span class="card-bank">Банк: {{ card.bank }}</span>
            </div>
            <div class="card-header">
              <span class="card-bank">Номер карты: {{ card.cardNumber }}</span>
            </div>
            <div class="card-header">
              <span class="card-bank"
                >Имя владельца карты: {{ card.cardholderName }}</span
              >
            </div>
            <div class="card-details">
              <span>Действует до: {{ card.expiryDate }}</span>
            </div>
          </div>
        </div>
        <div class="add-card" @click="showAddPlatezh">
          <span class="add-icon">+</span>
          <span class="add-text">Добавить карту</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import useModalMethods from "../Modal/MethodsModal/methods";
import { usePlatezhStore } from "@/stores/usePlatezhStore";
import { storeToRefs } from "pinia";

const { getCarts } = storeToRefs(usePlatezhStore());
const { showAddPlatezh } = useModalMethods();
const carts = computed(() => getCarts.value);
</script>

<style scoped>
.payment-card-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.cards-wrapper {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
}

.payment-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 1.5rem;
}

.cards-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-item,
.add-card {
  width: 100%;
  display: flex;
  background-color: var(--card-background-color);
  border-left: 4px solid var(--card-border-color);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
}

.card-item:hover,
.add-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 215, 0, 0.3);
}

.card-header {
  margin-bottom: 0.5rem;
}

.card-bank {
  font-weight: bold;
  color: var(--text-color);
  font-size: 1.1rem;
}

.card-details {
  font-size: 0.95rem;
  color: var(--card-subtext-color);
}

/* Стили для кнопки добавления */
.add-card {
  background-color: var(--background-color);
  border: 2px dashed var(--card-border-color);
  justify-content: center;
  align-items: center;
  color: var(--card-border-color);
  font-weight: bold;
  cursor: pointer;
  min-height: 80px;
}

.add-card:hover {
  background-color: var(--card-background-color);
}

.add-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.add-text {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
