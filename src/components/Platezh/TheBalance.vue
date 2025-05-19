<template>
  <div class="balance-card horizontal h-3/6">
    <div class="balance-main">
      <div class="balance-section">
        <div class="balance-text">
          <h2 class="balance-title">Ваш баланс</h2>
          <p class="balance-amount">{{ balance }} P</p>
        </div>
        <div class="balance-actions">
          <Button
            label="Пополнить"
            icon="pi pi-plus"
            class="theme-button"
            @click="showInCam"
          />
          <Button
            label="Вывести"
            icon="pi pi-minus"
            class="theme-button"
            @click="showOutCam"
          />
        </div>
      </div>

      <Divider />

      <div class="balance-section">
        <div class="balance-text">
          <h2 class="balance-title">Ваш игровой баланс</h2>
          <p class="balance-amount">{{ gameBalance }} P</p>
        </div>

        <div class="transfer-wrapper">
          <Button
            label="Перевести"
            icon="pi pi-arrow-right"
            class="theme-button"
            @click="showInCamVirt"
          />
          <div class="exchange-rate">
            <span>20</span>
            <span class="currency-p">P</span>
            =
            <span class="virtual-currency">1</span>
            <i class="pi pi-gem ml-1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Button, Divider } from "primevue";
import useModalMethods from "../Modal/MethodsModal/methods";

const { showInCam, showOutCam, showInCamVirt } = useModalMethods();
const balance = ref(1500);
const gameBalance = ref(500);

const showTransfer = () => {
  // Логика перевода средств
};
</script>

<style scoped>
.balance-card {
  background-color: var(--card-background-color);
  border: 1px solid var(--card-border-color);
  border-radius: 12px;
  box-shadow: var(--box-shadow);
  transition: all 0.3s ease;
  padding: 1.5rem;
  max-width: 800px;
  margin-top: 2rem;
}

.balance-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.balance-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.balance-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.balance-title {
  font-size: 1rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.balance-amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--card-border-color);
  margin: 0;
}

.balance-actions {
  display: flex;
  gap: 0.75rem;
}

.theme-button {
  background-color: var(--card-border-color);
  color: #000;
  border: none;
  white-space: nowrap;
}

.theme-button:hover {
  background-color: var(--card-border-color);
  filter: brightness(90%);
}

.balance-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 215, 0, 0.25);
}

@media (max-width: 768px) {
  .balance-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .balance-actions {
    width: 100%;
  }

  .theme-button {
    width: 100%;
  }
}
.transfer-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.exchange-rate {
  font-size: 0.9rem;
  color: var(--card-subtext-color);
  background-color: var(--card-background-color);
  border: 2px solid var(--card-border-color);
  padding-left: 1rem;
  border-radius: 8px;
  display: inline-block;
  width: 100%;
  text-align: center;
  transition: all 0.3s ease;
}

.exchange-rate:hover {
  background-color: #222;
}

.exchange-rate .currency-p {
  color: var(--card-border-color); /* Золотой цвет для P */
  font-weight: bold;
}

.exchange-rate .virtual-currency {
  color: var(--card-border-color); /* Золотой для виртуальной валюты */
  font-weight: bold;
}
</style>
