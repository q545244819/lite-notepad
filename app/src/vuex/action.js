export const addNote = ({dispatch, state}) => {
  dispatch('ADD_NOTE', {
    title: 'Nothing',
    content: ''
  })
}

export const setCurrentNoteId = ({dispatch, state}, id) => {
  dispatch('SET_CURRENTNOTEID', id)
}