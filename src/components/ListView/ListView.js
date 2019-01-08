import React, { Component } from "react";
import Note from "./Note";
import "./list-view.css";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class ListView extends Component {
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
        <h2>Notes:</h2>
        <div className='button-container'>
          <Button variant='contained' color='primary' className="myNotes-button">My Notes</Button>
          <Button variant='contained' color='primary' className='publicNotes-button'>All Notes</Button>
        </div>
        <div className="notes">
          {this.props.notes && this.props.notes.map((note, i) => {
            const { id, title, text, completed, authorFirstName, authorLastName, createdAt, authorId } = note;
            return (
              <Note key={id} auth={auth} authorId={authorId} id={id} index={i} title={title} text={text} completed={completed} history={history} name={authorFirstName + ' ' + authorLastName} time={createdAt} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    notes: state.firestore.ordered.notes,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'notes' }
  ])
)(ListView);
