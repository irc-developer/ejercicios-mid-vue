import { createRouter, createWebHistory } from 'vue-router' 
import UsersLayout from '@/users/layout/UsersLayout.vue'
import UsersListPage from '@/users/pages/UsersListPage.vue'
import UserPage from '@/users/pages/UserPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UsersLayout,
      redirect: {name:'list'},
      children: [
        {path: 'list', name: 'list', component: UsersListPage},
        {path: '/clients/:id', name: 'client-id', component: UserPage},
      ]
    },
  ]
})

export default router
