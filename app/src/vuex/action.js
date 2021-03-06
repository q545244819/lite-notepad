import $ from 'jquery'
import Config from '../config'
import storage from 'electron-json-storage'
import format from 'date-format'
import uid from 'uid'

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
      id: uid(),
      title: '未命名',
      content: '',
      date: format('yyyy-MM-dd hh:mm:ss', new Date())
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

export const setNote = ({dispatch, state}, notes) => {
  return new Promise((resolve, reject) => {
    storage.set('notes', notes, err => {
      if (err) {
        return reject(err)
      }

      dispatch('SET_NOTE', notes)
      
      resolve(notes)
    })
  })
}

export const removeNoteById = ({dispatch, state}) => {
  const note = () => {
    return new Promise((resolve, reject) => {
      if (state.currentNoteId) {
        let i = 0

        storage.get('notes', (err, data) => {
          data.forEach((item, index) => {
            if (item.id === state.currentNoteId) {
              return i = index
            }
          })
          
          data.splice(i, 1)

          storage.set('notes', data, (err) => {
            if (err) {
              return reject(err)
            }
            
            resolve(i)
          })
        })
      }
    })
  }
  const history = () => {
    return new Promise((resolve, reject) => {
      if (state.currentNoteId) {
        storage.remove(`history-${state.currentNoteId}`, (err) => {
          if (err) {
            return reject(err)
          }
          
          resolve()
        })
      }
    })
  }
  const remote = () => {
    return new Promise((resolve, reject) => {
      let i = 0
      
      state.notes.forEach((item, index) => {
        if (item.id === state.currentNoteId) {
          return i = index
        }
      })
    
      const note = state.notes.splice(i, 1)[0]

      if (state.token && state.hasLogin && note.dbId) {
        $.post(Config.ajax, {
          cmd: 'Note_Delete',
          token: state.token,
          Note_Id: note.dbId
        }).then(data => resolve(data)).catch(err => reject(err))
      } else {
        resolve()
      }
    })
  }

  remote()
    .then(() => {
      return Promise.all([
        note(),
        history()
      ])
    })
    .then(args => {
      dispatch('REMOVE_NOTE', args[0])    
    })
}

export const setCurrentNoteId = ({dispatch, state}, id) => {
  dispatch('SET_CURRENTNOTEID', id)
}

export const toggleHistory = ({dispatch, state}, bool) => {
  dispatch('TOGGLE_HISTORY', bool)
}

export const login = ({dispatch, state}, token) => {
  dispatch('LOGIN', token)
}

export const logout = ({dispatch, state}) => {
  storage.remove('user', () => dispatch('LOGOUT'))
}