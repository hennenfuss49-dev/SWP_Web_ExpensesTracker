<script setup lang="ts">
import type { Expense } from '../types/Expense'

defineProps<{
  expense: Expense | null
}>()
</script>

<template>
  <div class="detail">

    <div class="detail-header">
      <h3>Details</h3>
    </div>

    <div v-if="expense" class="details">

      <div class="amount-box">
        <span>Ausgegeben</span>

        <strong>
          − {{ expense.amount.toFixed(2) }} €
        </strong>
      </div>

      <div class="detail-row">
        <span>Titel</span>
        <strong>{{ expense.title }}</strong>
      </div>

      <div class="detail-row">
        <span>Kategorie</span>
        <strong>{{ expense.category }}</strong>
      </div>

      <div class="detail-row">
        <span>Datum</span>
        <strong>{{ expense.date }}</strong>
      </div>

    </div>

    <div v-else class="empty">
      <div class="empty-icon">↓</div>

      <h4>Keine Auswahl</h4>

      <p>
        Klicke auf eine Ausgabe,
        um die Details anzuzeigen.
      </p>
    </div>

  </div>
</template>

<style scoped>
.detail {
  height: 100%;
}

.detail-header {
  padding: 20px;

  border-bottom: 1px solid #e5e7eb;
}

.detail-header h3 {
  margin: 0;
  font-size: 16px;
}

.details {
  padding: 20px;
}

/* Amount */

.amount-box {
  padding: 18px;

  margin-bottom: 20px;

  background: linear-gradient(135deg, #fef2f2, #fee2e2);

  border: 1px solid #fecaca;
  border-radius: 10px;
}

.amount-box span {
  display: block;

  margin-bottom: 5px;

  color: #dc2626;
  font-size: 13px;
}

.amount-box strong {
  font-size: 25px;
  color: #7f1d1d;
}

/* Rows */

.detail-row {
  display: flex;
  justify-content: space-between;

  padding: 13px 0;

  border-bottom: 1px solid #f0f0f0;

  font-size: 14px;
}

.detail-row span {
  color: #6b7280;
}

.detail-row strong {
  color: #111827;
}

/* Empty */

.empty {
  padding: 50px 25px;

  text-align: center;
}

.empty-icon {
  width: 45px;
  height: 45px;

  margin: 0 auto 15px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #fef2f2;

  border-radius: 50%;

  color: #dc2626;

  font-weight: 700;
}

.empty h4 {
  margin: 0 0 5px;
}

.empty p {
  margin: 0;

  color: #9ca3af;

  font-size: 13px;
  line-height: 1.5;
}
</style>
