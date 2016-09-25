<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: `Hello Vue!`
      }
    },
    replace: false
  }
</script>

<style lang="less">
  body {
    font-family: Helvetica, sans-serif;
    h1 {
      color: red;
    }
  }
</style>
