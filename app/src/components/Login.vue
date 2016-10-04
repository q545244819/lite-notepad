<template>
  <modal title="用户登录" effect="fade" :show.sync="show" width="520px">
    <div slot="modal-body" class="modal-body">   
      <div class="form-horizontal">
        <div class="form-group">
          <label for="username" class="col-sm-2 control-label">用户名：</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="username" placeholder="请输入用户名" v-model="username">
          </div>
        </div>
        <div class="form-group">
          <label for="password" class="col-sm-2 control-label">密码：</label>
          <div class="col-sm-10">
            <input type="password" class="form-control" id="password" placeholder="请输入密码" v-model="password">
          </div>
        </div>
      </div>
    </div>
    <div slot="modal-footer" class="modal-footer">
      <button v-if="!loading" type="button" class="btn btn-info" @click="register()">注册</button>
      <button v-if="!loading" type="button" class="btn btn-primary" @click="sign()">登录</button>
      <button v-if="loading" type="button" class="btn btn-info" disabled>处理中</button>
    </div>
  </modal>
</template>

<script>
  import storage from 'electron-json-storage'
  import $ from 'jquery'
  import Config from '../config'
  import { modal } from 'vue-strap'
  import {
    login
  } from '../vuex/action'

  const error = {
    show: true,
    duration: 1500,
    type: 'danger',
    placement: 'top'
  }

  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        username: '',
        password: '',
        loading: false
      }
    },
    vuex: {
      actions: {
        login
      }
    },
    methods: {
      register() {
        const username = this.username && this.username.length >= 6
        const password = this.password && this.password.length >= 6

        if (username && password) {
          $
            .post(Config.ajax, { cmd: 'register', name: this.username, password: this.password })
            .then(data => {
              storage.set('user', data, (err) => {
                this.show = false
                this.loading = false
                this.login(data.token)
              })
            })
            .catch(err => {
              error.content = '请检查用户名或密码是否错误'

              this.$dispatch('alert', error)
            })
        } else {
          error.content = '用户名和密码长度必须6位以上'

          this.$dispatch('alert', error)
        }
      },
      sign() {
        if (this.username && this.password) {
          this.loading = true

          $
            .post(Config.ajax, { cmd: 'login', name: this.username, password: this.password })
            .then(data => {
              storage.set('user', data, (err) => {
                this.show = false
                this.loading = false
                this.login(data.token)
              })
            })
            .catch(err => {
              error.content = '请检查用户名或密码是否错误'

              this.$dispatch('alert', error)
            })
        } else {
          error.content = '请检查用户名或密码是否错误'

          this.$dispatch('alert', error)
        }
      }
    },
    components: {
      modal
    }
  }
</script>

<style lang="less" scoped></style>