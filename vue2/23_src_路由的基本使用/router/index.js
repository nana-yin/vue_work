import VueRouter from 'vue-router'
import Home from '../components/home'
import About from '../components/about'

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
})