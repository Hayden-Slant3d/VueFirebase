import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { router } from './router'
import { setupAuthListener } from './services/AuthService.js'

const root = createApp(App)
setupAuthListener()

root
  .use(router)
  .mount('#app')
