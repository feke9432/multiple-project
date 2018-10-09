<template>
  <div class="app">
    <h1 class="t-1">主页</h1>
    <p>{{ message }}</p>
    <hello></hello>
  </div>
</template>

<script>
import hello from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      message: 'this is index page message'
    }
  },
  components: {
    hello
  }
}
</script>
<style>
.t-1 {
  font-size: 22px;
}
</style>


