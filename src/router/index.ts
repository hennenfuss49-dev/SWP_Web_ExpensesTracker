import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import IncomesView from '../views/IncomesView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpensesView
    },
    {
      path: '/incomes',
      name: 'incomes',
      component: IncomesView
    }
  ]
})

export default router