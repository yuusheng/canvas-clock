import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/Home/Index.vue'),
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('~/pages/Statistics/Index.vue'),
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
