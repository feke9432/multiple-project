<template>
  <div class="app">
    <h1>关于</h1>
    <p>{{message}}</p>
    <product></product>
  </div>
</template>

<script>
import product from "./components/product";
export default {
  data () {
    return {
      message: `this is about page message`
    }
  },
  components: {
    product
  }
}
</script>

