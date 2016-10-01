<template>
  <div class="editor col-sm-8 col-md-8">
    <input type="text" class="form-control" placeholder="请输入笔记标题" v-model="note.title">
    <div>
      <vue-html5-editor :content.sync="note.content" :auto-height="true"></vue-html5-editor>
    </div>
  </div>
</template>

<script>
  import {
    getNoteById
  } from '../vuex/getters'

  export default {
    vuex: {
      getters: {
        note: getNoteById
      }
    }
  }
</script>

<style lang="less" scoped>
  .editor {
    position: relative;
    overflow: auto;
    height: 100vh;
    padding: 0;

    .form-control {    
      border-radius: 0;
      border-color: #ddd;
    }

    .vue-html5-editor {
      border-top: none;
      border-bottom: none;
      border-radius: 0;
    }
  }
</style>