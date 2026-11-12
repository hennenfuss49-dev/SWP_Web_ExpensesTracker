
import express from 'express'
import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'

const app = express()
const PORT = 3001

app.use(express.json())

// SQLite-Datenbank öffnen oder erstellen
const db = new Database('expenses.db')

// Tabelle für Ausgaben erstellen
db.exec(`
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`)

// Beispieldaten nur beim ersten Start importieren
const initialized = db.prepare(
  "SELECT value FROM settings WHERE key = 'initialized'"
).get()

if (!initialized) {
  const filePath = path.join(process.cwd(), 'public', 'expenses.json')
  const expenses = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  const insert = db.prepare(`
    INSERT INTO expenses (id, title, category, amount, date)
    VALUES (@id, @title, @category, @amount, @date)
  `)

  const initialize = db.transaction(() => {
    for (const expense of expenses) {
      insert.run(expense)
    }

    db.prepare(`
      INSERT INTO settings (key, value)
      VALUES ('initialized', 'true')
    `).run()
  })

  initialize()
}

// Alle Ausgaben laden
app.get('/api/expenses', (req, res) => {
  const expenses = db.prepare(
    'SELECT * FROM expenses ORDER BY id'
  ).all()

  res.json(expenses)
})

// Alle Ausgaben speichern
app.put('/api/expenses', (req, res) => {
  const expenses = req.body

  if (!Array.isArray(expenses)) {
    return res.status(400).json({ error: 'Ungültige Daten' })
  }

  const insert = db.prepare(`
    INSERT INTO expenses (id, title, category, amount, date)
    VALUES (@id, @title, @category, @amount, @date)
  `)

  const save = db.transaction(() => {
    db.prepare('DELETE FROM expenses').run()

    for (const expense of expenses) {
      insert.run(expense)
    }
  })

  try {
    save()
    res.json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Speichern fehlgeschlagen' })
  }
})

app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`)
})
