import Vue from 'vue'
import Vuex from 'vuex'
import format from 'date-format'

Vue.use(Vuex)

const state = {
  notes: [],
  currentNoteId: ''
}

const mutations = {
  ['ADD_NOTE'](state, note) {
    note.id = state.notes.length
    note.localId = note.id
    note.date = format('yyyy-MM-dd hh:mm', new Date())

    state.notes.push(note)
  },
  ['REMOVE_NOTE'](state) {
    state.notes.splice(state.currentNoteId, 1)

    state.currentNoteId = ''
  },
  ['SET_CURRENTNOTEID'](state, id) {
    state.currentNoteId = id
  }
}

export default new Vuex.Store({
  state,
  mutations
})