import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import App from './App.vue'
import { router } from './router'
import './style.css'
import { useAuthStore } from './stores/auth'

const queryClient = new QueryClient()

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()
authStore.loadUser()

app.use(VueQueryPlugin, { queryClient })
app.use(router)
app.mount('#app')
