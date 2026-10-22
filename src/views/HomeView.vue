<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import CategoryChart from '../components/CategoryChart.vue'
import MonthlyChart from '../components/MonthlyChart.vue'

import type { Expense } from '../types/Expense'
import type { Income } from '../types/Income'

const expenses = ref<Expense[]>([])
const incomes = ref<Income[]>([])

const totalExpenses = computed(() =>
  expenses.value.reduce((sum, expense) => sum + expense.amount, 0)
)

const totalIncomes = computed(() =>
  incomes.value.reduce((sum, income) => sum + income.amount, 0)
)

const balance = computed(() => totalIncomes.value - totalExpenses.value)

async function loadData() {
  const [expenseResponse, incomeResponse] = await Promise.all([
    fetch('/expenses.json'),
    fetch('/incomes.json')
  ])

  expenses.value = await expenseResponse.json() as Expense[]
  incomes.value = await incomeResponse.json() as Income[]
}

onMounted(loadData)
</script>

<template>
  <div class="dashboard">
    <section class="welcome">
      <div>
        <p class="eyebrow">ÜBERSICHT</p>

        <h2>Willkommen zurück 👋</h2>

        <p class="description">
          Behalte deine Einnahmen und Ausgaben im Blick.
        </p>
      </div>

      <div class="welcome-actions">
        <RouterLink to="/incomes" class="income-button">
          Einnahmen anzeigen
        </RouterLink>

        <RouterLink to="/expenses" class="primary-button">
          Ausgaben anzeigen
        </RouterLink>
      </div>
    </section>

    <section class="cards">
      <RouterLink to="/expenses" class="card">
        <div class="card-header">
          <span>Ausgaben</span>
          <span class="icon red">↓</span>
        </div>

        <strong class="negative">− {{ totalExpenses.toFixed(2) }} €</strong>

        <p>{{ expenses.length }} Einträge</p>
      </RouterLink>

      <RouterLink to="/incomes" class="card">
        <div class="card-header">
          <span>Einnahmen</span>
          <span class="icon green">↑</span>
        </div>

        <strong class="positive">+ {{ totalIncomes.toFixed(2) }} €</strong>

        <p>{{ incomes.length }} Einträge</p>
      </RouterLink>

      <div class="card">
        <div class="card-header">
          <span>Saldo</span>
          <span class="icon blue">€</span>
        </div>

        <strong :class="balance >= 0 ? 'positive' : 'negative'">
          {{ balance.toFixed(2) }} €
        </strong>

        <p>Aktueller Stand</p>
      </div>
    </section>

    <section class="charts">
      <CategoryChart :expenses="expenses" />
      <MonthlyChart :expenses="expenses" :incomes="incomes" />
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Welcome */

.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: white;
  padding: 32px;

  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.eyebrow {
  margin: 0 0 8px;

  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.welcome h2 {
  margin: 0;

  font-size: 28px;
  color: #111827;
}

.description {
  margin: 8px 0 0;

  color: #6b7280;
}

/* Buttons */

.primary-button {
  text-decoration: none;
  border-radius: 8px;

  font-weight: 600;
  font-size: 14px;

  transition: 0.2s;
}

.primary-button {
  background: #2563eb;
  color: white;

  padding: 11px 18px;
}

.primary-button:hover {
  background: #1d4ed8;
}

.welcome-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.income-button {
  text-decoration: none;
  border-radius: 8px;

  font-weight: 600;
  font-size: 14px;

  background: #16a34a;
  color: white;

  padding: 11px 18px;

  transition: 0.2s;
}

.income-button:hover {
  background: #15803d;
}

/* Cards */

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.card {
  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  padding: 22px;

  color: inherit;
  text-decoration: none;

  transition: 0.2s;
}

a.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -15px rgba(17, 24, 39, 0.35);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #6b7280;
  font-size: 14px;
}

.card strong {
  display: block;

  margin-top: 18px;

  font-size: 25px;
  color: #111827;
}

.card strong.positive {
  color: #16a34a;
}

.card strong.negative {
  color: #dc2626;
}

.card p {
  margin: 5px 0 0;

  color: #9ca3af;
  font-size: 13px;
}

/* Icons */

.icon {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  font-weight: 700;
}

.red {
  background: #fef2f2;
  color: #dc2626;
}

.green {
  background: #f0fdf4;
  color: #16a34a;
}

.blue {
  background: #eff6ff;
  color: #2563eb;
}

/* Charts */

.charts {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 18px;
}

/* Responsive */

@media (max-width: 700px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }

  .welcome {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .cards,
  .charts {
    grid-template-columns: 1fr;
  }
}
</style>