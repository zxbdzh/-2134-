import { createRouter, createWebHistory } from 'vue-router'
import StudentDashboard from './views/StudentDashboard.vue'
import ClassDashboard from './views/ClassDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/student'
    },
    {
      path: '/student',
      name: 'student',
      component: StudentDashboard
    },
    {
      path: '/class',
      name: 'class',
      component: ClassDashboard
    }
  ]
})

export default router