<template>
  <div class="dashboard">
    <section class="welcome">
      <div>
        <p class="eyebrow">ÜBERSICHT</p>

        <h2>Willkommen zurück 👋</h2>

        <p class="description">
          Behalte deine Einnahmen und Ausgaben im Blick.
        </p>
      </div>

      <RouterLink to="/expenses" class="primary-button">
        Ausgaben anzeigen
      </RouterLink>
    </section>

    <section class="cards">
      <div class="card">
        <div class="card-header">
          <span>Ausgaben</span>
          <span class="icon red">↓</span>
        </div>

        <strong>0,00 €</strong>

        <p>Dieser Monat</p>
      </div>

      <div class="card">
        <div class="card-header">
          <span>Einnahmen</span>
          <span class="icon green">↑</span>
        </div>

        <strong>0,00 €</strong>

        <p>Dieser Monat</p>
      </div>

      <div class="card">
        <div class="card-header">
          <span>Saldo</span>
          <span class="icon blue">€</span>
        </div>

        <strong>0,00 €</strong>

        <p>Aktueller Stand</p>
      </div>
    </section>

    <section class="info-box">
      <div>
        <h3>Starte mit deinen Ausgaben</h3>

        <p>
          Füge deine ersten Einnahmen oder Ausgaben hinzu,
          um deine Finanzen zu verwalten.
        </p>
      </div>

      <RouterLink to="/expenses" class="secondary-button">
        Einträge verwalten →
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

/* Welcome */

.welcome {
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: white;
  padding: 32px;

  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.eyebrow {
  margin: 0 0 8px;

  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.welcome h2 {
  margin: 0;

  font-size: 28px;
  color: #111827;
}

.description {
  margin: 8px 0 0;

  color: #6b7280;
}

/* Buttons */

.primary-button,
.secondary-button {
  text-decoration: none;
  border-radius: 8px;

  font-weight: 600;
  font-size: 14px;

  transition: 0.2s;
}

.primary-button {
  background: #2563eb;
  color: white;

  padding: 11px 18px;
}

.primary-button:hover {
  background: #1d4ed8;
}

.secondary-button {
  background: white;
  color: #2563eb;

  border: 1px solid #dbeafe;

  padding: 10px 16px;
}

.secondary-button:hover {
  background: #eff6ff;
}

/* Cards */

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.card {
  background: white;

  border: 1px solid #e5e7eb;
  border-radius: 14px;

  padding: 22px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #6b7280;
  font-size: 14px;
}

.card strong {
  display: block;

  margin-top: 18px;

  font-size: 25px;
  color: #111827;
}

.card p {
  margin: 5px 0 0;

  color: #9ca3af;
  font-size: 13px;
}

/* Icons */

.icon {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  font-weight: 700;
}

.red {
  background: #fef2f2;
  color: #dc2626;
}

.green {
  background: #f0fdf4;
  color: #16a34a;
}

.blue {
  background: #eff6ff;
  color: #2563eb;
}

/* Info */

.info-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 24px;

  background: #eff6ff;

  border: 1px solid #dbeafe;
  border-radius: 14px;
}

.info-box h3 {
  margin: 0 0 5px;
  color: #1e3a8a;
}

.info-box p {
  margin: 0;
  color: #3b82f6;
  font-size: 14px;
}

/* Responsive */

@media (max-width: 700px) {
  .header-content {
    flex-direction: column;
    gap: 15px;
  }

  .welcome {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .info-box {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
</style>