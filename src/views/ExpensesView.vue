<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import ExpenseList from '../components/ExpenseList.vue'
import ExpenseDetail from '../components/ExpenseDetail.vue'

import type { Expense } from '../types/Expense'

const expenses = ref<Expense[]>([])
const selectedExpense = ref<Expense | null>(null)

const total = computed(() =>
  expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
)

async function loadExpenses() {
  const response = await fetch('/expenses.json')
  expenses.value = await response.json() as Expense[]
}

function selectExpense(expense: Expense) {
  selectedExpense.value = expense
}

onMounted(loadExpenses)
</script>

<template>
  <div class="expenses-page">

    <div class="page-header">
      <div>
        <p class="eyebrow">FINANZEN</p>

        <h2>Ausgaben</h2>

        <p>
          Verwalte und überprüfe deine Ausgaben.
        </p>
      </div>

      <button class="add-button">
        + Neue Ausgabe
      </button>
    </div>

    <section class="summary">
      <div class="summary-icon">↓</div>

      <div>
        <span>Gesamte Ausgaben</span>
        <strong>{{ total.toFixed(2) }} €</strong>
      </div>
    </section>

    <div class="content-grid">

      <section class="list-card">
        <div class="section-header">
          <h3>Alle Ausgaben</h3>

          <span class="count">
            {{ expenses.length }} Einträge
          </span>
        </div>

        <ExpenseList
          :expenses="expenses"
          :selected-id="selectedExpense?.id"
          @select="selectExpense"
        />
      </section>

      <section class="detail-card">
        <ExpenseDetail :expense="selectedExpense" />
      </section>

    </div>

  </div>
</template>

<style scoped>
.expenses-page {
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

  color: #dc2626;
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

  background: #dc2626;
  color: white;

  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.add-button:hover {
  background: #b91c1c;
}

/* Summary */

.summary {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 22px 24px;

  background: linear-gradient(135deg, #dc2626, #f87171);
  color: white;

  border-radius: 14px;

  box-shadow: 0 10px 25px -12px rgba(220, 38, 38, 0.6);
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
