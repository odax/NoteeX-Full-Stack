// import authReducer from './authReducer';
import projectReducer from './index';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    project: projectReducer,
    firestore: firestoreReducer
});

export default rootReducer;