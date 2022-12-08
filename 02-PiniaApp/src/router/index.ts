import { createRouter, createWebHistory } from 'vue-router' 
import ClientsLayout from '@/clients/layout/ClientsLayout.vue'
import ClientPage from '@/clients/pages/ClientPage.vue'
import ListPage from '@/clients/pages/ListPage.vue'
import Counter1Value from '@/counter/pages/Counter1Value.vue'
import CounterSetupPage from '@/counter/pages/CounterSetupPage.vue'

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
    {
      path: '/clients',
      name: 'clients',
      component: ClientsLayout,
      redirect: {name:'list'},
      children: [
        {path: 'list', name: 'list', component: ListPage},
        {path: '/clients/:id', name: 'client-id', component: ClientPage},
      ]
    },
  ]
})

export default router
