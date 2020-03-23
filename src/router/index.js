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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
  // {
  //   path: '/exams/:id',
  //   name: 'Exam',
  //   component: () => import('../views/exam')
  // },
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
