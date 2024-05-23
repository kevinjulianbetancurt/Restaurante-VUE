import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Menus from '../views/Menus';
import EditarMenu from '../components/menus/EditarMenu.vue';
import NewMenu from '../components/menus/NewMenu.vue';

import Reservas from '../views/Reservas';
import EditarReserva from '../components/reservas/EditarReserva.vue';
import NewReserva from '../components/reservas/NewReserva.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menus',
    name: 'Menus',
    component: Menus
  },
  {
    path: '/editar-menu/:id',
    name: 'EditarMenu',
    component: EditarMenu
  },
  {
    path: '/add-menu/',
    name: 'NewMenu',
    component: NewMenu
  },
  {
    path: '/reservas',
    name: 'Reservas',
    component: Reservas
  },
  {
    path: '/editar-reserva/:id',
    name: 'EditarReserva',
    component: EditarReserva
  },
  {
    path: '/add-reserva/',
    name: 'NewReserva',
    component: NewReserva
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
