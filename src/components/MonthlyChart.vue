<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  type TooltipItem
} from 'chart.js'

import type { Expense } from '../types/Expense'
import type { Income } from '../types/Income'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps<{
  expenses: Expense[]
  incomes: Income[]
}>()

// "2026-09-21" -> "2026-09"
function sumByMonth(items: { date: string; amount: number }[]) {
  const totals: Record<string, number> = {}

  for (const item of items) {
    const month = item.date.slice(0, 7)
    totals[month] = (totals[month] ?? 0) + item.amount
  }

  return totals
}

const months = computed(() =>
  [...new Set([...props.expenses, ...props.incomes].map(item => item.date.slice(0, 7)))].sort()
)

// "2026-09" -> "Sep 2026"
function formatMonth(month: string) {
  const [year, monthNumber] = month.split('-').map(Number)

  return new Date(year!, monthNumber! - 1).toLocaleDateString('de-AT', {
    month: 'short',
    year: 'numeric'
  })
}

const chartData = computed(() => {
  const expenseTotals = sumByMonth(props.expenses)
  const incomeTotals = sumByMonth(props.incomes)

  return {
    labels: months.value.map(formatMonth),
    datasets: [
      {
        label: 'Einnahmen',
        data: months.value.map(month => incomeTotals[month] ?? 0),
        backgroundColor: '#16a34a',
        borderRadius: 6
      },
      {
        label: 'Ausgaben',
        data: months.value.map(month => expenseTotals[month] ?? 0),
        backgroundColor: '#dc2626',
        borderRadius: 6
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { usePointStyle: true, boxWidth: 8, padding: 14 }
    },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'bar'>) =>
          ` ${context.dataset.label}: ${(context.parsed.y ?? 0).toFixed(2)} €`
      }
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      beginAtZero: true,
      grid: { color: '#f0f0f0' },
      ticks: { callback: (value: string | number) => `${value} €` }
    }
  }
}
</script>

<template>
  <div class="chart-card">
    <h3>Einnahmen vs. Ausgaben pro Monat</h3>

    <div v-if="months.length" class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <p v-else class="empty">Noch keine Einträge vorhanden.</p>
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
