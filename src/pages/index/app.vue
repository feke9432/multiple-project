<template>
  <div class="app">
    <h1 class="t-1">主页</h1>
    <p>{{ message }}</p>
    <hello></hello>
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
    let reqMsg = {
      password: "11111111",
      userName: "root"
    }
    $agent.Api('Auth', '/Account/LogOnForCRMUser', reqMsg, (resp) => {
      if (resp.IsSuccess) {
        Cookies.set(this.$agent.sidKey, resp.Body.Token)
        let info = JSON.stringify(resp.Body.Data);
        Cookies.set(this.$agent.userKey, info)
      } else {
        alert(resp.Message)
      }
    })
  }
}
</script>
<style>
.t-1 {
  font-size: 22px;
}
</style>


