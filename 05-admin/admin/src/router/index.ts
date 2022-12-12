import { createRouter, createWebHistory } from 'vue-router' 
import UsersPage from '@/users/pages/UsersPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_API_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: UsersPage
    }
  ]
})

export default router
