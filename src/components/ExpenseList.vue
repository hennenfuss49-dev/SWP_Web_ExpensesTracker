<script setup lang="ts">
import type { Expense } from '../types/Expense'

defineProps<{
  expenses: Expense[]
  selectedId?: number
}>()

const emit = defineEmits<{
  (event: 'select', expense: Expense): void
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
          v-for="expense in expenses"
          :key="expense.id"
          :class="{ selected: expense.id === selectedId }"
          @click="emit('select', expense)"
        >
          <td>
            <div class="title-cell">
              <span class="dot">↓</span>

              <div>
                <span class="title">{{ expense.title }}</span>
                <span class="date">{{ expense.date }}</span>
              </div>
            </div>
          </td>

          <td>
            <span class="category">
              {{ expense.category }}
            </span>
          </td>

          <td class="amount right">
            − {{ expense.amount.toFixed(2) }} €
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
  background: #fef2f2;
  box-shadow: inset 3px 0 0 #dc2626;
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

  background: #fef2f2;
  color: #dc2626;

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

  background: #fff1f2;

  border-radius: 6px;

  color: #b91c1c;

  font-size: 12px;
  font-weight: 500;
}

.amount {
  font-weight: 700;
  color: #dc2626;
  white-space: nowrap;
}
</style>
