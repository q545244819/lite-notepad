import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueEditor from 'vue-html5-editor'
import Config from './config'

import App from './App.vue'
import Disable from './components/Disable.vue'
import Editor from './components/Editor.vue'

Vue.use(VueRouter)
Vue.use(VueEditor)

const router = new VueRouter({
  abstract: true
})

router.map({
  '/note': {
    name: 'note',
    component: Disable
  },
  '/note/:id': {
    name: 'edit',
    component: Editor
  }
})
router.redirect({
  '*': '/note'
})
router.start(App, 'body')
