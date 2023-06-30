import { createRouter, createWebHashHistory } from 'vue-router'
import { AuthGuard } from './services/AuthService'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/test',
    name: 'Test',
    component: loadPage('TestPage'),
    beforeEnter: AuthGuard
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: AuthGuard // THIS IS WHAT I AM WANTING TO ADD
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
