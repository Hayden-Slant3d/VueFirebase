import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp, watch } from 'vue'
// @ts-ignore
import App from './App.vue'
import { router } from './router'
import { setupAuthListener } from './services/AuthService.js'
import { AppState } from './AppState'

const root = createApp(App)
setupAuthListener()

watch(() => AppState.isLoading, (isLoading) => {
  if (!isLoading) {
    root
      .use(router)
      .mount('#app')
  }
})
