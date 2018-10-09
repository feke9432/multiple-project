import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Vue from 'vue'
import app from './app.vue'

import '$art/head.js'

new Vue({
  render: f => f(app)
}).$mount('#app')