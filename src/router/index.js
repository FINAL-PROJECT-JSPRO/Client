import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/subjects',
    name: 'Subject',
    component: () => import('../views/Subjects'),
    children: [
      {
        path: '/',
        component: () => import('../views/Subjects/components/Subjects.vue')
      },
      {
        path: 'exams/:id',
        name: 'Exam',
        component: () => import('../views/exam')
      }
    ]
  },
  {
    path: '/rule',
    name: 'Rule',
    component: () => import('../views/exam/components/ExamRule.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    redirect: '/profile/history',
    component: () => import('../views/Profile/index.vue'),
    children: [
      {
        path: 'history',
        name: 'History',
        component: () => import('../views/Profile/components/History.vue')
      },
      {
        path: 'repositories',
        name: 'Repositories',
        component: () => import('../views/Profile/components/Repository.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'Auth',
    component: () => import('../views/auth'),
    children: [
      {
        path: 'login',
        component: () => import('../views/auth/components/Login.vue')
      },
      {
        path: 'register',
        component: () => import('../views/auth/components/Register.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
