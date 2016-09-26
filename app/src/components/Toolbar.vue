<template>
  <div class="toolbar col-sm-1 col-md-1">
    <nav>
      <a v-link="{ path: '/user', activeClass: 'active' }" class="glyphicon glyphicon-user"></a>
      <a v-link="{ path: '/notepad', activeClass: 'active' }" class="glyphicon glyphicon-book"></a>
      <a v-link="{ path: '/setting', activeClass: 'active' }" class="glyphicon glyphicon-cog"></a>
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
        &:hover,
        &:active,
        &:link {
          text-decoration: none;
        }
        &.active {
          background-color: #34495E;
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