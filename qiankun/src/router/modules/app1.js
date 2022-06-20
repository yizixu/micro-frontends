import IndexView from '@/views/IndexView.vue'
export default [
  {
    path: '/app1/*',
    name: 'app1Other',
    component: IndexView
  },
  {
    path: '/app1',
    name: 'app1',
    component: IndexView
  }
]
