import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import loginView from '../views/Login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/',
    component: IndexView
  },
  {
    path: '/app1/*',
    name: 'app1Other',
    component: IndexView
  },
  {
    path: '/app1',
    name: 'app1',
    component: IndexView
  },
  {
    path: '/app2/*',
    name: 'app2Other',
    component: IndexView
  },
  {
    path: '/app2',
    name: 'app2',
    component: IndexView
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
