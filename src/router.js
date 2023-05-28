import { createRouter, createWebHistory } from 'vue-router'
import Home from "./views/Home.vue"
import About from "./views/About.vue"

//router for the url
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]

//create router
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })
  export default router