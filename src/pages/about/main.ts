import Vue from 'vue'
import app from './app.vue'

import '$common'

new Vue({
  render: f => f(app)
}).$mount('#app')