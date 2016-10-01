<template>
  <div id="app" class="container-fluid">
    <div class="row clean">
      <toolbar></toolbar>
      <note></note>
      <router-view></router-view>
    </div>
    <alert :show.sync="alert.show" :placement="alert.placement" :duration="alert.duration" :type="alert.type" width="200px">
      <p>
        <b>提示：</b>
        <span v-text="alert.content"></span>
      </p>
    </alert>
  </div>
</template>

<script>
  import store from './vuex/store'
  import Toolbar from './components/Toolbar.vue'
  import Note from './components/Note.vue'
  import { alert } from 'vue-strap'

  export default {
    data() {
      return {
        alert: {
          show: false,
          type: '',
          placement: '',
          content: '',
          duration: 0
        }
      }
    },
    events: {
      alert(obj) {
        this.alert.show = obj.show
        this.alert.type = obj.type
        this.alert.placement = obj.placement
        this.alert.duration = obj.duration
        this.alert.content = obj.content
      }
    },
    components: {
      Toolbar,
      Note,
      alert
    },
    replace: false,    
    store
  }
</script>

<style lang="less"></style>
