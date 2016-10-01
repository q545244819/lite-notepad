import storage from 'electron-json-storage'
import format from 'date-format'

export const getNotesFormLocal = ({dispatch, state}) => {
  return new Promise((resolve, reject) => {
    storage.get('notes', (err, data) => {
      if (err) {
        return reject(err)
      }

      dispatch('GET_NOTES', Object.prototype.toString.call(data) === '[object Object]' ? [] : data)

      resolve(data)
    })
  })
}

export const addNote = ({dispatch, state}) => {
  return new Promise((resolve, reject) => {
    const data = {
      id: state.notes.length,
      localId: state.notes.length,
      title: '未命名',
      content: '',
      date: format('yyyy-MM-dd hh:mm', new Date())
    }

    storage.set('notes', [].concat(state.notes, [data]), err => {
      if (err) {
        return reject(err)
      }

      dispatch('ADD_NOTE', data)

      resolve(data)
    })
  })
}

export const removeNoteById = ({dispatch, state}) => {
  return new Promise((resolve, reject) => {
    if (state.currentNoteId !== '') {
      storage.get('notes', (err, data) => {
        data.splice(state.currentNoteId, 1)

        storage.set('notes', data, (err) => {
          if (err) {
            return reject(err)
          }

          dispatch('REMOVE_NOTE')
          
          resolve()
        })
      })
    }
  }) 
}

export const setCurrentNoteId = ({dispatch, state}, id) => {
  dispatch('SET_CURRENTNOTEID', id)
}