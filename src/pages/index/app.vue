<template>
  <div class="app">
    <h1 class="t-1">主页</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import './index.js'
export default {
  data() {
    return {
      message: 'this is index page message'
    }
  }
}
</script>
<style>
.t-1 {
  font-size: 22px;
}
</style>


