<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import IncomeList from '../components/IncomeList.vue'
import IncomeDetail from '../components/IncomeDetail.vue'
import IncomeForm from '../components/IncomeForm.vue'

import { loadIncomes, saveIncomes } from '../services/incomeStorage'

import type { Income } from '../types/Income'

const incomes = ref<Income[]>([])
const selectedIncome = ref<Income | null>(null)
const showForm = ref(false)

const total = computed(() =>
  incomes.value.reduce((sum, income) => sum + income.amount, 0)
)

const categories = computed(() =>
  [...new Set(incomes.value.map(income => income.category))].sort()
)

function selectIncome(income: Income) {
  selectedIncome.value = income
}

function addIncome(data: Omit<Income, 'id'>) {
  const nextId = Math.max(0, ...incomes.value.map(income => income.id)) + 1
  const income: Income = { id: nextId, ...data }

  incomes.value = [income, ...incomes.value]
  saveIncomes(incomes.value)

  selectedIncome.value = income
  showForm.value = false
}

onMounted(async () => {
  incomes.value = await loadIncomes()
})
</script>

<template>
  <div class="incomes-page">

    <div class="page-header">
      <div>
        <p class="eyebrow">FINANZEN</p>

        <h2>Einnahmen</h2>

        <p>
          Verwalte und überprüfe deine Einnahmen.
        </p>
      </div>

      <button class="add-button" @click="showForm = true">
        + Neue Einnahme
      </button>
    </div>

    <section class="summary">
      <div class="summary-icon">↑</div>

      <div>
        <span>Gesamte Einnahmen</span>
        <strong>{{ total.toFixed(2) }} €</strong>
      </div>
    </section>

    <div class="content-grid">

      <section class="list-card">
        <div class="section-header">
          <h3>Alle Einnahmen</h3>

          <span class="count">
            {{ incomes.length }} Einträge
          </span>
        </div>

        <IncomeList
          :incomes="incomes"
          :selected-id="selectedIncome?.id"
          @select="selectIncome"
        />
      </section>

      <section class="detail-card">
        <IncomeDetail :income="selectedIncome" />
      </section>

    </div>

    <IncomeForm
      v-if="showForm"
      :categories="categories"
      @save="addIncome"
      @cancel="showForm = false"
    />

  </div>
</template>

<style scoped>
.incomes-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Header */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.eyebrow {
  margin: 0 0 5px;

  color: #16a34a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.page-header h2 {
  margin: 0;

  font-size: 28px;
  color: #111827;
}

.page-header p:last-child {
  margin: 5px 0 0;

  color: #6b7280;
}

.add-button {
  border: none;

  padding: 11px 18px;

  background: #16a34a;
  color: white;

  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.add-button:hover {
  background: #15803d;
}

/* Summary */

.summary {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 22px 24px;

  background: linear-gradient(135deg, #16a34a, #22c55e);
  color: white;

  border-radius: 14px;

  box-shadow: 0 10px 25px -12px rgba(22, 163, 74, 0.6);
}

.summary-icon {
  width: 46px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.2);

  border-radius: 12px;

  font-size: 20px;
  font-weight: 700;
}

.summary span {
  display: block;

  font-size: 13px;
  opacity: 0.85;
}

.summary strong {
  font-size: 26px;
}

/* Content */

.content-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 20px;
}

.list-card,
.detail-card {
  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  overflow: hidden;
}

.section-header {
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #e5e7eb;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
}

.count {
  color: #9ca3af;
  font-size: 13px;
}

/* Responsive */

@media (max-width: 800px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
