<template>
  <div id="app" class="container-fluid">
    <div class="row clean">
      <toolbar></toolbar>
      <note></note>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import store from './vuex/store'
  import Toolbar from './components/Toolbar.vue'
  import Note from './components/Note.vue'

  export default {
    replace: false,
    components: {
      Toolbar,
      Note
    },
    store
  }
</script>

<style lang="less"></style>
