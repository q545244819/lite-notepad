<template>
  <div id="app" class="container-fluid">
    <div class="row clean">
      <toolbar></toolbar>
      <note></note>
      <router-view></router-view>
    </div>
    <alert :show.sync="alert.show" :placement="alert.placement" :duration="alert.duration" :type="alert.type" dismissable="true" width="300px">
      <p>
        <b>提示：</b>
        <span v-text="alert.content"></span>
      </p>
    </alert>
    <history></history>
  </div>
</template>

<script>
  import storage from 'electron-json-storage'
  import { remote, clipboard, ipcRenderer } from 'electron'
  import store from './vuex/store'
  import { alert } from 'vue-strap'
  import {
    login
  } from './vuex/action'
  import Toolbar from './components/Toolbar.vue'
  import Note from './components/Note.vue'
  import History from './components/History.vue'

  const { Menu, MenuItem } = remote
  const menu = new Menu()

  menu.append(new MenuItem({
    label: '剪切',
    role: 'cut'
  }))
  menu.append(new MenuItem({
    label: '复制',
    role: 'copy'
  }))
  menu.append(new MenuItem({
    label: '粘贴',
    role: 'paste'
  }))
  
  if (process.env.NODE_ENV === 'develop') {
    menu.append(new MenuItem({
      label: '开发者工具',
      click: () => ipcRenderer.send('openDevTools')
    }))
  }

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
    vuex: {
      actions: {
        login
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
      History,
      alert
    },
    ready() {
      this.$el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
	      menu.popup(remote.getCurrentWindow());
      })

      storage.get('user', (err, data) => {
        if (data.token) {
          this.login(data.token)
        }
      })
    },
    replace: false,    
    store
  }
</script>

<style lang="less">
  html,
  body {
    font-family: Tahoma, Arial, Helvetica, "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", '宋体', 'SimSun', 'STXihei', "华文细黑", sans-serif!important;
  }
</style>