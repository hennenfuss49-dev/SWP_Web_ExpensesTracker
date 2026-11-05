<script setup lang="ts">
import { ref } from 'vue'

import type { Expense } from '../types/Expense'

defineProps<{
  categories: string[]
}>()

const emit = defineEmits<{
  (event: 'save', expense: Omit<Expense, 'id'>): void
  (event: 'cancel'): void
}>()

const title = ref('')
const category = ref('')
const amount = ref<number | null>(null)
const date = ref(new Date().toISOString().slice(0, 10))

const error = ref('')

function submit() {
  if (!title.value.trim() || !category.value.trim() || !date.value) {
    error.value = 'Bitte fülle alle Felder aus.'
    return
  }

  if (!amount.value || amount.value <= 0) {
    error.value = 'Der Betrag muss größer als 0 sein.'
    return
  }

  emit('save', {
    title: title.value.trim(),
    category: category.value.trim(),
    amount: Math.round(amount.value * 100) / 100,
    date: date.value
  })
}
</script>

<template>
  <div class="overlay" @click.self="emit('cancel')">
    <form class="modal" @submit.prevent="submit">

      <div class="modal-header">
        <h3>Neue Ausgabe</h3>

        <button type="button" class="close-button" @click="emit('cancel')">
          ✕
        </button>
      </div>

      <div class="fields">
        <label>
          <span>Titel</span>
          <input v-model="title" type="text" placeholder="z.B. Supermarkt" autofocus />
        </label>

        <label>
          <span>Kategorie</span>
          <input v-model="category" type="text" list="expense-categories" placeholder="z.B. Essen" />

          <datalist id="expense-categories">
            <option v-for="item in categories" :key="item" :value="item" />
          </datalist>
        </label>

        <div class="row">
          <label>
            <span>Betrag (€)</span>
            <input v-model.number="amount" type="number" min="0.01" step="0.01" placeholder="0.00" />
          </label>

          <label>
            <span>Datum</span>
            <input v-model="date" type="date" />
          </label>
        </div>

        <p v-if="error" class="error">{{ error }}</p>
      </div>

      <div class="actions">
        <button type="button" class="cancel-button" @click="emit('cancel')">
          Abbrechen
        </button>

        <button type="submit" class="save-button">
          Speichern
        </button>
      </div>

    </form>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 16px;

  background: rgba(17, 24, 39, 0.45);
}

.modal {
  width: 100%;
  max-width: 440px;

  background: white;

  border-radius: 14px;

  box-shadow: 0 20px 45px -15px rgba(17, 24, 39, 0.4);
}

/* Header */

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;

  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  margin: 0;
  font-size: 16px;
}

.close-button {
  border: none;
  background: none;

  color: #9ca3af;
  font-size: 16px;

  cursor: pointer;
}

.close-button:hover {
  color: #111827;
}

/* Fields */

.fields {
  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 20px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

label span {
  display: block;

  margin-bottom: 6px;

  color: #6b7280;
  font-size: 13px;
  font-weight: 500;
}

input {
  width: 100%;

  padding: 10px 12px;

  border: 1px solid #e5e7eb;
  border-radius: 8px;

  font-size: 14px;

  transition: 0.2s;
}

input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px #fee2e2;
}

.error {
  margin: 0;

  padding: 10px 12px;

  background: #fef2f2;

  border-radius: 8px;

  color: #b91c1c;
  font-size: 13px;
}

/* Actions */

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  padding: 16px 20px;

  border-top: 1px solid #e5e7eb;
}

.cancel-button,
.save-button {
  padding: 10px 16px;

  border-radius: 8px;

  font-weight: 600;
  cursor: pointer;

  transition: 0.2s;
}

.cancel-button {
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
}

.cancel-button:hover {
  background: #f9fafb;
}

.save-button {
  border: none;
  background: #dc2626;
  color: white;
}

.save-button:hover {
  background: #b91c1c;
}

@media (max-width: 480px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
