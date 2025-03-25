import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/anys',
      name: 'anys',
      component: () => import('../views/AnysView.vue'),
    },
    {
      path: '/detall_any/:any',
      name: 'detall_any',
      component: () => import('../views/DetallAnyView.vue'),
      props: route => ({ any: route.params.any }),
    },
    {
      path: '/detall_centre/:centre/:any',
      name: 'detall_centre',
      component: () => import('../views/DetallCentreView.vue'),
      props: route => ({ any: route.params.any, centre: route.params.centre }),
    },
  ],
})

export default router
