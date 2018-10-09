import Vue from 'vue'
import App from './app.vue'

import '$common'

new Vue({
  render: h => h(App)
}).$mount('#app')