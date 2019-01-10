import React, { Component } from "react";
import Note from "./Note";
import "./list-view.css";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Route, Link } from 'react-router-dom';
import AllNotes from './AllNotes';

class MyNotes extends Component {
  // this basically says that if the new props are different, re-render
  shouldComponentUpdate = nextProps => {
    if ((nextProps.notes !== this.props.notes) || (nextProps.auth !== this.props.auth)) return true;
    else return false;
  };

  render() {
    const { history, auth } = this.props;
    
    if (!auth.uid) {
      return <Redirect to='/signin'/>
    }

    return (
      <div className="list-view">
        <div className='button-container'>
          <Link to='/'>
            <Button variant='contained' disabled='true' color='primary' className="myNotes-button">My Notes</Button>
          </Link>
          <Link to ='All-Notes'>
            <Button variant='contained' color='primary' className='publicNotes-button'>All Public Notes</Button>
          </Link>
        </div>
        <h2>My Notes:</h2>
        <div className="notes">
          {this.props.notes && this.props.notes.map((note, i) => {
            const { id, title, text, completed, authorFirstName, authorLastName, createdAt, authorId, publicNote } = note;
            if (authorId === this.props.auth.uid) {
            return (
              <Note key={id} publicNote={publicNote} auth={auth} authorId={authorId} id={id} index={i} title={title} text={text} completed={completed} history={history} name={authorFirstName + ' ' + authorLastName} time={createdAt} />
            );
            } // yes, this is hacky. Bad because it loads all documents.
          })}
        </div>
      </div>
    );
  }
}

// const mapStateToProps = ({ firebase: { auth }, firestore: { ordered } }) => {
//   return {
//     notes: ordered.notes,
//     auth
//   }
// }

export default compose(
  // connect auth from redux state to the auth prop
  connect(({ firebase: { auth } }) => ({ auth })),
  // Create a listener for registrations where user.uid == current user uid
  firestoreConnect(props => [
    {
      collection: 'notes',
      where: ['authorId', '==', props.auth.uid],
    },
  ]),
  connect(({ firestore: { ordered } }) => ({
    notes: ordered.notes // an array list of registrations
  }))
)

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect(props => [
//     { collection: 'notes', where: [['authorId', '==', props.auth.uid]]  }
//   ])
// )(MyNotes);

//the middle code is what i got from https://github.com/prescottprue/react-redux-firebase/issues/344
//the commented out code above and below is what i had earlier. It seems to crash when i log out because the props.auth.uid is undefined then, and
//for some reason the app is calling the firestoreConnect function when logged out??
