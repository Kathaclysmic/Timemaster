import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue"

//router for the url
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]

//create router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  export default router