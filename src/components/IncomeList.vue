<script setup lang="ts">
import type { Income } from '../types/Income'

defineProps<{
  incomes: Income[]
  selectedId?: number
}>()

const emit = defineEmits<{
  (event: 'select', income: Income): void
}>()
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Titel</th>
          <th>Kategorie</th>
          <th class="right">Betrag</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="income in incomes"
          :key="income.id"
          :class="{ selected: income.id === selectedId }"
          @click="emit('select', income)"
        >
          <td>
            <div class="title-cell">
              <span class="dot">↑</span>

              <div>
                <span class="title">{{ income.title }}</span>
                <span class="date">{{ income.date }}</span>
              </div>
            </div>
          </td>

          <td>
            <span class="category">
              {{ income.category }}
            </span>
          </td>

          <td class="amount right">
            + {{ income.amount.toFixed(2) }} €
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  padding: 13px 20px;

  text-align: left;

  background: #f9fafb;

  color: #6b7280;

  font-size: 12px;
  font-weight: 600;

  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 14px 20px;

  border-top: 1px solid #f0f0f0;

  font-size: 14px;
}

.right {
  text-align: right;
}

tbody tr {
  cursor: pointer;
  transition: background 0.15s;
}

tbody tr:hover {
  background: #f9fafb;
}

tbody tr.selected {
  background: #f0fdf4;
  box-shadow: inset 3px 0 0 #16a34a;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  background: #f0fdf4;
  color: #16a34a;

  border-radius: 8px;

  font-weight: 700;
}

.title {
  display: block;

  font-weight: 600;
  color: #111827;
}

.date {
  display: block;

  margin-top: 2px;

  color: #9ca3af;
  font-size: 12px;
}

.category {
  display: inline-block;

  padding: 4px 9px;

  background: #ecfdf5;

  border-radius: 6px;

  color: #047857;

  font-size: 12px;
  font-weight: 500;
}

.amount {
  font-weight: 700;
  color: #16a34a;
  white-space: nowrap;
}
</style>
