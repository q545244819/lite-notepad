<template>
  <div id="app" class="container-fluid">
    <div class="row clean">
      <toolbar></toolbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Toolbar from './components/Toolbar.vue'

  export default {
    data () {
      return {
        msg: `Hello Vue!`
      }
    },
    replace: false,
    components: {
      Toolbar
    }
  }
</script>

<style lang="less"></style>
