import React, { Component } from "react";
import "./list-view.css";
import { markComplete, deleteNote, selectNoteForEdit } from "../../actions";
import { connect } from "react-redux";
import moment from "moment";

class Note extends Component {
  render = () => {
    const {
      title,
      text,
      completed,
      index,
      auth,
      markComplete,
      selectNoteForEdit,
      deleteNote,
      history,
      id,
      name,
      time,
      authorId,
      publicNote
    } = this.props;
    let deletePlaceholder;
    let completePlaceholder;
    if (auth.uid !== authorId) {
      deletePlaceholder = null;
      completePlaceholder = null;
    } else {
      deletePlaceholder = (
        <button
          className="delete"
          onClick={e => {
            e.stopPropagation();
            deleteNote(id);
          }}
        >
          X
        </button>
      );
      completePlaceholder = (
        <button
          onClick={e => {
            e.stopPropagation();
            markComplete(id, completed);
          }}
          className="complete"
        >
          {completed && (
            <img
              src={require("./check2.svg")}
              alt="complete"
              className="check"
            />
          )}
        </button>
      );
    }
    let publicThing;
    if (publicNote === true) {
      publicThing = <p>Public</p>;
    } else {
      publicThing = null;
    }
    return (
      <div
        className="note"
        onClick={() => {
          if (authorId === auth.uid) {
            selectNoteForEdit(id, title, text);
            history.push(`/Edit-Note/${id}`);
          }
        }}
      >
        <div className="note12">
          <h3 style={{ opacity: completed ? 0.25 : 1 }}>{title}</h3>
          {publicThing}
          <div className="buttons">
            {completePlaceholder}
            {deletePlaceholder}
          </div>
        </div>

        <div className="note22" style={{ opacity: completed ? 0.25 : 1 }}>
          <div className="divider" />
          <p className="text">{text}</p>
          <div className="author-date-divider">
            <p>Posted by {name}</p>
            <p>{moment(time.toDate()).format("llll")}</p>
          </div>
        </div>
      </div>
    );
  };
}

export default connect(
  null,
  { markComplete, deleteNote, selectNoteForEdit }
)(Note);
