<template>
  <div class="sidebar col-sm-3 col-md-3">
    <notepad></notepad>
  </div>
  <editor></editor>
</template>

<script>
  import Notepad from './Notepad.vue'
  import Editor from './Editor.vue'

  export default {
    data() {
      return {
        note: {}
      }
    },
    components: {
      Notepad,
      Editor
    }
  }
</script>

<style lang="less" scoped>
  .sidebar {
    height: 100vh;
    padding: 0;
    overflow-y: auto;
    background-color: #ECF0F1;
  }
</style>