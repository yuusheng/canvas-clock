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
  {
    path: '/user',
    name: 'user',
    component: () => import('~/pages/User/Index.vue'),
  },
  {
    path: '/star',
    name: 'star',
    component: () => import('~/pages/Star/Index.vue'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('~/pages/Settings/Index.vue'),
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
