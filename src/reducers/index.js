import { ADD_NOTE, ADD_NOTE_ERROR, UPDATE_NOTE, DELETE_NOTE, MARK_COMPLETE } from '../actions';
import update from 'immutability-helper';

const initialState = [
    { id: 1, title: "Note Title", text: "Hello I am the note's text" },
    { id: 2, title: "Note Title", text: "Hello I am the note's text" },
    { id: 3, title: "Note Title", text: "Hello I am the note's text" },
    { id: 4, title: "Note Title", text: "Hello I am the note's text" },
    { id: 5, title: "Note Title", text: "Hello I am the note's text" },
    { id: 6, title: "Note Title", text: "Hello I am the note's text" }
  ];

export default (notes=initialState, action) => {
    switch(action.type) {
        case ADD_NOTE:
            action.note.id = notes.length;
            const addedState = update(notes, {$push: [action.note]});
            return addedState;
        case ADD_NOTE_ERROR:
            console.log('create project error', action.err);
            return notes;
        case MARK_COMPLETE:
            const completed = notes[action.index].completed;
            const completedState = update(notes, {[action.index]: {completed: {$set: !completed}}});
            return completedState;
        case UPDATE_NOTE:
            const updatedNote = action.note;
            const updatedState = update(notes, {[action.index]: {$set: updatedNote}});
            return updatedState;
        case DELETE_NOTE:
            const deletedState = update(notes, {$splice: [[action.index, 1]]});
            return deletedState;
        default:
            return notes;
    }
}