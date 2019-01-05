import { SELECTED_NOTE_FOR_EDIT } from '../actions';

const initState = {
    selectedId: null,
    selectedText: null,
    selectedTitle: null
};

const selectionReducer = (state = initState, action) => {
    switch(action.type) {
        case SELECTED_NOTE_FOR_EDIT:
        //recieves action id, text, and title
        //need to pass these to the state
          console.log('firing selection reducer');
          return {
              ...state,
              selectedId: action.id,
              selectedText: action.text,
              selectedTitle: action.title
          }
        default:
          return state;
    }
};

export default selectionReducer;