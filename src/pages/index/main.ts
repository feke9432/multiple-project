import Vue from 'vue'
import App from './app.vue'

import '$common'

import './css/index.scss'

new Vue({
  render: h => h(App)
}).$mount('#app')