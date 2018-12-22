import { storage } from "firebase";

export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_ERROR = 'ADD_NOTE_ERROR';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const MARK_COMPLETE = 'MARK_COMPLETE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
//redux thunk
//redux promise

// export const updateNote = async (note, id) => {
//     await Axios.put(`http://localhost:5000/api/notes/${id}`, note);
//     return dispatch => {
//         dispatch(getNotes());
//     } //anytime i make ajax request i am utilizing apromise , async keyword --> promise
// } 

export const addNote = note => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('notes').add({
            ...note,
            authorFirstName: profile.firstName,
            authorLastName:  profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({
                type: ADD_NOTE,
                note
            });
        }).catch((err) => {
            dispatch({ type: ADD_NOTE_ERROR, err});
        })
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

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(resp => {
            localStorage.setItem('uid', resp.user.uid);
            dispatch({ type: LOGIN_SUCCESS })
        }).catch((err) => {
            dispatch({ type: LOGIN_ERROR, err })
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        localStorage.removeItem;
        firebase.auth().signOut().then(() => {
            dispatch({ type: SIGNOUT_SUCCESS });
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0],
            })
        }).then(() => {
            dispatch({ type: SIGNUP_SUCCESS });
        }).catch(err => {
            dispatch({ type: SIGNUP_ERROR, err })
        })
    }
}