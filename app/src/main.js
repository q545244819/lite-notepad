import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map()
router.start(App, 'body')
