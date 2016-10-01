<template>
  <div class="disable col-sm-8 col-md-8">
    <i class="fa fa-frown-o" aria-hidden="true"></i>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  .disable {
    position: relative;
    height: 100vh;

    .fa-frown-o {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 124px;
    }
  }
</style>