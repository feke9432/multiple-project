<template>
  <div class="app">
    <h1>关于</h1>
    <p>{{message}}</p>
    <a href="/Member/Welcome">/Member/Welcome</a>
    <ul>
      <li>
        <router-link to='/one'>one</router-link>
      </li>
      <li>
        <router-link to="/two">two</router-link>
      </li>
      <li>
        <router-link to="/three">three</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: `this is about page message`
    }
  },
  watch: {
    $route (to, from) {
      
    }
  },
  methods: {
    addActive() {

    }
  }
}
</script>

<style>
.router-link-active,.router-link-exact-active, a:focus {
  color: red!important;
  font-size: 18px;
}
</style>
