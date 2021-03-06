import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [],
  currentNoteId: '', // 存放 note 的 id，而不是在数组下的下标值
  showHistory: false,
  hasLogin: false,
  token: ''
}

const mutations = {
  ['GET_NOTES'](state, notes) {
    state.notes = notes
  },
  ['ADD_NOTE'](state, note) {
    state.notes.push(note)
  },
  ['SET_NOTE'](state, notes) {
    state.notes = notes
  },
  ['REMOVE_NOTE'](state, index) {
    state.notes.splice(index, 1)

    state.currentNoteId = ''
  },
  ['SET_CURRENTNOTEID'](state, id) {
    state.currentNoteId = id
  },
  ['TOGGLE_HISTORY'](state, bool) {
    state.showHistory = bool || !state.showHistory
  },
  ['LOGIN'](state, token) {
    state.hasLogin = true
    state.token = token
  },
  ['LOGOUT'](state) {
    state.hasLogin = false
    state.token = ''
  }
}

export default new Vuex.Store({
  state,
  mutations
})