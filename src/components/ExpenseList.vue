<script setup lang="ts">
import type { Expense } from '../types/Expense'

defineProps<{
  expenses: Expense[]
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
          <th>Betrag</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="expense in expenses"
          :key="expense.id"
          @click="emit('select', expense)"
        >
          <td class="title">
            {{ expense.title }}
          </td>

          <td>
            <span class="category">
              {{ expense.category }}
            </span>
          </td>

          <td class="amount">
            {{ expense.amount.toFixed(2) }} €
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
  padding: 16px 20px;

  border-top: 1px solid #f0f0f0;

  font-size: 14px;
}

tbody tr {
  cursor: pointer;
  transition: background 0.15s;
}

tbody tr:hover {
  background: #f9fafb;
}

.title {
  font-weight: 600;
  color: #111827;
}

.category {
  display: inline-block;

  padding: 4px 9px;

  background: #f3f4f6;

  border-radius: 6px;

  color: #4b5563;

  font-size: 12px;
}

.amount {
  font-weight: 600;
  color: #111827;
}
</style>