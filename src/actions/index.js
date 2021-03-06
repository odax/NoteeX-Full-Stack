export const ADD_NOTE = "ADD_NOTE";
export const ADD_NOTE_ERROR = "ADD_NOTE_ERROR";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const UPDATE_NOTE_ERROR = "UPDATE_NOTE_ERROR";
export const MARK_COMPLETE = "MARK_COMPLETE";
export const DELETE_NOTE = "DELETE_NOTE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_ERROR = "SIGNUP_ERROR";
export const DELETE_NOTE_ERROR = "DELETE_NOTE_ERROR";
export const MARK_COMPLETE_ERROR = "MARK_COMPLETE_ERROR";
export const SELECTED_NOTE_FOR_EDIT = "SELECTED_NOTE_FOR_EDIT";

//here action types are redefined in order to allow easy troubleshooting if mispelled

//called when a use adds a note
export const addNote = note => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection("notes")
      .add({
        ...note,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_NOTE,
          note
        });
      })
      .catch(err => {
        dispatch({ type: ADD_NOTE_ERROR, err });
      });
  };
};

//above is the primary pattern for handling actions in this file
//import firestore, send request with data object, on response dispatch action any required input or response data

//called when a user updates a note
export const updateNote = (docid, newTitle, newText) => {
  return (dispatch, getState, {getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("notes")
      .doc(`${docid}`)
      .update({
        title: newTitle,
        text: newText
      })
      .then(() => {
        console.log('firing update action success');
      dispatch({
        type: UPDATE_NOTE,
        docid
      });
    })
    .catch(err => {
      dispatch({ type: UPDATE_NOTE_ERROR, err });
    });
  }
};

//called when a user hits checkbox to mark a note complete or the opposite
export const markComplete = (docid, completed) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    firestore
      .collection("notes")
      .doc(`${docid}`)
      .set(
        {
          completed: !completed
        },
        { merge: true }
      )
      .then(() => {
          console.log('firing markcomplete action success');
        dispatch({
          type: MARK_COMPLETE,
          docid
        });
      })
      .catch(err => {
        dispatch({ type: MARK_COMPLETE_ERROR, err });
      });
  };
};

//called when a user doesn't want a note anymore
//document has to match user uid (handled by only rendering the delete button when note id equals user's logged in uid. This is in MyNotes.js or ListView.js.
//Security rules are set up in google firebases security rule component online, which prevents anyone from deleting anyones notes, or checking off)
export const deleteNote = docid => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //make async call to database
    const firestore = getFirestore();
    firestore
      .collection("notes")
      .doc(`${docid}`)
      .delete()
      .then(() => {
        dispatch({
          type: DELETE_NOTE,
          docid
        });
      })
      .catch(err => {
        dispatch({ type: DELETE_NOTE_ERROR, err });
      });
  };
};

//when you click a note, this is a workaround for not being able to pass props down from the list-view (or my notes) to the edit notes.
//In this work around I hold on to the data with the redux store and apply it to the edit note component
export const selectNoteForEdit = (id, title, text) => {
  return (dispatch) => {
    dispatch({
      type: SELECTED_NOTE_FOR_EDIT,
      id,
      title,
      text
    });
  }
}

export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(newUser);
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(resp => {
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0]
          });
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(err => {
        dispatch({ type: SIGNUP_ERROR, err });
      });
  };
};
