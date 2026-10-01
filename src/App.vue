<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <div class="logo-icon">€</div>

          <div>
            <h1>Expense Tracker</h1>
            <span>Deine Finanzen im Überblick</span>
          </div>
        </div>

        <nav class="navigation">
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/expenses">Ausgaben</RouterLink>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  background: #f5f7fb;
  color: #1f2937;
}

button,
input,
select {
  font: inherit;
}

.app {
  min-height: 100vh;
}

/* Header */

.header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
}

.header-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 18px 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #2563eb;
  color: white;

  border-radius: 10px;

  font-size: 20px;
  font-weight: 700;
}

.logo h1 {
  margin: 0;
  font-size: 19px;
}

.logo span {
  color: #6b7280;
  font-size: 13px;
}

/* Navigation */

.navigation {
  display: flex;
  gap: 8px;
}

.navigation a {
  padding: 9px 14px;

  color: #6b7280;
  text-decoration: none;

  border-radius: 8px;

  font-size: 14px;
  font-weight: 500;

  transition: 0.2s;
}

.navigation a:hover {
  background: #f3f4f6;
  color: #111827;
}

.navigation a.router-link-active {
  background: #eff6ff;
  color: #2563eb;
}

/* Main */

.main-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 24px;
}
</style>