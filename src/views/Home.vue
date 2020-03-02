<template>
  <div class="home">
    <headers></headers>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import headers from "@/components/headers.vue";

export default {
  name: "home",
  components: {
    headers
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  padding-top: 60px;
}
</style>
