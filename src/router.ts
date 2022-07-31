import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/components/canvas.vue'),
  },
]

export default createRouter({
  routes,
  history: createWebHashHistory(),
})
