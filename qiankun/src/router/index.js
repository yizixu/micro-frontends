import Vue from 'vue'
import VueRouter from 'vue-router'
// import IndexView from '@/views/IndexView.vue'
import loginView from '@/views/Login/index.vue'

import app1Routes from './modules/app1'
import app2Routes from './modules/app2'

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/Redirect/index')
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  }
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/app1'
  },
  ...app1Routes,
  ...app2Routes
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
