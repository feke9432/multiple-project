import Vue from 'vue'
import app from './app.vue'
import Router from 'vue-router'

import '$common'

let router = new Router({
  routes: [{
    path: '/',
    redirect: '/one',
  }, {
    path: '/one',
    component: () => import('./components/one.vue')
  }, {
    path: '/two',
    component: () => import('./components/two.vue')
  }, {
    path: '/three',
    component: () => import('./components/three.vue')
  }]
})

router.beforeEach((to, from, next) => {
  var key = location.search.replace('?', '')
  if (key !== '') location.href = '/about#' + key
  next()
})

Vue.use(Router)

new Vue({
  render: f => f(app),
  router
}).$mount('#app')