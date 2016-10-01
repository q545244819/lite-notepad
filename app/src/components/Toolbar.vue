<template>
  <div class="toolbar col-sm-1 col-md-1">
    <nav>
      <a class="fa fa-plus" aria-hidden="true"></a>
      <a class="fa fa-times" aria-hidden="true"></a>
      <a class="fa fa-refresh" aria-hidden="true"></a>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .toolbar {
    position: relative;
    overflow: hidden;
    height: 100vh;
    padding: 0;
    background-color: #2C3E50;
    color: #fff;
    text-align: center;
    
    nav {
      a {
        cursor: pointer;

        &:hover,
        &:active,
        &:link {
          background-color: #34495E;
          text-decoration: none;
        }

        display: block;
        padding: 20px 0;
        color: #fff;
        font-size: 16px;
      }

      .setting-icon {
        position: absolute;
        width: 100%;        
        bottom: 0;
        left: 0;
      }
    }
  }
</style>