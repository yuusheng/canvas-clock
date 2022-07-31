import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/pages/Home/Home.vue'),
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
