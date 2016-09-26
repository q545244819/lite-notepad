<template>
  <div class="sidebar col-sm-3 col-md-3">
    <router-view></router-view>
  </div>
  <editor></editor>
</template>

<script>
  import Editor from './Editor.vue'

  export default {
    components: {
      Editor
    }
  }
</script>

<style lang="less" scoped>
  .sidebar {
    height: 100vh;
    overflow-y: auto;
    background-color: #ECF0F1;
  }
</style>