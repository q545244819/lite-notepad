import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import User from './components/User.vue'
import Main from './components/Main.vue'
import Setting from './components/Setting.vue'

Vue.use(VueRouter)

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

