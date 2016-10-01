export const getNotes = state => state.notes

export const getNoteById = state => state.notes.filter(item => item.id === state.currentNoteId)[0]
