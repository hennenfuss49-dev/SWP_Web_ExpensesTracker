import type { Income } from '../types/Income'

const STORAGE_KEY = 'incomes'

// Gespeicherte Einnahmen aus dem localStorage laden,
// beim ersten Start die Beispieldaten aus incomes.json verwenden
export async function loadIncomes(): Promise<Income[]> {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (stored) {
    return JSON.parse(stored) as Income[]
  }

  const response = await fetch('/incomes.json')
  const incomes = await response.json() as Income[]

  saveIncomes(incomes)

  return incomes
}

export function saveIncomes(incomes: Income[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(incomes))
}
