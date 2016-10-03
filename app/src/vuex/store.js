import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [],
  currentNoteId: '', // 存放 note 的 id，而不是在数组下的下标值
  showHistory: false,
  hasLogin: false
}

const mutations = {
  ['GET_NOTES'](state, notes) {
    state.notes = notes
  },
  ['ADD_NOTE'](state, note) {
    state.notes.push(note)
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
  ['LOGIN'](state) {
    state.hasLogin = true
  },
  ['LOGOUT'](state) {
    state.hasLogin = false
  }
}

export default new Vuex.Store({
  state,
  mutations
})