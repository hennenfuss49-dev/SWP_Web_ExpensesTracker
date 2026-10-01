import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExpensesView from '../views/ExpensesView.vue'

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
    }
  ]
})

export default router