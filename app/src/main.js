import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import User from './components/User.vue'
import Main from './components/Main.vue'
import Setting from './components/Setting.vue'
import Notepad from './components/Notepad.vue'
import Note from './components/Note.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/user': {
    name: 'user',
    component: User
  },
  '/notepad': {
    name: 'notepad',
    component: Main,
    subRoutes: {
      '/': {
        component: Notepad
      },
      '/:id': {
        component: Note
      }
    }
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

