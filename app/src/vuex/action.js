import storage from 'electron-json-storage'
import format from 'date-format'

export const getNotesFormLocal = ({dispatch, state}) => {
  storage.get('notes', (err, data) => {
    dispatch('GET_NOTES', Object.prototype.toString.call(data) === '[object Object]' ? [] : data)
  })
}

export const addNote = ({dispatch, state}) => {
  const data = {
    id: state.notes.length,
    localId: state.notes.length,
    title: '未命名',
    content: '',
    date: format('yyyy-MM-dd hh:mm', new Date())
  }

  storage.set('notes', [].concat(state.notes, [data]), err => {
    if (err) {
      return console.error(err)
    }

    dispatch('ADD_NOTE', data)
  })
}

export const removeNoteById = ({dispatch, state}) => {
  if (state.currentNoteId !== '') {
    storage.get('notes', (err, data) => {
      data.splice(state.currentNoteId, 1)

      storage.set('notes', data, (err) => {
        if (err) {
          return console.error(err)
        }

        dispatch('REMOVE_NOTE')        
      })
    })
  } 
}

export const setCurrentNoteId = ({dispatch, state}, id) => {
  dispatch('SET_CURRENTNOTEID', id)
}