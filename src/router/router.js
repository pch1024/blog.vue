import Home from '@/pages/home'
import DOC from '@/pages/doc'
import Login from '@/pages/login'
import MD from '@/pages/md'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/doc/:id', name: 'doc', component: DOC },
    { path: '/md', name: 'md', component: MD }
  ]
})
