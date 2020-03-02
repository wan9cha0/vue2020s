<template>
  <div class="headers clearfix">
    <div class="logo">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="nav">
      <router-link to="/index">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/page1">分页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<style lang="scss"  scoped>
.headers {
  width: 100%;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: rgb(34, 76, 168);
  padding: 0 20px;
  line-height: 60px;
  .logo {
    float: left;
    img {
      width: 50px;
      vertical-align: middle;
    }
  }
  .nav {
    float: right;
    color: #fff;
    a {
      margin: 0 20px;
    }
  }
}
</style>
