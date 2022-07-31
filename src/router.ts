import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/components/Canvas.vue'),
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
