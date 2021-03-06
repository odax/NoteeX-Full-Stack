import authReducer from './authReducer';
import projectReducer from './index';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import selectionReducer from './selectionReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    selection: selectionReducer
});

export default rootReducer;