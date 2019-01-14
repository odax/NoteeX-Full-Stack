const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
//this means we'll be able to use the admin sdk to interact with the different services

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//for each function we create, we set it to the exports object
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});


const createNotification = (notification => {
    return admin.firestore().collection('notifications')
    .add(notification)
    .then( doc => 
        console.log('notification added', doc));
    })


//function that reacts to a new note created
exports.projectCreated = functions.firestore
    .document('notes/{noteId}')
    .onCreate( doc => {

        const note = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${note.authorFirstName} ${note.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);

    });

    // //function that reacts to new user created
    // exports.userJoined = functions.auth.user()
    //     .onCreate( user => {
    //         return admin.firestore().collection('users')
    //         .doc(user.uid).get().then( doc => {
    //             const newUser = doc.data();
    //             const notification = {
    //                 content: 'Created an account',
    //                 user: `${newUser.firstName} ${newUser.lastName}`,
    //                 time: admin.firestore.FieldValue.serverTimestamp()
    //             }
    //             return createNotification(notification);
    //         })
    // });