import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDLITpuTHNQNXrEhWCQNeRfycRxLlFtX5E",
    authDomain: "noteapp-97e6a.firebaseapp.com",
    databaseURL: "https://noteapp-97e6a.firebaseio.com",
    projectId: "noteapp-97e6a",
    storageBucket: "noteapp-97e6a.appspot.com",
    messagingSenderId: "571395056184"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({ timestampsInSnapshots: true })

  export default firebase;