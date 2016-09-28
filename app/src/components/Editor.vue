<template>
  <div class="editor col-sm-8 col-md-8">
    <div class="mask" v-show="mask"></div>
    <div class="input-group">
      <span class="input-group-addon">笔记标题</span>
      <input type="text" class="form-control">
    </div>
    <div>
      <vue-html5-editor :content.sync="content" :z-index="1" :auto-height="true"></vue-html5-editor>      
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: false
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

    .input-group {
      .input-group-addon,
      input[type="text"] {    
        border-radius: 0;
      }
    }

    .vue-html5-editor {
      border-top: none;
      border-bottom: none;
      border-radius: 0;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: .3;
  }
</style>