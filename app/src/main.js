import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from 'vue-html5-editor'
import Config from './config'

import App from './App.vue'
import User from './components/User.vue'
import Main from './components/Main.vue'
import Setting from './components/Setting.vue'

Vue.use(VueRouter)
Vue.use(Editor, Config.editor)

const router = new VueRouter({
  abstract: true
})

router.map({
  '/user': {
    name: 'user',
    component: User
  },
  '/notepad': {
    name: 'notepad',
    component: Main
  },
  '/setting': {
    name: 'setting',
    component: Setting
  }
})
router.redirect({
  '*': '/notepad'
})
router.start(App, 'body')

