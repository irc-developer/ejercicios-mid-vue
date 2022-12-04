import Counter1Value from '@/counter/pages/Counter1Value.vue'
import CounterSetupPage from '@/counter/pages/CounterSetupPage.vue'
import { createRouter, createWebHistory } from 'vue-router' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Counter1Value
    },
    {
      path: '/counter-2',
      name: 'counter-2',
      component: CounterSetupPage
    },
  ]
})

export default router
