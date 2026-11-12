
import type { Expense } from '../types/Expense'

const API_URL = '/api/expenses'

// Alle Ausgaben aus der SQLite-Datenbank laden
export async function loadExpenses(): Promise<Expense[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Ausgaben konnten nicht geladen werden')
  }

  return await response.json() as Expense[]
}

// Alle Ausgaben in der SQLite-Datenbank speichern
export async function saveExpenses(expenses: Expense[]): Promise<void> {
  const response = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expenses)
  })

  if (!response.ok) {
    throw new Error('Ausgaben konnten nicht gespeichert werden')
  }
}
