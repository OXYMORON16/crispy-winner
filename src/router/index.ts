import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Login from '../views/Login.vue';
import StudentDashboard from '@/views/StudentDashboard.vue';
import UploadData from '@/views/UploadData.vue';
import CompanyDashboard from '@/views/CompanyDashboard.vue';
import Register from '@/views/Register.vue';
import Settings from '@/views/Settings.vue';
import store from '@/store'

const authGuard = (to: any, from: any, next: any) => {
  if (Object.keys(store.getters['user/getCurrentUser']).length) {
      next()
  } else {
    next("/login")
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: store.getters['user/getCurrentUser'] && store.getters['user/getCurrentUser'].role == 'student' ? '/company-dashboard' : '/student-dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: StudentDashboard,
    beforeEnter: authGuard
  },
  {
    path: '/upload-data',
    name: 'UploadData',
    component: UploadData,
    beforeEnter: authGuard
  },
  {
    path: '/company-dashboard',
    name: 'CompanyDashboard',
    component: CompanyDashboard,
    beforeEnter: authGuard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
