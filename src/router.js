import { createRouter, createWebHistory } from 'vue-router'
import { AuthGuard } from './services/AuthService'

/**
 * Helper function to dynamically load Vue.js page components
 * @param {string} page - The name of the page component to be loaded
 * @returns {Promise} - A promise that resolves to the imported module
 */
function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

/**
 * Configuration for the Vue.js router
 * @type {Array.<{path: string, name: string, component: Function, beforeEnter: Function}>}
 */
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
    beforeEnter: AuthGuard
  }
]

/**
 * Router instance configured with a history mode and the defined routes
 * @type {Router}
 */
export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHistory(),
  routes
})
