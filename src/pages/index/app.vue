<template>
  <div class="app">
    <h1 class="t-1">主页</h1>
    <p>{{ message }}</p>
    <a style="font-size: 20px" href="/about?two">two</a>
  </div>
</template>

<script>
import $agent from '@/util/api'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      message: 'this is index page message'
    }
  },
  
  created() {
    
  }
}
</script>
<style>
.t-1 {
  font-size: 22px;
}
</style>


