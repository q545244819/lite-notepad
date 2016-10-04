export const getNotes = state => state.notes

export const getNoteById = state => state.notes.filter(item => item.id === state.currentNoteId)[0]

export const getCurrentNoteId = state => state.currentNoteId

export const getShowHistory = state => state.showHistory

export const getHasLogin = state => state.hasLogin

export const getToken = state => state.token
