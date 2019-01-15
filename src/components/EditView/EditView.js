import React, { Component } from "react";
import { updateNote } from "../../actions";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "./EditView.css";

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
  }

  // docid, newTitle, newText

  componentDidMount() {
    const { selectedText, selectedTitle } = this.props.selected;
    this.setState({
      title: selectedTitle,
      text: selectedText
    });
  }

  submit = e => {
    e.preventDefault();
    const { title, text } = this.state;
    const { selectedId } = this.props.selected;
    // const { notes, match } = this.props;
    // const note = notes[match.params.index];
    // this.props.updateNote({
    //     title: title === '' ? note.title : title,
    //     text: text === '' ? note.text : text,
    //     completed: note.completed,
    //     id: note.id
    // }, match.params.index);
    //
    //above is old logic that relies on text being placeholders in the edit-note view
    if (title !== "" && title.length <= 20 && text !== "") {
      this.props.updateNote(selectedId, title, text);
      this.props.history.push("/");
    }
    //should add an else statement with a warning here to fill in all fields
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { auth } = this.props;
    const { title, text } = this.state;

    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }

    return (
      <div className="page new-note">
        <h2>Edit Note</h2>
        <div className="new-note-form">
          <form onSubmit={this.submit}>
            <input
              type="text"
              onChange={e => this.setState({ title: e.target.value })}
              value={title}
              placeholder={"Update your title (20 chars or less)"}
            />
            <textarea
              onChange={e => this.setState({ text: e.target.value })}
              value={text}
              placeholder={"Update your text"}
            />
                          <Button
              variant="contained"
              color="primary"
              className="myNotes-button"
              type="submit"
              value="submit"
            >
              Update
            </Button>
          </form>
          <Link to="/">
          <Button
              variant="contained"
              color="secondary"
              className="myNotes-button"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.project,
    auth: state.firebase.auth,
    selected: state.selection
  };
};

export default connect(
  mapStateToProps,
  { updateNote }
)(EditNote);
