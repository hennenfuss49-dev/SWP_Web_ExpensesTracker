<script setup lang="ts">
import { ref, onMounted } from 'vue'

import ExpenseList from '../components/ExpenseList.vue'
import ExpenseDetail from '../components/ExpenseDetail.vue'

import type { Expense } from '../types/Expense'

const expenses = ref<Expense[]>([])
const selectedExpense = ref<Expense | null>(null)

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

  color: #2563eb;
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

  background: #2563eb;
  color: white;

  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.add-button:hover {
  background: #1d4ed8;
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