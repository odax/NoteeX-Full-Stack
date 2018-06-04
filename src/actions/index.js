export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const MARK_COMPLETE = 'MARK_COMPLETE';
export const DELETE_NOTE = 'DELETE_NOTE';
//redux thunk
//redux promise

// export const updateNote = async (note, id) => {
//     await Axios.put(`http://localhost:5000/api/notes/${id}`, note);
//     return dispatch => {
//         dispatch(getNotes());
//     } //anytime i make ajax request i am utilizing apromise , async keyword --> promise
// } 

export const addNote = note => {
    return {
        type: ADD_NOTE,
        note
    }
}

export const updateNote = (note, index) => {
    return {
        type: UPDATE_NOTE,
        note,
        index
    }
}

export const markComplete = index => {
    return {
        type: MARK_COMPLETE,
        index
    }
}

export const deleteNote = index => {
    return {
        type: DELETE_NOTE,
        index
    }
}