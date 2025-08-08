import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import OrderQueue from './views/OrderQueue.vue'
import './style.css'

const routes = [
  { path: '/', component: OrderQueue },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')