import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  notes: [],
  currentNoteId: ''
}

const mutations = {
  ['GET_NOTES'](state, notes) {
    state.notes = notes
  },
  ['ADD_NOTE'](state, note) {
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