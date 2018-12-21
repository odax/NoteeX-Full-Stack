import React, { Component } from "react";
import Note from "./Note";
import "./list-view.css";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

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
        <div className="notes">
          {this.props.notes && this.props.notes.map((note, i) => {
            const { id, title, text, completed } = note;
            return (
              <Note key={id} id={id} index={i} title={title} text={text} completed={completed} history={history} />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.firestore.ordered.notes,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'notes',
      where: ['authorId', '==', `${localStorage.getItem('uid')}`] }
  ])
)(ListView);
