<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type TooltipItem } from 'chart.js'

import type { Expense } from '../types/Expense'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  expenses: Expense[]
}>()

const colors = ['#dc2626', '#f97316', '#eab308', '#8b5cf6', '#06b6d4', '#ec4899', '#64748b']

// Beträge pro Kategorie aufsummieren, größte zuerst
const totalsByCategory = computed(() => {
  const totals: Record<string, number> = {}

  for (const expense of props.expenses) {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount
  }

  return Object.entries(totals).sort((a, b) => b[1] - a[1])
})

const chartData = computed(() => ({
  labels: totalsByCategory.value.map(([category]) => category),
  datasets: [
    {
      data: totalsByCategory.value.map(([, amount]) => amount),
      backgroundColor: colors,
      borderWidth: 0
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { usePointStyle: true, boxWidth: 8, padding: 14 }
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'doughnut'>) =>
          ` ${context.label}: ${context.parsed.toFixed(2)} €`
      }
    }
  }
}
</script>

<template>
  <div class="chart-card">
    <h3>Ausgaben nach Kategorie</h3>

    <div v-if="expenses.length" class="chart-wrapper">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>

    <p v-else class="empty">Noch keine Ausgaben vorhanden.</p>
  </div>
</template>

<style scoped>
.chart-card {
  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  padding: 22px;
}

.chart-card h3 {
  margin: 0 0 16px;
  font-size: 16px;
}

.chart-wrapper {
  height: 280px;
}

.empty {
  color: #9ca3af;
  font-size: 14px;
}
</style>
