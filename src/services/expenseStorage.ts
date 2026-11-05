import type { Expense } from '../types/Expense'

const STORAGE_KEY = 'expenses'

// Gespeicherte Ausgaben aus dem localStorage laden,
// beim ersten Start die Beispieldaten aus expenses.json verwenden
export async function loadExpenses(): Promise<Expense[]> {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored) {
    return JSON.parse(stored) as Expense[]
  }

  const response = await fetch('/expenses.json')
  const expenses = await response.json() as Expense[]

  saveExpenses(expenses)

  return expenses
}

export function saveExpenses(expenses: Expense[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}
