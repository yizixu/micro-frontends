import IndexView from '@/views/IndexView.vue'
export default [
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
